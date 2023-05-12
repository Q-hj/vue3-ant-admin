/**
 *  * 简化本地存储
 */

enum Storage {
  local = "localStorage",
  session = "sessionStorage",
}
export default function useStorage(type: "local" | "session") {
  const parse = (value: any) => {
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  };

  const set = (key: string, value: any) =>
    window[Storage[type]].setItem(key, JSON.stringify(value));

  const get = (name: string) => parse(window[Storage[type]].getItem(name));

  return {
    set,
    get,
  };
}
