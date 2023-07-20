import React from 'react';

import { useRouter } from 'next/router';

import Text from '@components/UI/Text';

import StockItem from '../StockDetail/StockItem';

const Company = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <div className='relative flex h-[46px] items-center justify-center tablet:h-[72px] tablet:border-b tablet:border-solid tablet:border-[#EEF5F9]'>
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

        <Text type='body-20-bold' color='primary-5' className='hidden tablet:block'>
          Company
        </Text>
      </div>

      <div className='px-[16px] tablet:mt-[20px] tablet:px-[24px]'>
        <div className='flex items-center'>
          <div className='flex h-[40px] w-[40px] items-center justify-center rounded-[12px] bg-[#5F6178]'>
            <img
              src='/static/icons/iconBusiness.svg'
              alt='Icon'
              className='h-[13px] w-[21px] object-contain'
            />
          </div>

          <div className='ml-[12px] flex-1 overflow-hidden'>
            <Text type='body-14-semibold' className='text-[#0D0D0D]'>
              Car manufacturing
            </Text>

            <Text
              type='body-14-regular'
              className='mt-[4px] block overflow-hidden text-ellipsis whitespace-nowrap text-[#0D0D0D]'
            >
              List of companies operating in the field of Car manufacturing
            </Text>

            <Text
              type='body-14-semibold'
              color='primary-2'
              className='mt-[12px] inline-block cursor-pointer'
            >
              More...
            </Text>
          </div>
        </div>

        <div className='mb-[32px] mt-[52px] flex items-center justify-between border-b border-solid border-b-[#EBEBEB] pb-[16px]'>
          <Text type='body-14-semibold' className='text-[#0D0D0D]'>
            Total: 9
          </Text>

          <Text type='body-14-regular' color='primary-5'>
            By market cap (Bil VND)
          </Text>
        </div>

        <div className='mb-[32px] flex flex-col gap-y-[20px]'>
          <StockItem />
          <StockItem />
          <StockItem />
          <StockItem />
        </div>
      </div>
    </>
  );
};

export default Company;
