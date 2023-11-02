import { formatStringToNumber } from './formatStringToNumber';

export const kFormatter = (num: number) => {
  return Math.abs(num) > 999
    ? formatStringToNumber((Math.sign(num) * +(Math.abs(num) / 1000).toFixed(1)).toString()) + 'K'
    : Math.sign(num) * Math.abs(num);
};
