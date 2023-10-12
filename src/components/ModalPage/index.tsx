import React from 'react';

import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';

// import PopupAccessLimit from '@components/UI/Popup/PopupAccessLimit';
// import PopupAuth from '@components/UI/Popup/PopupAuth';
// import PopUpEkycInternal from '@components/UI/Popup/PopupEkycInternal';
// import PopupLoginTerms from '@components/UI/Popup/PopupLoginTerms';
// import PopupRegisterOtp from '@components/UI/Popup/PopupOtp';
// import PopupSubsribeTheme from '@components/UI/Popup/PopupSubscribeTheme';
// import PopupRegisterCreateUsername from '@components/UI/Popup/PopupUsername';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { initialPopupStatus, popupStatusAtom } from '@store/popup/popup';

const PopupAccessLimit = dynamic(() => import('@components/UI/Popup/PopupAccessLimit'));
const PopupAuth = dynamic(() => import('@components/UI/Popup/PopupAuth'));
const PopUpEkycInternal = dynamic(() => import('@components/UI/Popup/PopupEkycInternal'));
const PopupLoginTerms = dynamic(() => import('@components/UI/Popup/PopupLoginTerms'));
const PopupRegisterOtp = dynamic(() => import('@components/UI/Popup/PopupOtp'));
const PopupSubsribeTheme = dynamic(() => import('@components/UI/Popup/PopupSubscribeTheme'));
const PopupRegisterCreateUsername = dynamic(() => import('@components/UI/Popup/PopupUsername'));

const ModalPage = () => {
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);

  const { userType, isReadTerms } = useUserLoginInfo();
  const onCloseModal = () => {
    setPopupStatus(initialPopupStatus);
  };
  React.useEffect(() => {
    if (!!userType && !isReadTerms) {
      setPopupStatus({
        ...popupStatus,
        popupLoginTerms: true,
      });
    }
  }, [userType, isReadTerms]);
  return (
    <>
      {popupStatus.popupAccessLinmit && (
        <PopupAccessLimit visible={popupStatus.popupAccessLinmit} onClose={onCloseModal} />
      )}
      {popupStatus.popupLoginTerms && (
        <PopupLoginTerms visible={popupStatus.popupLoginTerms} onClose={onCloseModal} />
      )}
      {popupStatus.popupAuth && (
        <PopupAuth visible={popupStatus.popupAuth} onClose={onCloseModal} />
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
      {popupStatus.popupEkyc && <PopUpEkycInternal visible={popupStatus.popupEkyc} />}
      {popupStatus.popupSubsribeThemeHome && (
        <PopupSubsribeTheme visible={popupStatus.popupSubsribeThemeHome} />
      )}
    </>
  );
};
export default ModalPage;
