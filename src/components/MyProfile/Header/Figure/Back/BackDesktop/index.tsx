import React from 'react';

import { useRouter } from 'next/router';

const BackDesktop = () => {
  const router = useRouter();
  return (
    <>
      <div className='absolute left-[16px] top-[16px] z-10 h-[28px] w-[28px] rounded-full bg-white/50'>
        <img
          src='/static/icons/back_icon.svg'
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
export default BackDesktop;
