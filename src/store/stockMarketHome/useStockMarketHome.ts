import { useRequest } from 'ahooks';
import { useAtom } from 'jotai';

import { PREFIX_API_MARKET } from '@api/request';
import { atomStockMarket, atomStockMarketIndex } from '@store/stockMarketHome/stockMarketHome';
import { socket } from 'src/socket/socket';

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
