import React from 'react';

import Image from 'next/image';

interface IPropsImageHeadPost {
  headImageUrl: string;
  alt: string;
  title: string;
  priority: boolean;
}

const ImageHeadPost = ({ headImageUrl, alt, title, priority }: IPropsImageHeadPost) => {
  if (!headImageUrl) {
    return <></>;
  }

  return (
    <>
      <Image
        // width='0'
        // height='0'
        // sizes='100vw'
        fill
        sizes='(min-width: 1400px) 642px, (min-width: 1200px) calc(86.11vw - 546px), (min-width: 780px) calc(100vw - 399px), calc(100vw - 45px)'
        priority={priority}
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
