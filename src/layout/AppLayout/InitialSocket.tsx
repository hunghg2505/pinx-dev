import { useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';

import { requestJoinChannel, requestJoinIndex } from '@components/Home/service';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useUserType } from '@hooks/useUserType';
import { stockSocketAtom } from '@store/stockStocket';
import { localStorageUtils } from '@utils/local-storage-utils';
import { closeWebTracking, mixpanelIdentifyUser, openWebTracking } from 'src/mixpanel/mixpanel';
import { socket } from 'src/socket/socket';

const InitialSocket = () => {
  const { isLogin } = useUserType();
  const { userLoginInfo } = useUserLoginInfo();
  const stockSocket = useAtomValue(stockSocketAtom);
  const [isTrackingOpenWeb, setIsTrackingOpenWeb] = useState(false);

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

  useEffect(() => {
    // tracking event close web
    const handleClose = () => {
      localStorageUtils.set('lastTimeVisit', new Date().toISOString());
      closeWebTracking();
      return false;
    };
    window.addEventListener('beforeunload', handleClose);

    return () => {
      window.removeEventListener('beforeunload', handleClose);
    };
  }, []);

  useEffect(() => {
    if (userLoginInfo?.loading || isTrackingOpenWeb) {
      return;
    }

    // tracking event open web
    // const lastTimeVisit = new Date(localStorageUtils.get('lastTimeVisit') as string).toISOString();
    const lastTimeVisit = new Date().toISOString();
    const cif = isLogin ? userLoginInfo?.cif : '';
    if (cif) {
      mixpanelIdentifyUser(cif);
    }
    openWebTracking(isLogin, cif, lastTimeVisit);
    setIsTrackingOpenWeb(true);
  }, [isTrackingOpenWeb, userLoginInfo]);

  return <></>;
};

export default InitialSocket;
