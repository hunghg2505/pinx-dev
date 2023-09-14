import React from 'react';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { DownloadPineXApp } from '@utils/dataLayer';

const MainHeaderFake = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className='flex justify-between bg-[#EAF4FB] p-[10px] tablet:hidden'>
        <div className='flex flex-row'>
          <Image
            loading='lazy'
            src='/static/logo/logo.png'
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='h-[35px] w-[35px]'
          />
          <div className='ml-[8px]'>
            <Text type='body-14-regular' color='primary-5'>
              {t('try_full_experience_on')}
            </Text>
            <CustomLink
              href='https://onelink.to/cgarrk'
              onClick={() => DownloadPineXApp('CTA in App', 'Header')}
            >
              <Text type='body-14-medium' color='primary-5'>
                {t('mobile_app')}
              </Text>
            </CustomLink>
          </div>
        </div>
        <CustomLink
          href='https://onelink.to/cgarrk'
          onClick={() => DownloadPineXApp('CTA in App', 'Header')}
        >
          <div className='flex h-[38px] w-[101px] items-center justify-center rounded-[41px] bg-[linear-gradient(247.96deg,_#1D6CAB_14.41%,_#589DC0_85.59%)] [box-shadow:0px_4px_16px_rgba(88,_157,_192,_0.24)]'>
            <Text type='body-14-bold' color='neutral-9'>
              {t('open_app')}
            </Text>
          </div>
        </CustomLink>
      </div>

      <div className='flex h-[56px] items-center border-b-[1px] border-solid border-[#EBEBEB] bg-white px-[10px] desktop:h-[84px] desktop:px-0'>
        <div className='mx-auto flex w-[100%]  max-w-[1355px] items-center justify-between gap-[32px]'>
          <div className='flex items-center'>
            <Image
              src='/static/logo/logo.png'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='hidden h-[40px] w-[40px] object-contain desktop:block desktop:h-[52px] desktop:w-[52px]'
            />
            <img
              src='/static/logo/logo-website-pinetree.svg'
              alt='Logo pinetree'
              className='ml-[12px] hidden h-[32px] desktop:block'
            />
          </div>

          <div className='flex items-center gap-[12px]'>
            <div className='h-[36px] rounded-[4px] border border-[--primary-6] bg-[#EAF4FB] mobile:w-[90px] desktop:w-[122px]'></div>
            <div className='h-[36px] rounded-[4px] bg-[linear-gradient(230.86deg,_rgba(29,_108,_171,_0.99)_0%,_rgba(88,_157,_192,_0.99)_100%)] mobile:hidden desktop:block desktop:w-[122px]'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeaderFake;
