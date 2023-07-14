import React from 'react';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import updateImg from './shopinext-update_account.png';

const UpdateAccount = () => {
  const { t } = useTranslation('profile');
  return (
    <div className='my-[20px] px-[16px]'>
      <div className='width-[100%]  rounded-[12px] bg-primary_bgblue_2 p-[12px] text-center'>
        <Image
          src={updateImg}
          height={150}
          width={150}
          alt='upgrade_to_trading_account'
          className='mx-auto mb-[12px] h-[150px] w-[150px]'
        />
        <button
          className='
          rounded-[8px] bg-gradient-to-l from-[#1D6CAB]
          to-[#589DC0]
        px-[24px]
        py-[12px]
        text-[16px]
        font-[700]
        text-white
        '
        >
          {t('upgrade_to_trading_account')}
        </button>
      </div>
    </div>
  );
};
export default UpdateAccount;
