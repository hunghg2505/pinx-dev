import React, { useEffect, useState } from 'react';

import { useStockWatching } from '@components/Stock/service';
import { IResponseWatchingInvesting } from '@components/Stock/type';
import Text from '@components/UI/Text';
import useBottomScroll from '@hooks/useBottomScroll';
import { useResponsive } from '@hooks/useResponsive';

import SubscriberItem from '../SubscriberItem';

interface IWatchingTabProps {
  stockCode: string;
}

const WatchingTab = ({ stockCode }: IWatchingTabProps) => {
  const [stockWatching, setStockWatching] = useState<IResponseWatchingInvesting>();
  const { isMobile } = useResponsive();

  const requestGetStockWatching = useStockWatching(stockCode, {
    onSuccess: ({ data }: IResponseWatchingInvesting) => {
      setStockWatching((prev) => ({
        data: {
          hasNext: data.hasNext,
          last: data.last,
          list: [...(prev?.data.list || []), ...data.list],
        },
      }));
    },
  });

  useBottomScroll(() => {
    if (isMobile && stockWatching?.data.hasNext && !requestGetStockWatching.loading) {
      requestGetStockWatching.run(stockWatching.data.last);
    }
  });

  useEffect(() => {
    requestGetStockWatching.run();
  }, []);

  const handleViewMore = () => {
    requestGetStockWatching.run(stockWatching?.data.last);
  };

  return (
    <>
      <div className='mb-[32px] mt-[20px] grid grid-cols-1 gap-x-[24px] gap-y-[16px] tablet:grid-cols-2 tablet:gap-y-[20px]'>
        {stockWatching?.data.list.map((item, index) => (
          <SubscriberItem data={item} key={index} />
        ))}
      </div>

      {stockWatching?.data.hasNext && !isMobile && (
        <Text
          type='body-14-semibold'
          className='mb-[32px] mt-[24px] cursor-pointer'
          color='primary-2'
          onClick={handleViewMore}
        >
          Show more
        </Text>
      )}
    </>
  );
};

export default WatchingTab;