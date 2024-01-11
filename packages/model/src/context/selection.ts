import { EventEmitter } from 'events';
import Context from './index';

export default class Selection {
  private emitter: EventEmitter = new EventEmitter();
  private selections: string[] = [];

  constructor(private context: Context) {
  }

  getContext(): Context {
    return this.context;
  }

  getKeys(): string[] {
    return this.selections;
  }

  setKeys(keys: string[]): void {
    this.selections = keys;
    this.emitter.emit('selectionchange', this.selections);
  }

  addKey(key: string) {
    if (this.selections.indexOf(key) < 0) {
      this.selections = [...this.selections, key];
      this.emitter.emit('selectionchange', this.selections);
    }
  }

  removeKey(key: string): void {
    const i = this.selections.indexOf(key);
    if (i > -1) {
      this.selections.splice(i, 1);
      this.emitter.emit('selectionchange', this.selections);
    }
  }

  clear(): void {
    this.selections = [];
    this.emitter.emit('selectionchange', this.selections);
  }

  onSelectionChange(fn: (keys: string[]) => void): () => void {
    this.emitter.on('selectionchange', fn);
    return () => {
      this.emitter.removeListener('selectionchange', fn);
    };
  }
}
