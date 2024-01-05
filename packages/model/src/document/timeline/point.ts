const AliveTimeout: number = 300;

export default class TimelinePoint {
  private alive: boolean = true;
  private timer: number | null = null;
  private data: any;

  constructor(private cursor: number, private title: string, data?: any) {
    if (data != null) {
      this.log(data);
    }
  }

  getCursor(): number {
    return this.cursor;
  }

  getData(): any {
    return this.data;
  }

  getTitle(): string {
    return this.title;
  }

  log(data: any): void {
    if (!this.isAlive()) {
      return;
    }

    this.data = data;
    this.live();
  }

  isAlive(): boolean {
    return this.alive;
  }

  end(): void {
    this.alive = false;
    this.clearTimer();
  }

  private live() {
    this.clearTimer();
    this.timer = window.setTimeout(() => this.end(), AliveTimeout);
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
