/**
 *
 * @param value 数字或数组
 * @returns-(数字)： 返回0~该数字的随机整数
 * @returns-(数组)： 返回该数组随机项
 */
export const random = (value: number | any[]) => {
  const isArray = Array.isArray(value);

  const random = Math.random() * (isArray ? value.length : value);
  const intRandom = parseInt(random);

  return isArray ? value[intRandom] : intRandom;
};

/**
 *
 * @param obj mock的对象源
 * @param num 生成的list条目数
 * @description-1: 当obj的值为数组时，则生成的数据item为数组中的一项；
 * @description-2: 当obj的值包含'$'符号时，会被替换为index
 */
export const mock = (obj: any, num = 10) => {
  const res = [];

  for (let i = 1; i <= num; i++) {
    const resObj: any = {};

    for (const key in obj) {
      if (Array.isArray(obj[key])) resObj[key] = random(obj[key]);
      else resObj[key] = obj[key].replace("$", i);
    }
    res.push(resObj);
  }
  return res;
};
