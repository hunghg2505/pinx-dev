import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import EmptyData from '@components/Stock/EmptyData';
import { useStockWatching } from '@components/Stock/service';
import { IResponseWatchingInvesting } from '@components/Stock/type';
import useBottomScroll from '@hooks/useBottomScroll';

import SkeletonLoading from '../SkeletonLoading';
import SubscriberItem from '../SubscriberItem';

interface IWatchingTabProps {
  stockCode: string;
}

const WatchingTab = ({ stockCode }: IWatchingTabProps) => {
  const { t } = useTranslation('stock');
  const ref = useRef(null);
  const [stockWatching, setStockWatching] = useState<IResponseWatchingInvesting>();

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

  useBottomScroll(ref, () => {
    if (stockWatching?.data.hasNext && !requestGetStockWatching.loading) {
      requestGetStockWatching.run(stockWatching.data.last);
    }
  });

  useEffect(() => {
    requestGetStockWatching.run();
  }, []);

  return (
    <>
      <div
        ref={ref}
        className={classNames(
          'mt-[20px] grid grid-cols-1 gap-x-[24px] gap-y-[16px] tablet:grid-cols-2 tablet:gap-y-[20px]',
          {
            'tablet:!grid-cols-1': !stockWatching?.data.list.length,
          },
        )}
      >
        {stockWatching?.data.list.map((item, index) => (
          <SubscriberItem data={item} key={index} />
        ))}

        {stockWatching?.data.hasNext && requestGetStockWatching.loading && (
          <>
            <SkeletonLoading />
            <SkeletonLoading />
          </>
        )}

        {!stockWatching?.data.list.length && (
          <EmptyData title={t('no_data_yet')} description={t('no_data_desc')} />
        )}
      </div>
    </>
  );
};

export default WatchingTab;
