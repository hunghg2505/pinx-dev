import React from 'react';

import SubscriberItem from '../SubscriberItem';

const InvestingTab = () => {
  return (
    <div className='mb-[32px] mt-[20px] grid grid-cols-1 gap-x-[24px] gap-y-[16px] tablet:mt-0 tablet:grid-cols-2 tablet:gap-y-[20px]'>
      <SubscriberItem />
      <SubscriberItem />
      <SubscriberItem />
      <SubscriberItem />
      <SubscriberItem />
      <SubscriberItem />
      <SubscriberItem />
      <SubscriberItem />
      <SubscriberItem />
      <SubscriberItem />
    </div>
  );
};

export default InvestingTab;
