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
        width='0'
        height='0'
        sizes='100vw'
        className='absolute left-0 top-0 h-full w-full rounded-bl-none rounded-br-none rounded-tl-[15px] rounded-tr-[15px]'
      />
    </>
  );
};

export default ImageHeadPost;
