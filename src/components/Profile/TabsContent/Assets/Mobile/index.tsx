import React from 'react';

import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Mobile = () => {
  const { t } = useTranslation('profile');
  return (
    <div className='width-[100%]  flex flex-wrap justify-center rounded-[12px]  py-[32px] text-center '>
      <p className='line-[21px] mb-[12px] max-w-full text-[16px] font-[700] text-dark_grey'>
        {t('asset_desktop')}
      </p>
      <p className='line-[18px] w-[323px] mb-[16px] max-w-full text-[14px] text-dark_grey'>
        {t('install_app')}
      </p>
      <Link
        href={'https://onelink.to/cgarrk'}
        className='line-[18px] block rounded-[41px] bg-gradient-to-r from-[#589DC0] to-[#1D6CAB] px-[18px] py-[10px] text-[14px] font-[700] text-white'
      >
        {t('install')}
      </Link>
    </div>
  );
};
export default Mobile;
