import React from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

import { ROUTE_PATH } from '@utils/common';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const hideArrow =
    pathname === ROUTE_PATH.REGISTER_OTP_VERIFICATION ||
    pathname === ROUTE_PATH.LOGIN_OTP_VERIFICATION;

  return (
    <>
      {!hideArrow && (
        <Image
          src='/static/icons/back_icon.svg'
          alt=''
          width='0'
          height='0'
          className='z-999 fixed left-[10px] top-[23px] h-[28px] w-[28px] laptop:hidden'
          onClick={() => router.back()}
        />
      )}
    </>
  );
};

export default Header;
