import { useEffect } from 'react';

import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import Script from 'next/script';

// import PopupAccessLimit from '@components/UI/Popup/PopupAccessLimit';
// import PopupAuth from '@components/UI/Popup/PopupAuth';
// import PopupLoginTerms from '@components/UI/Popup/PopupLoginTerms';
// import PopupRegisterOtp from '@components/UI/Popup/PopupOtp';
// import PopupRegisterCreateUsername from '@components/UI/Popup/PopupUsername';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { initialPopupStatus, popupStatusAtom } from '@store/popup/popup';
import { ENV } from '@utils/env';

const PopupAccessLimit = dynamic(() => import('@components/UI/Popup/PopupAccessLimit'));
const PopupAuth = dynamic(() => import('@components/UI/Popup/PopupAuth'));
const PopupLoginTerms = dynamic(() => import('@components/UI/Popup/PopupLoginTerms'));
const PopupRegisterOtp = dynamic(() => import('@components/UI/Popup/PopupOtp'));
const PopupRegisterCreateUsername = dynamic(() => import('@components/UI/Popup/PopupUsername'));

const PopupHomeNoti = () => {
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { userType, isReadTerms } = useUserLoginInfo();
  useEffect(() => {
    if (!!userType && !isReadTerms) {
      setPopupStatus({
        ...popupStatus,
        popupLoginTerms: true,
      });
    }
  }, [userType, isReadTerms]);

  const onCloseModal = () => {
    setPopupStatus(initialPopupStatus);
  };

  return (
    <>
      {popupStatus.popupAccessLinmit && (
        <PopupAccessLimit visible={popupStatus.popupAccessLinmit} onClose={onCloseModal} />
      )}
      {popupStatus.popupLoginTerms && (
        <PopupLoginTerms visible={popupStatus.popupLoginTerms} onClose={onCloseModal} />
      )}
      {popupStatus.popupAuth && (
        <>
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${ENV.RECAPTHCHA_SITE_KEY}`}
          />
          <PopupAuth visible={popupStatus.popupAuth} onClose={onCloseModal} />
        </>
      )}
      {popupStatus.popupRegisterOtp && (
        <PopupRegisterOtp visible={popupStatus.popupRegisterOtp} onClose={onCloseModal} />
      )}
      {popupStatus.popupRegisterUsername && (
        <PopupRegisterCreateUsername
          visible={popupStatus.popupRegisterUsername}
          onClose={onCloseModal}
        />
      )}
    </>
  );
};

export default PopupHomeNoti;
