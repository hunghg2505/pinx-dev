import React from 'react';

import { Skeleton } from '@components/UI/Skeleton';

const NewsFeedSkeleton = () => {
  return (
    <div className='card-style box-shadow'>
      <div className='flex items-center'>
        <Skeleton avatar className='!h-[44px] !w-[44px] tablet:!h-[56px] tablet:!w-[56px]' />

        <div className='flex flex-col gap-y-[8px]'>
          <Skeleton height={10} wrapClassName='ml-[4px]' />
          <Skeleton height={10} width={50} wrapClassName='ml-[4px]' />
        </div>
      </div>

      <div className='mt-[14px] desktop:ml-[60px] desktop:mt-0'>
        <Skeleton rows={4} className='!w-full' height={15} />

        <Skeleton className='mt-[12px] !w-full !rounded-[9px]' height={240} />
      </div>
    </div>
  );
};

export default NewsFeedSkeleton;
