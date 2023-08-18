import { useRequest } from 'ahooks';
import { atom, useAtom } from 'jotai';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { requestJoinChannel, requestLeaveChannel, socket } from '@components/Home/service';

const atomStockWatchlist = atom<any>([]);
const atomStockWatchlistSocket = atom<any>([]);

export const useGetDataStockWatchlistHome = () => {
  const [dataStockWatchlist] = useAtom(atomStockWatchlist);
  const [dataStockWatchlistSocket] = useAtom(atomStockWatchlistSocket);
  const findIndex = dataStockWatchlist?.findIndex(
    (item: any) => item.stockCode === dataStockWatchlistSocket.sym,
  );
  if (dataStockWatchlist && findIndex !== -1) {
    const data = dataStockWatchlist[findIndex];
    dataStockWatchlist[findIndex] = {
      ...data,
      ...dataStockWatchlistSocket,
    };
  }

  return { dataStockWatchlist, findIndex };
};

export const useStockWatchlistHome = () => {
  const [dataStockWatchlist, setDataStockWatchlist] = useAtom(atomStockWatchlist);
  const [, setDataStockWatchlistSocket] = useAtom(atomStockWatchlistSocket);

  const { run } = useRequest(
    () => {
      return privateRequest(requestPist.get, API_PATH.PRIVATE_WATCHLIST_STOCK);
    },
    {
      manual: true,
      onSuccess: (res: any) => {
        setDataStockWatchlist(res?.data?.[0]?.stocks);
        const data = res?.data?.[0]?.stocks;
        if (data) {
          for (const element of data) {
            requestJoinChannel(element.stockCode);
          }
        }
      },
    },
  );

  const getDataSocket = (message: any) => {
    const data = message.data;
    if (data?.id === 3220) {
      setDataStockWatchlistSocket(data);
    }
  };

  const getInitDataStockWatchlistHome = () => {
    run();
    socket.on('public', getDataSocket);
  };

  const closeSocket = () => {
    if (dataStockWatchlist) {
      for (const element of dataStockWatchlist) {
        requestLeaveChannel(element.stockCode);
      }
    }
    socket.off('public', getDataSocket);
  };

  return {
    getInitDataStockWatchlistHome,
    closeSocket,
  };
};
