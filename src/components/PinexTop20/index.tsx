import React from 'react';

import { useRouter } from 'next/router';

import Tabs, { TabsEnum } from '@components/UI/Tabs';
import Text from '@components/UI/Text';

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
  const onGoBack = () => {
    router.back();
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
    <div className='rounded-[8px] bg-[#FFF] px-[24px] py-[20px] tablet-max:px-[0]'>
      <div className='relative text-center'>
        <img
          src='/static/icons/back_icon.svg'
          alt=''
          className='absolute left-0 top-0 w-[28px] cursor-pointer'
          onClick={onGoBack}
        />
        <Text type='body-20-semibold' color='neutral-1' className='mobile:hidden tablet:block'>
          PineX top 20
        </Text>
      </div>
      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9] mobile:hidden tablet:block tablet:w-[calc(100%+48px)] tablet:-translate-x-[24px]'></div>
      <div className='mobile:mt-[45px] tablet:mt-0'>
        <Tabs
          onChange={onChangeTab}
          contenTab={optionTab}
          defaultTab={TabsEnum.Profit}
          currentTab={selectTab}
        />
        <div className='mt-[28px]'>{renderContentTab()}</div>
      </div>
    </div>
  );
};
export default PinexTop20;
