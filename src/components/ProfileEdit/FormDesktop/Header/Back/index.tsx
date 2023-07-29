import React from 'react';

import { useRouter } from 'next/router';

const Back = () => {
  const router = useRouter();
  return (
    <>
      <div className='absolute left-[16px] top-[16px] z-10 h-[28px] w-[28px] rounded-full bg-white/50'>
        <img
          src='/static/icons/back_icon.svg'
          alt='back'
          className='h-[28px] w-[28px] cursor-pointer '
          onClick={() => {
            router.back();
          }}
        />
      </div>
    </>
  );
};
export default Back;
