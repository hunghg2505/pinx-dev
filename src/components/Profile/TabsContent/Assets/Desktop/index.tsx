import React from 'react';

import { useTranslation } from 'next-i18next';

import { APP_STORE_DOWNLOAD, GOOGLE_PLAY_DOWNLOAD } from 'src/constant';

const Desktop = () => {
  const { t } = useTranslation('profile');
  return (
    <div className='width-[100%]  flex flex-wrap justify-center rounded-[12px]  py-[32px] text-center '>
      <p className='line-[21px] mb-[12px] text-[16px] font-[700] text-dark_grey'>
        {t('asset_desktop')}
      </p>
      <p className='line-[18px] mb-[16px] w-[400px] text-[14px] text-dark_grey'>
        {t('install_app')}
      </p>
      <div className='flex justify-center gap-[23px]'>
        <img
          src={'/static/images/googleplay.png'}
          height={180}
          width={52}
          alt="Don't have any result"
          className=' mb-[12px] h-[52px] w-[180px] object-contain '
          onClick={() => window.open(GOOGLE_PLAY_DOWNLOAD)}
        />

        <img
          src={'/static/images/appstore.png'}
          height={180}
          width={52}
          alt="Don't have any result"
          className=' mb-[12px] h-[52px] w-[180px] object-contain '
          onClick={() => window.open(APP_STORE_DOWNLOAD)}
        />
      </div>
    </div>
  );
};
export default Desktop;
