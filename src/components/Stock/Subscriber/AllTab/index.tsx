import React from 'react';

import { useStockWatchingInvesting } from '@components/Stock/service';

import SubscriberItem from '../SubscriberItem';

interface IAllTabProps {
  stockCode: string;
}

const AllTab = ({ stockCode }: IAllTabProps) => {
  const { watchingInvesting } = useStockWatchingInvesting(stockCode);

  return (
    <div className='mb-[32px] mt-[20px] grid grid-cols-1 gap-x-[24px] gap-y-[16px] tablet:grid-cols-2 tablet:gap-y-[20px]'>
      {watchingInvesting?.data.list.map((item, index) => (
        <SubscriberItem data={item} key={index} />
      ))}
    </div>
  );
};

export default AllTab;
