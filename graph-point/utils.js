
/**
 * 生成一个指定范围内的随机整数
 *
 * @param min - 最小值
 * @param max - 最大值
 * @returns 一个指定范围内的随机整数
 */
export function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}