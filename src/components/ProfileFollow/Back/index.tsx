import React from 'react';

import { useRouter } from 'next/router';

const Back = () => {
  const router = useRouter();
  console.log(router);
  return (
    <>
      <img
        onClick={() => {
          router.push('/');
        }}
        src='/static/icons/chevron-left.svg'
        alt='avatar'
        className='absolute left-[16px] top-[12px] inline w-[28px] rounded-full '
      />
    </>
  );
};
export default Back;
