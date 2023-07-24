import React from 'react';

import SkeletonLoading from '@components/UI/Skeleton';

const ContentRightFake = () => {
  return (
    <>
      <div className='mb-[25px] min-h-[536px] w-full rounded-[8px] bg-[#fff]  px-[20px] py-[30px]  [box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
        <p className='body-16-bold cbblack mb-[25px]'>Market</p>

        <img src='/static/images/fake-stock.png' className='w-full object-contain' alt='' />
      </div>

      <div className='mb-[25px] h-[496px] w-full rounded-[8px] bg-[#fff]  px-[30x] py-[20px]  [box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
        <SkeletonLoading hiddenImg={false} />
      </div>
      <div className='mb-[25px] h-[496px] w-full rounded-[8px] bg-[#fff]  px-[30x] py-[20px] [box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
        <SkeletonLoading hiddenImg={false} />
      </div>
    </>
  );
};

export default ContentRightFake;
