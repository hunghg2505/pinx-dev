import React, { useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { useStockWatchingInvesting } from '@components/Stock/service';
import { IResponseWatchingInvesting } from '@components/Stock/type';
import Text from '@components/UI/Text';
import useBottomScroll from '@hooks/useBottomScroll';
import { useResponsive } from '@hooks/useResponsive';

import SubscriberItem from '../SubscriberItem';

interface IAllTabProps {
  stockCode: string;
}

const AllTab = ({ stockCode }: IAllTabProps) => {
  const { t } = useTranslation(['stock', 'common']);
  const [watchingInvesting, setWatchingInvesting] = useState<IResponseWatchingInvesting>();
  const { isMobile } = useResponsive();

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

  useBottomScroll(() => {
    if (isMobile && watchingInvesting?.data.hasNext && !requestGetWatchingInvesting.loading) {
      requestGetWatchingInvesting.run(watchingInvesting.data.last);
    }
  });

  useEffect(() => {
    requestGetWatchingInvesting.run();
  }, []);

  const handleViewMore = () => {
    requestGetWatchingInvesting.run(watchingInvesting?.data.last);
  };

  return (
    <>
      <div className='mt-[20px] grid grid-cols-1 gap-x-[24px] gap-y-[16px] tablet:grid-cols-2 tablet:gap-y-[20px]'>
        {watchingInvesting?.data.list.map((item, index) => (
          <SubscriberItem data={item} key={index} />
        ))}
      </div>

      {watchingInvesting?.data.hasNext && (
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

export default AllTab;
