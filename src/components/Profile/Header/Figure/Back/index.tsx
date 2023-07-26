import React from 'react';

import { useRouter } from 'next/router';

const Back = () => {
  const router = useRouter();
  return (
    <>
      <span
        className='absolute left-[16px] top-[16px] z-10 cursor-pointer tablet:hidden'
        onClick={() => {
          router.back();
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
      <div className='absolute bottom-[calc(100%)]  mb-[calc(42px-28px)] hidden  w-full tablet:block '>
        <img
          src='/static/icons/back_icon.svg'
          alt='back'
          className=' h-[28px] w-[28px] cursor-pointer'
          width={28}
          height={28}
          onClick={() => {
            router.back();
          }}
        />
      </div>
    </>
  );
};
export default Back;
