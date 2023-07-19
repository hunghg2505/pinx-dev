import React from 'react';

import { useRouter } from 'next/router';

import { ROUTE_PATH } from '@utils/common';

const Back = () => {
  const router = useRouter();
  return (
    <>
      <span
        className='absolute left-[16px] top-[16px] z-10 tablet:hidden'
        onClick={() => {
          router.push(ROUTE_PATH.HOME);
        }}
      >
        <svg
          width='29'
          height='29'
          viewBox='0 0 29 29'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect width='29' height='29' rx='14.5' fill='black' fillOpacity='0.5' />
          <path
            d='M16.5139 20.1391L10.875 14.5002L16.5139 8.86133'
            stroke='white'
            strokeWidth='2.4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </span>
      <div className='absolute bottom-[calc(100%)]  hidden w-full  tablet:block '>
        <img
          src='/static/icons/arrow-left.svg'
          alt='back'
          className='mb-[20px] h-[32px] w-[32px] cursor-pointer'
          width={18.67}
          height={18.67}
          onClick={() => {
            router.push(ROUTE_PATH.HOME);
          }}
        />
        <hr className='mx-[-24px] my-[20px] border-blue_light' />
      </div>
    </>
  );
};
export default Back;