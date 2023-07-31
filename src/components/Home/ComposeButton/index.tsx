import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { useUserType } from '@hooks/useUserType';
// import PopupComponent from '@utils/PopupComponent';

const ComposeButton = () => {
  const { t } = useTranslation('home');
  const { isLogin } = useUserType();

  // const handleClick = () => {
  //   if (isLogin) {
  //     if (statusUser === USERTYPE.VSD) {
  //       // console.log('User vsd');
  //     } else {
  //       // PopupComponent.openEKYC();
  //       setPopupStatus({
  //         ...popupStatus,
  //         popupEkyc: true,
  //       });
  //     }
  //   } else {
  //     setPopupStatus({
  //       ...popupStatus,
  //       popupAccessLinmit: true,
  //     });
  //   }
  // };

  return (
    <div
      className={classNames('fixed right-[10px] z-[100] h-[44px]', {
        'bottom-[10px]': isLogin,
        'bottom-[60px]': !isLogin,
      })}
    >
      <button className='flex h-full min-w-[130px] items-center rounded-[23px] bg-[linear-gradient(247.96deg,#1D6CAB_14.41%,#589DC0_85.59%)] px-[16px] tablet:hidden desktop:hidden'>
        <img
          src='/static/icons/iconPen.svg'
          alt='Icon pen'
          width={24}
          height={24}
          className='mr-[8px] h-[24px] w-[24px] object-contain'
        />

        <Text type='body-14-bold' color='neutral-9'>
          {t('compose')}
        </Text>
      </button>
    </div>
  );
};

export default ComposeButton;
