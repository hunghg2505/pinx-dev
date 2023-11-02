import { useEffect } from 'react';

import { useAtomValue } from 'jotai';

import { requestJoinChannel, requestJoinIndex } from '@components/Home/service';
import { stockSocketAtom } from '@store/stockStocket';
import { socket } from 'src/socket/socket';

const InitialSocket = () => {
  const stockSocket = useAtomValue(stockSocketAtom);

  useEffect(() => {
    socket.on('connect', () => {
      const listStockCodes = [];
      for (const item of stockSocket) {
        listStockCodes.push(...item.stocks);
      }
      const uniqueStockCodes: string[] = [];
      for (const code of listStockCodes) {
        if (!uniqueStockCodes.includes(code)) {
          uniqueStockCodes.push(code);
        }
      }
      if (uniqueStockCodes.length > 0) {
        requestJoinChannel(uniqueStockCodes.toString());
      }

      // join index
      requestJoinIndex();
    });

    return () => {
      socket.off('connect');
    };
  }, [stockSocket]);

  return <></>;
};

export default InitialSocket;
