import React from 'react';

import { useRouter } from 'next/router';

import Text from '@components/UI/Text';

const PageNotFound = () => {
  const router = useRouter();

  const onGoHome = () => {
    router.push('/');
  };
  return (
    <>
      <div className='flex h-[100vh] flex-col content-center items-center justify-center bg-[#f8f8f8] p-10'>
        <div className='mb-[40px]'>
          <img src='/static/icons/icon404.svg' alt='' width='0' height='0' />
        </div>
        <Text className='mb-[20px] text-7xl text-[#777777]' color='gray'>
          404
        </Text>
        <Text className='mb-[20px] text-[#b5b9b8]' type='body-30-bold'>
          Page not found
        </Text>
        <Text className='mb-[10px] text-center text-[#777777]'>
          The page you are looking for doesn&apos;t exist or an other error occurred
        </Text>
        <Text className='cursor-pointer' color='primary-2' type='body-14-bold' onClick={onGoHome}>
          Go home
        </Text>
      </div>
    </>
  );
};
export default PageNotFound;
