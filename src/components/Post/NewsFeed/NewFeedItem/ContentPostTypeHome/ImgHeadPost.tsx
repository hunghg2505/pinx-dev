import React from 'react';

import Image from 'next/image';

interface IPropsImageHeadPost {
  headImageUrl: string;
  alt: string;
  title: string;
}

const ImageHeadPost = ({ headImageUrl, alt, title }: IPropsImageHeadPost) => {
  if (!headImageUrl) {
    return <></>;
  }

  return (
    <>
      <Image
        width='0'
        height='0'
        sizes='100vw'
        src={headImageUrl}
        alt={alt}
        title={title}
        className='absolute left-0 top-0 h-full w-full rounded-[9px] object-cover'
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />
    </>
  );
};

export default ImageHeadPost;
