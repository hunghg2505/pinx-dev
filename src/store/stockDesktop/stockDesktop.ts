import { useRequest } from 'ahooks';
import { atom, useAtom } from 'jotai';

import { PREFIX_API_MARKET } from '@api/request';
import { socket } from '@components/Home/service';

const stockDesktop = atom<any>([]);
const stockIndexDesktop = atom<any>([]);

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

export const useStockDesktopInitial = () => {
  const [, setDataStock] = useAtom<any>(stockDesktop);
  const [, setDataStockIndex] = useAtom<any>(stockIndexDesktop);

  useRequest(
    () => {
      return fetch(PREFIX_API_MARKET + '/public/index').then((data: any) => data.json());
    },
    {
      onSuccess: (res: any) => {
        // @ts-ignore
        setDataStockIndex(res?.data);
      },
    },
  );

  socket.on('public', (message: any) => {
    const data = message.data;
    if (data?.id === 1101) {
      const [change, changePercent, x, increase, decrease, ref] = data.ot.split('|');
      const newData = {
        ...data,
        change,
        changePercent,
        x,
        increase,
        decrease,
        ref,
      };
      delete newData.ot;
      // @ts-ignore
      setDataStock(newData);
    }
  });
};
