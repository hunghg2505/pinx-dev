import React from 'react';

import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  return (
    <>
      <img
        src='/static/icons/back_icon.svg'
        alt=''
        width='0'
        height='0'
        className='z-999 fixed left-[10px] top-[23px] h-[28px] w-[28px] laptop:hidden'
        onClick={() => router.back()}
      />
    </>
  );
};

export default Header;
