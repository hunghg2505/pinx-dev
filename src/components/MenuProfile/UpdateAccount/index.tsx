import React from 'react';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { MainButton } from '@components/UI/Button';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';

import updateImg from './shopinext-update_account.png';

const handleRedirect = () => {
  window.open('https://onelink.to/cgarrk', '_blank');
};

const UpdateAccount = () => {
  const { t } = useTranslation('profile');
  const { userType } = useUserLoginInfo();

  if (userType !== 'NEW') {
    return <></>;
  }

  return (
    <div className='my-[20px] px-[16px]'>
      <div className='width-[100%] rounded-[12px] bg-primary_bgblue_2 p-[12px] text-center'>
        <Image
          src={updateImg}
          height={150}
          width={150}
          alt='upgrade_to_trading_account'
          className='mx-auto mb-[12px] h-[150px] w-[150px]'
        />
        <MainButton className='px-12' onClick={handleRedirect}>
          {t('upgrade_to_trading_account')}
        </MainButton>
      </div>
    </div>
  );
};
export default UpdateAccount;
