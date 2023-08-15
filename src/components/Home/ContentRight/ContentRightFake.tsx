import React from 'react';

import SkeletonLoading from '@components/UI/Skeleton';

const ContentRightFake = () => {
  return (
    <>
      <div className='mb-[25px] min-h-[536px] w-full rounded-[8px] bg-[#fff]  px-[20px] py-[30px] '>
        <p className='body-16-bold cbblack mb-[25px]'>Market</p>

        <img
          loading='lazy'
          src='/static/images/fake-stock.png'
          className='w-full object-contain'
          alt=''
        />
      </div>

      <div className='mb-[25px] h-[496px] w-full rounded-[8px] bg-[#fff]  px-[30x] py-[20px] '>
        <SkeletonLoading hiddenImg={false} />
      </div>
      <div className='mb-[25px] h-[496px] w-full rounded-[8px] bg-[#fff]  px-[30x] py-[20px]'>
        <SkeletonLoading hiddenImg={false} />
      </div>
    </>
  );
};

export default ContentRightFake;
