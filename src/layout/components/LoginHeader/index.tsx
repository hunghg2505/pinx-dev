import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  return (
    <>
      <Image
        src='/static/icons/back_icon.svg'
        alt=''
        width='0'
        height='0'
        className={'z-999 fixed left-[10px] top-[23px] h-[28px] w-[28px]'}
        onClick={() => router.back()}
      />
    </>
  );
};

export default Header;
