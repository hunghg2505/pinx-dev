import React from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';

interface IPropsImageHeadPost {
  headImageUrl: string;
}

const ImageHeadPost = ({ headImageUrl }: IPropsImageHeadPost) => {
  if (!headImageUrl) {
    return <></>;
  }

  return (
    <>
      <LazyLoadImage
        src={headImageUrl}
        alt=''
        className='absolute left-0 top-0 h-full w-full rounded-[9px]'
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />
    </>
  );
};

export default ImageHeadPost;
