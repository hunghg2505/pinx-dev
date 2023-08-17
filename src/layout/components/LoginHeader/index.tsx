import React from 'react';

import { useRouter } from 'next/router';

const LoginHeader = () => {
  const router = useRouter();

  return (
    <div
      className='z-999 fixed left-[18px] top-[10px] flex h-[44px] cursor-pointer items-center  desktop:h-[56px]'
      onClick={router.back}
    >
      <img
        src='/static/icons/back_icon.svg'
        alt=''
        className='left-[10px] top-[23px] h-[28px] w-[28px] laptop:hidden'
      />
    </div>
  );
};

export default LoginHeader;
