import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import Text from '@components/UI/Text';

import AlsoOwnItem from '../AlsoOwnItem';
import { useCompanyTaggingInfo } from '../service';

const AlsoOwn = () => {
  const router = useRouter();
  const { stockCode }: any = router.query;
  const { taggingInfo } = useCompanyTaggingInfo(stockCode);

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Also Own</title>
      </Head>

      <div>
        <div className='relative flex h-[46px] items-center justify-end pr-[16px] tablet:h-[72px] tablet:border-b tablet:border-solid tablet:border-[#EEF5F9] tablet:pr-[24px]'>
          <div className='absolute left-[16px] top-1/2 flex -translate-y-1/2 items-center justify-between tablet:left-[24px]'>
            <div
              className='cursor-pointer items-center py-[12px] pl-[8px] pr-[16px]'
              onClick={handleBack}
            >
              <img
                src='/static/icons/icon_back_header.svg'
                alt=''
                className='h-[14px] w-[7px] object-contain tablet:hidden'
              />

              <img
                src='/static/icons/iconBack.svg'
                alt=''
                className='hidden h-[19px] w-[19px] object-contain tablet:block'
              />
            </div>
          </div>

          <Text type='body-14-semibold' className='text-[#0D0D0D]'>
            Total: {taggingInfo?.data?.subsidiaries.length}
          </Text>
        </div>

        <div className='px-[16px] tablet:px-[24px]'>
          <div className='mb-[32px] mt-[20px] flex flex-col gap-y-[12px]'>
            {taggingInfo?.data?.subsidiaries.map((item, index) => (
              <AlsoOwnItem key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AlsoOwn;
