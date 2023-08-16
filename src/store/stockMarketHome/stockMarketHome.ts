import { useRequest } from 'ahooks';
import { atom, useAtom } from 'jotai';

import { PREFIX_API_MARKET } from '@api/request';
import { socket } from '@components/Home/service';

const atomStockMarket = atom<any>([]);
const atomStockMarketIndex = atom([]);

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

export const useStockMarketHome = () => {
  const [, setDataStock] = useAtom(atomStockMarket);
  const [, setDataStockIndex] = useAtom(atomStockMarketIndex);

  const { run } = useRequest(
    () => {
      return fetch(PREFIX_API_MARKET + '/public/index').then((data: any) => data.json());
    },
    {
      manual: true,
      onSuccess: (res) => {
        setDataStockIndex(res?.data);
      },
    },
  );

  const getDataSocket = (message: any) => {
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
      setDataStock(newData);
    }
  };

  const getInitDataStockMarketHome = () => {
    run();
    socket.on('public', getDataSocket);
  };

  const closeSocket = () => {
    socket.off('public', getDataSocket);
  };

  return {
    getInitDataStockMarketHome,
    closeSocket,
  };
};
