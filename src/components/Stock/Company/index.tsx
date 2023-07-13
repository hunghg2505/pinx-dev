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
    <div className='mx-auto mobile:w-[375px]'>
      <div className='inline-block cursor-pointer items-center p-[16px]' onClick={handleBack}>
        <img
          src='/static/icons/icon_back_header.svg'
          alt=''
          className='h-[14px] w-[7px] object-contain'
        />
      </div>

      <div className='px-[16px]'>
        <div className='flex items-center'>
          <div className='flex h-[40px] w-[40px] items-center justify-center rounded-[12px] bg-[#5F6178]'>
            <img
              src='/static/icons/iconBusiness.svg'
              alt='Icon'
              className='h-[13px] w-[21px] object-contain'
            />
          </div>

          <div className='ml-[12px] flex-1'>
            <Text type='body-14-semibold' className='text-[#0D0D0D]'>
              Car manufacturing
            </Text>

            <Text type='body-14-regular' className='mt-[4px] text-[#0D0D0D]'>
              List of companies operating in the field of Car manufacturing
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
    </div>
  );
};

export default Company;
