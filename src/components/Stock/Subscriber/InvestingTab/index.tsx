import React, { useEffect, useRef, useState } from 'react';

import { useStockInvesting } from '@components/Stock/service';
import { IResponseWatchingInvesting } from '@components/Stock/type';
import useBottomScroll from '@hooks/useBottomScroll';

import SkeletonLoading from '../SkeletonLoading';
import SubscriberItem from '../SubscriberItem';

interface IInvestingTabProps {
  stockCode: string;
}

const InvestingTab = ({ stockCode }: IInvestingTabProps) => {
  const [stockInvesting, setStockInvesting] = useState<IResponseWatchingInvesting>();
  const ref = useRef(null);

  const requestGetStockInvesting = useStockInvesting(stockCode, {
    onSuccess: ({ data }: IResponseWatchingInvesting) => {
      setStockInvesting((prev) => ({
        data: {
          hasNext: data.hasNext,
          last: data.last,
          list: [...(prev?.data.list || []), ...data.list],
        },
      }));
    },
  });

  useBottomScroll(ref, () => {
    if (stockInvesting?.data.hasNext && !requestGetStockInvesting.loading) {
      requestGetStockInvesting.run(stockInvesting.data.last);
    }
  });

  useEffect(() => {
    requestGetStockInvesting.run();
  }, []);

  return (
    <>
      <div
        ref={ref}
        className='mt-[20px] grid grid-cols-1 gap-x-[24px] gap-y-[16px] tablet:grid-cols-2 tablet:gap-y-[20px]'
      >
        {stockInvesting?.data.list.map((item, index) => (
          <SubscriberItem data={item} key={index} />
        ))}

        {stockInvesting?.data.hasNext && requestGetStockInvesting.loading && (
          <>
            <SkeletonLoading />
            <SkeletonLoading />
          </>
        )}
      </div>
    </>
  );
};

export default InvestingTab;
