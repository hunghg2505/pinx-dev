import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import EmptyData from '@components/Stock/EmptyData';
import { useStockWatchingInvesting } from '@components/Stock/service';
import { IResponseWatchingInvesting } from '@components/Stock/type';
import useBottomScroll from '@hooks/useBottomScroll';

import SkeletonLoading from '../SkeletonLoading';
import SubscriberItem from '../SubscriberItem';

interface IAllTabProps {
  stockCode: string;
}

const AllTab = ({ stockCode }: IAllTabProps) => {
  const { t } = useTranslation('stock');
  const ref = useRef(null);
  const [watchingInvesting, setWatchingInvesting] = useState<IResponseWatchingInvesting>();

  const requestGetWatchingInvesting = useStockWatchingInvesting(stockCode, {
    onSuccess: ({ data }: IResponseWatchingInvesting) => {
      setWatchingInvesting((prev) => ({
        data: {
          hasNext: data.hasNext,
          last: data.last,
          list: [...(prev?.data.list || []), ...data.list],
        },
      }));
    },
  });

  useBottomScroll(ref, () => {
    if (watchingInvesting?.data.hasNext && !requestGetWatchingInvesting.loading) {
      requestGetWatchingInvesting.run(watchingInvesting.data.last);
    }
  });

  useEffect(() => {
    requestGetWatchingInvesting.run();
  }, []);

  return (
    <>
      <div
        ref={ref}
        className={classNames(
          'mt-[20px] grid grid-cols-1 gap-x-[24px] gap-y-[16px] tablet:grid-cols-2 tablet:gap-y-[20px]',
          {
            'tablet:!grid-cols-1': !watchingInvesting?.data.list.length,
          },
        )}
      >
        {watchingInvesting?.data.list.map((item, index) => (
          <SubscriberItem data={item} key={index} />
        ))}

        {watchingInvesting?.data.hasNext && requestGetWatchingInvesting.loading && (
          <>
            <SkeletonLoading />
            <SkeletonLoading />
          </>
        )}

        {!watchingInvesting?.data.list.length && (
          <EmptyData title={t('no_data_yet')} description={t('no_data_desc')} />
        )}
      </div>
    </>
  );
};

export default AllTab;
