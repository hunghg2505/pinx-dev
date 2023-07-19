import React from 'react';

import { useRouter } from 'next/router';

const Back = () => {
  const router = useRouter();
  return (
    <>
      <span
        className=''
        onClick={() => {
          router.back();
        }}
      >
        <img
          src='/static/icons/chevron-left.svg'
          alt='avatar'
          className=' inline w-[28px] rounded-full'
          width={28}
          height={28}
        />
      </span>
    </>
  );
};
export default Back;
