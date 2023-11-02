import { useRequest } from 'ahooks';
import { useAtom } from 'jotai';

import { PRIVATE_WATCHLIST_STOCK } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { requestJoinChannel, requestLeaveChannel } from '@components/Home/service';
import { atomStockWatchlist, atomStockWatchlistSocket } from '@store/stockWatchlistHome';
import { socket } from 'src/socket/socket';

export const useStockWatchlistHome = () => {
  const [dataStockWatchlist, setDataStockWatchlist] = useAtom(atomStockWatchlist);
  const [, setDataStockWatchlistSocket] = useAtom(atomStockWatchlistSocket);

  const { run } = useRequest(
    () => {
      return privateRequest(requestPist.get, PRIVATE_WATCHLIST_STOCK);
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
    removePublicEventListener();
  };

  const removePublicEventListener = () => {
    socket.off('public', getDataSocket);
  };

  return {
    getInitDataStockWatchlistHome,
    closeSocket,
    removePublicEventListener,
  };
};
