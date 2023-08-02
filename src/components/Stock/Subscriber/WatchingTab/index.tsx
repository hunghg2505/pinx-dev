import React, { useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';

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
  const { t } = useTranslation(['stock', 'common']);
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
      <div className='mt-[20px] grid grid-cols-1 gap-x-[24px] gap-y-[16px] tablet:grid-cols-2 tablet:gap-y-[20px]'>
        {stockWatching?.data.list.map((item, index) => (
          <SubscriberItem data={item} key={index} />
        ))}
      </div>

      {stockWatching?.data.hasNext && (
        <Text
          type='body-14-semibold'
          className='mt-[24px] hidden cursor-pointer tablet:block'
          color='primary-2'
          onClick={handleViewMore}
        >
          {t('show_more')}
        </Text>
      )}
    </>
  );
};

export default WatchingTab;
