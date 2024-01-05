const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj: any, property: string | number | symbol): boolean {
  return obj != null && hasOwnProperty.call(obj, property);
}

let UID_BASE = Date.now();
export function uniqueId(prefix: string = ''): string {
  if (prefix) {
    prefix += '_';
  }
  return `${prefix}${(UID_BASE++).toString(36).toLowerCase()}`;
}

export * from './scheduler';
