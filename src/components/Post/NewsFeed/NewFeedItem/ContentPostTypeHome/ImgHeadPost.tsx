import React from 'react';

import Image from 'next/image';

interface IPropsImageHeadPost {
  headImageUrl: string;
}

const ImageHeadPost = ({ headImageUrl }: IPropsImageHeadPost) => {
  if (!headImageUrl) {
    return <></>;
  }

  return (
    <>
      <Image
        src={headImageUrl}
        alt=""
        className='absolute left-0 top-0 h-full w-full rounded-[9px]'
        width={641}
        height={360}
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />
    </>
  );
};

export default ImageHeadPost;
