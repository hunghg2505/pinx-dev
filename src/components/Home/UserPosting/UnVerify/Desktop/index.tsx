import React from 'react';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { APP_STORE_DOWNLOAD, GOOGLE_PLAY_DOWNLOAD } from 'src/constant';

const Desktop = ({ close }: { close?: () => void }) => {
  const { t } = useTranslation('common');
  const { t: profile } = useTranslation('profile');
  return (
    <div className=' max-[calc(100%-32px)]  m-0 w-[500px] overflow-hidden rounded-[12px] bg-white'>
      <div className='p-[24px] text-center'>
        <header className='text-right'>
          <button className='ml-auto items-end' onClick={close}>
            <svg
              width='21'
              height='21'
              viewBox='0 0 21 21'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-neutral_05'
            >
              <path d='M18.26 18.26L2.73828 2.73828' strokeWidth='2.5' strokeLinecap='round' />
              <path d='M2.73828 18.26L18.26 2.73828' strokeWidth='2.5' strokeLinecap='round' />
            </svg>
          </button>
        </header>
        <p className='line-[32px] mb-[20px] text-[24px] font-[700] text-dark_grey'>
          {t('access_limited')}
        </p>
        <p className='line-[21px] m-auto mb-[16px] w-[400px] text-[16px] text-dark_grey'>
          {profile('install_app')}
        </p>
        <div className='flex justify-center gap-[23px]'>
          <Image
            src={'/static/images/googleplay.png'}
            height={180}
            width={52}
            sizes='100vw'
            alt="Don't have any result"
            className=' mb-[12px] h-[52px] w-[180px] object-contain '
            onClick={() => window.open(GOOGLE_PLAY_DOWNLOAD)}
          />

          <Image
            sizes='100vw'
            src={'/static/images/appstore.png'}
            height={180}
            width={52}
            alt="Don't have any result"
            className=' mb-[12px] h-[52px] w-[180px] object-contain '
            onClick={() => window.open(APP_STORE_DOWNLOAD)}
          />
        </div>
      </div>
    </div>
  );
};
export default Desktop;
