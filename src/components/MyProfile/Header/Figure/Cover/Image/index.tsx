import React from 'react';

const Img = ({ coverImage }: { coverImage: string }) => {
  return (
    <>
      <img
        src={coverImage}
        alt='background cover'
        className='absolute left-0 top-0 h-full w-full object-cover tablet:rounded-[8px]'
      />
    </>
  );
};
export default Img;
