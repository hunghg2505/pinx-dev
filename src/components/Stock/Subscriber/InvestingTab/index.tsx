import React from 'react';

import { useStockInvesting } from '@components/Stock/service';

import SubscriberItem from '../SubscriberItem';

interface IInvestingTabProps {
  stockCode: string;
}

const InvestingTab = ({ stockCode }: IInvestingTabProps) => {
  const { stockInvesting } = useStockInvesting(stockCode);

  return (
    <div className='mb-[32px] mt-[20px] grid grid-cols-1 gap-x-[24px] gap-y-[16px] tablet:grid-cols-2 tablet:gap-y-[20px]'>
      {stockInvesting?.data.list.map((item, index) => (
        <SubscriberItem data={item} key={index} />
      ))}
    </div>
  );
};

export default InvestingTab;
