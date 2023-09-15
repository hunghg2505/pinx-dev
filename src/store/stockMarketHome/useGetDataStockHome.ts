import { useAtom } from 'jotai';

import { atomStockMarket, atomStockMarketIndex } from '@store/stockMarketHome/stockMarketHome';

export const useGetDataStockHome = () => {
  const [dataStock] = useAtom(atomStockMarket);
  const [dataStockIndex] = useAtom<any>(atomStockMarketIndex);

  const findIndex = dataStockIndex?.findIndex((item: any) => item.mc === dataStock.mc);
  if (findIndex !== -1) {
    const data = dataStockIndex[findIndex];
    dataStockIndex[findIndex] = { ...data, ...dataStock };
  }

  return { dataStockIndex, findIndex };
};
