import { useMount, useRequest } from 'ahooks';
import { useAtom } from 'jotai';

import { PREFIX_API_MARKET } from '@api/request';
import { stockDesktop, stockIndexDesktop } from '@store/stockDesktop/stockDesktop';
import { socket } from 'src/socket/socket';

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

  useMount(() => {
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
  });
};
