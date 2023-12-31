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
      className={classNames(
        'fixed right-[10px] z-[100] flex h-[44px] min-w-[130px]  cursor-pointer items-center rounded-[23px] bg-[linear-gradient(247.96deg,#1D6CAB_14.41%,#589DC0_85.59%)] px-[16px] galaxy-max:h-[40px] galaxy-max:min-w-[120px]  galaxy-max:px-[14px] tablet:hidden desktop:hidden',
        {
          'bottom-[10px]': isLogin,
          'bottom-[60px]': !isLogin,
        },
      )}
    >
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
    </div>
  );
};

export default ComposeButton;
