import React from 'react';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { APP_STORE_DOWNLOAD, GOOGLE_PLAY_DOWNLOAD } from 'src/constant';

const Desktop = () => {
  const { t } = useTranslation('profile');
  return (
    <div className='rounded-[12px] border border-dashed border-primary_light_blue bg-[#F0F7FC] px-[20px] py-[41px] text-center'>
      <div className='mx-auto max-w-[420px] text-center'>
        <Text type='body-16-bold' color='primary-5' className='mb-[12px]'>
          {t('asset_desktop')}
        </Text>

        <Text type='body-14-regular' color='primary-5' className='mb-[32px]'>
          {t('install_app')}
        </Text>
      </div>

      <div className='flex flex-wrap justify-center gap-[20px]'>
        <Image
          sizes='100vw'
          src='/static/images/google-play.png'
          height={180}
          width={52}
          alt="Don't have any result"
          className='h-[62px] w-[215px] cursor-pointer object-contain'
          onClick={() => window.open(GOOGLE_PLAY_DOWNLOAD)}
        />

        <Image
          sizes='100vw'
          src='/static/images/app-store.png'
          height={180}
          width={52}
          alt="Don't have any result"
          className='h-[62px] w-[215px] cursor-pointer object-contain'
          onClick={() => window.open(APP_STORE_DOWNLOAD)}
        />
      </div>
    </div>
  );
};
export default Desktop;
