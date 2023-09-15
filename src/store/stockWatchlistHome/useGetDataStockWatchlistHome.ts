import { useAtom } from 'jotai';

import { atomStockWatchlist, atomStockWatchlistSocket } from '@store/stockWatchlistHome';

export const useGetDataStockWatchlistHome = () => {
  const [dataStockWatchlist] = useAtom(atomStockWatchlist);
  const [dataStockWatchlistSocket] = useAtom(atomStockWatchlistSocket);
  const findIndex = dataStockWatchlist?.findIndex(
    (item: any) => item.stockCode === dataStockWatchlistSocket.sym,
  );
  let isChangeStockPrice = false;
  if (dataStockWatchlist && findIndex !== -1) {
    const data = dataStockWatchlist[findIndex];
    isChangeStockPrice = data?.lastPrice !== dataStockWatchlistSocket?.lastPrice;
    dataStockWatchlist[findIndex] = {
      ...data,
      ...dataStockWatchlistSocket,
    };
  }

  return { dataStockWatchlist, findIndex, isChangeStockPrice };
};
