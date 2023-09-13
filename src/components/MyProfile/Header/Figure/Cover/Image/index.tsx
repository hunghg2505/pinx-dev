import React from 'react';

import Image from 'next/image';

const Img = ({ coverImage }: { coverImage: string }) => {
  return (
    <>
      <Image
        width='0'
        height='0'
        sizes='100vw'
        src={coverImage}
        alt='background cover'
        className='absolute left-0 top-0 h-full w-full object-cover tablet:rounded-[8px]'
      />
    </>
  );
};
export default Img;
