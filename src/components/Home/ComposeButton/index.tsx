import React from 'react';

import { useAtom } from 'jotai';

import Text from '@components/UI/Text';
import { USERTYPE, useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import PopupComponent from '@utils/PopupComponent';

const ComposeButton = () => {
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { isLogin, statusUser } = useUserType();

  const handleClick = () => {
    if (isLogin) {
      if (statusUser === USERTYPE.VSD) {
        console.log('User vsd');
      } else {
        PopupComponent.openEKYC();
      }
    } else {
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };

  return (
    <div className='mobile:-w-[375px] fixed bottom-[80px] z-10 h-[44px] mobile-max:w-full'>
      <button
        onClick={handleClick}
        className='ml-auto mr-[16px] flex h-full min-w-[130px] items-center rounded-[23px] bg-[linear-gradient(247.96deg,#1D6CAB_14.41%,#589DC0_85.59%)] px-[16px] tablet:hidden desktop:hidden'
      >
        <img
          src='/static/icons/iconPen.svg'
          alt='Icon pen'
          width={24}
          height={24}
          className='mr-[8px] h-[24px] w-[24px] object-contain'
        />

        <Text type='body-14-bold' color='neutral-9'>
          Compose
        </Text>
      </button>
    </div>
  );
};

export default ComposeButton;
