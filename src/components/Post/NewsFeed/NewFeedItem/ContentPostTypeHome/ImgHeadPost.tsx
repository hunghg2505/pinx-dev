import React from 'react';

interface IPropsImageHeadPost {
  headImageUrl: string;
}

const ImageHeadPost = ({ headImageUrl }: IPropsImageHeadPost) => {
  if (!headImageUrl) {
    return <></>;
  }

  return (
    <>
      <img
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
