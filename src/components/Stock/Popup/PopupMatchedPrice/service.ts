import { IStockTrade } from '@components/Stock/type';

interface Result {
  list: IStockTrade[];
  nextId: IStockTrade | undefined;
}

export const getLoadMoreList = (
  stockTrade: IStockTrade[],
  nextId: IStockTrade | undefined,
  limit: number,
): Promise<Result> => {
  let start = 0;
  if (nextId) {
    start = stockTrade.indexOf(nextId);
  }
  const end = start + limit;
  const list = stockTrade.slice(start, end);
  const nId = stockTrade.length >= end ? stockTrade[end] : undefined;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list,
        nextId: nId,
      });
    }, 200);
  });
};
