import { useAtom } from 'jotai';

import { stockDesktop, stockIndexDesktop } from '@store/stockDesktop/stockDesktop';

export const useStockDesktop = () => {
  const [dataStock] = useAtom<any>(stockDesktop);
  const [dataStockIndex] = useAtom<any>(stockIndexDesktop);

  const findIndex = dataStockIndex?.findIndex((item: any) => item.mc === dataStock.mc);

  if (findIndex !== -1) {
    const data = dataStockIndex[findIndex];
    dataStockIndex[findIndex] = { ...data, ...dataStock };
  }

  return {
    dataStockIndex,
    findIndex,
  };
};
