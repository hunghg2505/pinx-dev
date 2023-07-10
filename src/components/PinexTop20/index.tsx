import React from 'react';

import { useRouter } from 'next/router';

import Tabs, { TabsEnum } from '@components/UI/Tabs';

import ChangeInPrice from './ChangeInPrice';
import MarketCap from './MarketCap';
import Price from './Price';
import Profit from './Profit';
import Revenue from './Revenue';

export const optionTab = [
  {
    label: 'Profit',
    value: TabsEnum.Profit,
  },
  {
    label: 'Revenue',
    value: TabsEnum.Revenue,
  },
  {
    label: 'Market Capitalization',
    value: TabsEnum.MarketCapitalization,
  },
  {
    label: 'Price',
    value: TabsEnum.Price,
  },
  {
    label: 'Change In Price 1Y',
    value: TabsEnum.ChangeInPrice1Y,
  },
];
const PinexTop20 = () => {
  const router = useRouter();
  const type: any = router?.query?.type;
  const [selectTab, setSelectTab] = React.useState<TabsEnum>(type || TabsEnum.Profit);
  const onChangeTab = (value: TabsEnum) => {
    setSelectTab(value);
  };

  const renderContentTab = () => {
    switch (selectTab) {
      case TabsEnum.Profit: {
        return <Profit />;
      }
      case TabsEnum.Revenue: {
        return <Revenue />;
      }
      case TabsEnum.MarketCapitalization: {
        return <MarketCap />;
      }
      case TabsEnum.ChangeInPrice1Y: {
        return <ChangeInPrice />;
      }
      case TabsEnum.Price: {
        return <Price />;
      }
      default: {
        break;
      }
    }
  };
  return (
    <div className='mobile-max:ml-[16px]'>
      <Tabs
        onChange={onChangeTab}
        contenTab={optionTab}
        defaultTab={TabsEnum.Profit}
        currentTab={selectTab}
      />
      <div className='mt-[28px]'>{renderContentTab()}</div>
    </div>
  );
};
export default PinexTop20;
