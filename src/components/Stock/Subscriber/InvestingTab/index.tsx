import React, { useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { useStockInvesting } from '@components/Stock/service';
import { IResponseWatchingInvesting } from '@components/Stock/type';
import Text from '@components/UI/Text';
import useBottomScroll from '@hooks/useBottomScroll';
import { useResponsive } from '@hooks/useResponsive';

import SubscriberItem from '../SubscriberItem';

interface IInvestingTabProps {
  stockCode: string;
}

const InvestingTab = ({ stockCode }: IInvestingTabProps) => {
  const { t } = useTranslation(['stock', 'common']);
  const [stockInvesting, setStockInvesting] = useState<IResponseWatchingInvesting>();
  const { isMobile } = useResponsive();

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

  useBottomScroll(() => {
    if (isMobile && stockInvesting?.data.hasNext && !requestGetStockInvesting.loading) {
      requestGetStockInvesting.run(stockInvesting.data.last);
    }
  });

  useEffect(() => {
    requestGetStockInvesting.run();
  }, []);

  const handleViewMore = () => {
    requestGetStockInvesting.run(stockInvesting?.data.last);
  };

  return (
    <>
      <div className='mb-[32px] mt-[20px] grid grid-cols-1 gap-x-[24px] gap-y-[16px] tablet:grid-cols-2 tablet:gap-y-[20px]'>
        {stockInvesting?.data.list.map((item, index) => (
          <SubscriberItem data={item} key={index} />
        ))}
      </div>

      {stockInvesting?.data.hasNext && !isMobile && (
        <Text
          type='body-14-semibold'
          className='mb-[32px] mt-[24px] cursor-pointer'
          color='primary-2'
          onClick={handleViewMore}
        >
          {t('show_more')}
        </Text>
      )}
    </>
  );
};

export default InvestingTab;
