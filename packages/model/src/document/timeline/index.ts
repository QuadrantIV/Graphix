import { EventEmitter } from 'events';
import TimelinePoint from './point';
import { nextTick } from '../../utils/index';

export default class Timeline {
  private emitter: EventEmitter = new EventEmitter();
  private points: TimelinePoint[];
  private currentPoint: TimelinePoint | null = null;
  private cursor: number;
  private savePointIndex: number = 0;

  constructor(private logger: () => any, private applier: (data: any) => void) {
    const initialData = logger();
    this.currentPoint = new TimelinePoint(0, 'Open', initialData);
    this.points = [this.currentPoint];
    this.currentPoint.end();
    this.cursor = 0;

    // tslint:disable-next-line
    console.log('%c Open', 'color:#03A9F4;font-weight:bold;line-height:19px', initialData);
  }

  getPoints(): TimelinePoint[] {
    return this.points;
  }

  getCurrentCursor(): number {
    return this.cursor;
  }

  isModified(): boolean {
    return this.savePointIndex !== this.getCurrentCursor();
  }

  log(title: string) {
    if (!this.currentPoint) {
      return;
    }

    const data = this.logger();
    if (this.currentPoint.isAlive()) {
      this.currentPoint.log(data);
    } else {
      this.currentPoint.end();
      const cursor = this.currentPoint.getCursor() + 1;
      const point = new TimelinePoint(cursor, title, data);
      this.currentPoint = point;
      this.points.splice(cursor, this.points.length - cursor, point);
      this.cursor = cursor;
    }

    // tslint:disable-next-line
    console.log(`%c ${title}`, 'color:#03A9F4;font-weight:bold;line-height:19px', data);

    this.emitter.emit('statechange', this.getState());
  }

  go(cursor: number) {
    if (!this.currentPoint) {
      return;
    }
    this.currentPoint.end();

    const currentCursor = this.getCurrentCursor();
    cursor = +cursor;
    if (cursor < 0) {
      cursor = 0;
    } else if (cursor >= this.points.length) {
      cursor = this.points.length - 1;
    }
    if (cursor === currentCursor) {
      return;
    }

    const point = this.points[cursor];
    const hotData = point.getData();

    this.currentPoint = null;
    try {
      this.applier(hotData);
      this.emitter.emit('cursor', cursor, hotData);
    } catch (e) {
      // continue regardless of error
    }
    this.cursor = cursor;
    nextTick(() => {
      this.currentPoint = point;
    });

    // tslint:disable-next-line
    console.log(`%c ${point.getTitle()}`, 'color:#9E9E9E;font-weight:bold;line-height:19px', hotData);

    this.emitter.emit('statechange', this.getState());
  }

  back() {
    this.go(this.getCurrentCursor() - 1);
  }

  forward() {
    this.go(this.getCurrentCursor() + 1);
  }

  savePoint() {
    this.savePointIndex = this.getCurrentCursor();
    this.emitter.emit('statechange', this.getState());
  }

  /**
   *  |    1     |     1    |    1     |
   *  | -------- | -------- | -------- |
   *  | modified | redoable | undoable |
   */
  getState(): number {
    const cursor = this.getCurrentCursor();
    let state = 7;
    // undoable ?
    if (cursor <= 0) {
      state -= 1;
    }
    // redoable ?
    if (cursor >= this.points.length - 1) {
      state -= 2;
    }
    // modified ?
    if (this.savePointIndex === cursor) {
      state -= 4;
    }
    return state;
  }

  onStateChange(func: (state: number) => void): () => void {
    this.emitter.on('statechange', func);
    return () => {
      this.emitter.removeListener('statechange', func);
    };
  }

  onCursor(func: (cursor: number, data: any) => void): () => void {
    this.emitter.on('cursor', func);
    return () => {
      this.emitter.removeListener('cursor', func);
    };
  }
}
