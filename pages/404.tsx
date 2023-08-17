import React from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Text from '@components/UI/Text';

const PageNotFound = () => {
  const { t } = useTranslation('notFound');
  const router = useRouter();

  const onGoHome = () => {
    router.push('/');
  };
  return (
    <>
      <div className='flex h-[100vh] flex-col content-center items-center justify-center bg-[#f8f8f8] p-10'>
        <div className='flex flex-col items-center justify-center'>
          <img
            loading='lazy'
            src='/static/images/notFound.png'
            className='h-[191px] w-[246px]'
            alt=''
          />
          <Text className='mb-[8px] mt-[24px] text-[59px] leading-[71px]' color='neutral-1'>
            404
          </Text>
          <Text type='body-22-bold' color='neutral-1' className='mb-[8px] galaxy-max:text-[20px]'>
            {t('page_not_found')}
          </Text>
          <Text
            type='body-14-regular'
            color='neutral-2'
            className='text-center galaxy-max:text-[12px]'
          >
            {t('description')}
          </Text>
          <div className='mt-[24px] flex h-[45px] w-[158px] flex-row items-center justify-center rounded-[22.5px] bg-[linear-gradient(238deg,_rgba(29,_108,_171,_0.99)_0%,_rgba(88,_157,_192,_0.99)_100%)] backdrop-blur-[13.591408729553223px] backdrop-filter [box-shadow:0px_4px_13px_0px_rgba(88,_157,_192,_0.30)]'>
            <Text
              className='cursor-pointer'
              color='cbwhite'
              type='body-16-medium'
              onClick={onGoHome}
            >
              {t('go_home')}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'notFound'])),
      // Will be passed to the page component as props
    },
  };
}

export default PageNotFound;
