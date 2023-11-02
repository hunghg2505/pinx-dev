import { useEffect, useState } from 'react';

import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useLogin } from '@store/auth/hydrateAuth';
import { localStorageUtils } from '@utils/local-storage-utils';
import { closeWebTracking, mixpanelIdentifyUser, openWebTracking } from 'src/mixpanel/mixpanel';
import { initMixpanel } from 'src/mixpanel/mixpanelInitial';

const Chunk3 = () => {
  const { isLogin } = useLogin();
  const { userLoginInfo } = useUserLoginInfo();
  const [isTrackingOpenWeb, setIsTrackingOpenWeb] = useState(false);

  useEffect(() => {
    // tracking event close web
    const handleClose = () => {
      try {
        localStorageUtils.set('lastTimeVisit', new Date().toISOString());
        closeWebTracking();
        return false;
      } catch {}
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

    initMixpanel().then(() => {
      // tracking event open web
      // const lastTimeVisit = new Date(localStorageUtils.get('lastTimeVisit') as string).toISOString();
      const lastTimeVisit = new Date().toISOString();
      const cif = isLogin ? userLoginInfo?.cif : '';
      if (cif) {
        mixpanelIdentifyUser(cif);
      }
      openWebTracking(isLogin, cif, lastTimeVisit);
      setIsTrackingOpenWeb(true);
    });
  }, [isTrackingOpenWeb, userLoginInfo]);

  return <></>;
};

export default Chunk3;
