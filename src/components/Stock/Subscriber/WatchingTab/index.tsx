import React from 'react';

import { useStockWatching } from '@components/Stock/service';

import SubscriberItem from '../SubscriberItem';

interface IWatchingTabProps {
  stockCode: string;
}

const WatchingTab = ({ stockCode }: IWatchingTabProps) => {
  const { stockWatching } = useStockWatching(stockCode);

  return (
    <div className='mb-[32px] mt-[20px] grid grid-cols-1 gap-x-[24px] gap-y-[16px] tablet:grid-cols-2 tablet:gap-y-[20px]'>
      {stockWatching?.data.list.map((item, index) => (
        <SubscriberItem data={item} key={index} />
      ))}
    </div>
  );
};

export default WatchingTab;
