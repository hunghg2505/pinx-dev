import React from 'react';

import { Skeleton } from '@components/UI/Skeleton';

const WatchListSkeletonLoading = () => {
  return (
    <div className='flex items-center justify-between border-b border-solid border-[#EBEBEB] py-[10px]'>
      <div className='flex items-center'>
        <Skeleton avatar width={48} height={48} />

        <div className='ml-[10px] flex flex-col gap-y-[8px]'>
          <Skeleton height={15} round width={100} />
          <Skeleton height={15} round width={115} />
        </div>
      </div>

      <div className='flex flex-col gap-y-[8px]'>
        <Skeleton height={15} round width={100} wrapClassName='items-end' />
        <Skeleton height={15} round width={115} />
      </div>
    </div>
  );
};

export default WatchListSkeletonLoading;
