import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter();

  return (
    <>
      <Image src='/static/icons/back_icon.svg' alt='' width='0' height='0' className={'w-[28px] h-[28px] fixed top-[23px] left-[10px] z-999'} onClick={() => router.back()} />
    </>
  );
};

export default Header;
