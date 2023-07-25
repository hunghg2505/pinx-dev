import React from 'react';

import { useAtom } from 'jotai';
import { useRouter } from 'next/router';

import { openProfileAtom } from '@store/profile/profile';

const Back = () => {
  const router = useRouter();
  const fromProfileMenu = router.query.from_profile_menu;
  const [, setOpenProfileMenu] = useAtom(openProfileAtom);

  return (
    <>
      <span
        className='absolute left-[16px] top-[16px] z-10 cursor-pointer tablet:hidden'
        onClick={() => {
          if (fromProfileMenu) {
            setOpenProfileMenu(true);
          }
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
      <div className='absolute bottom-[calc(100%)]  mb-[20px] hidden  w-full tablet:block'>
        <img
          src='/static/icons/arrow-left.svg'
          alt='back'
          className=' h-[28px] w-[28px] cursor-pointer '
          width={18.67}
          height={18.67}
          onClick={() => {
            router.back();
          }}
        />
      </div>
    </>
  );
};
export default Back;
