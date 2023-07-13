import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import Text from '@components/UI/Text';

import AlsoOwnItem from '../AlsoOwnItem';

const AlsoOwn = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Also Own</title>
      </Head>

      <div className='mx-auto px-[16px] mobile:w-[375px]'>
        <div className='flex items-center justify-between'>
          <div
            className='cursor-pointer items-center py-[12px] pl-[8px] pr-[16px]'
            onClick={handleBack}
          >
            <img
              src='/static/icons/icon_back_header.svg'
              alt=''
              className='h-[14px] w-[7px] object-contain'
            />
          </div>

          <Text type='body-14-semibold' className='text-[#0D0D0D]'>
            Total: 9
          </Text>
        </div>

        <div className='mb-[32px] mt-[20px] flex flex-col gap-y-[12px]'>
          <AlsoOwnItem />
          <AlsoOwnItem />
          <AlsoOwnItem />
          <AlsoOwnItem />
          <AlsoOwnItem />
          <AlsoOwnItem />
          <AlsoOwnItem />
          <AlsoOwnItem />
          <AlsoOwnItem />
          <AlsoOwnItem />
        </div>
      </div>
    </>
  );
};

export default AlsoOwn;
