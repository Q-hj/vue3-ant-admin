// const isFn = (val: unknown): val is Function =>
//   toString.call(val) === `[object Function]`;

export function isFn(val: unknown): val is Function {
  return typeof val === "function";
}

export function isString(val: unknown): val is string {
  return typeof val === "string";
}
