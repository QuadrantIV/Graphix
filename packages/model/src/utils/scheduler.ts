const callbacks: Array<() => void> = [];
function flushCallbacks(): void {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (const fn of copies) {
    fn();
  }
}

const timer = Promise.resolve();
function timerFlush() {
  timer.then(flushCallbacks);
}

let pending = false;
export function nextTick(callback?: () => void, ctx?: {}): Promise<{}> {
  let iresolve: (ctx?: {}) => void;
  callbacks.push(() => {
    if (callback) {
      callback.call(ctx);
    }
    iresolve(ctx);
  });
  if (!pending) {
    pending = true;
    timerFlush();
  }
  return new Promise((resolve) => {
    // @ts-ignore
    iresolve = resolve;
  });
}
