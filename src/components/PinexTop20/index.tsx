import React from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Tabs, { TabsEnum } from '@components/UI/Tabs';
import Text from '@components/UI/Text';

import ChangeInPrice from './ChangeInPrice';
import MarketCap from './MarketCap';
import Price from './Price';
import Profit from './Profit';
import Revenue from './Revenue';

export const optionTab = [
  {
    label: 'top_20_tab.profit',
    value: TabsEnum.Profit,
  },
  {
    label: 'top_20_tab.revenue',
    value: TabsEnum.Revenue,
  },
  {
    label: 'top_20_tab.market_capitalization',
    value: TabsEnum.MarketCapitalization,
  },
  {
    label: 'top_20_tab.price',
    value: TabsEnum.Price,
  },
  {
    label: 'top_20_tab.change_in_price_1y',
    value: TabsEnum.ChangeInPrice1Y,
  },
];

const PinexTop20 = () => {
  const { t } = useTranslation(['explore', 'theme']);
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
    <div className='mb-10 rounded-[8px] bg-[#FFF] mobile:px-[10px] mobile:py-[10px] tablet:px-0 tablet:py-[16px]'>
      <div className='text-center] relative tablet:py-[14px]'>
        <img
          src='/static/icons/back_icon.svg'
          alt=''
          className='absolute top-0 w-[28px] cursor-pointer mobile:left-0 tablet:left-[16px] tablet:top-1/2 tablet:-translate-y-1/2'
          onClick={onGoBack}
        />
        <Text
          type='body-20-semibold'
          color='neutral-1'
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mobile:hidden tablet:block'
        >
          {t('theme:pinex_top_20')}
        </Text>
      </div>

      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9] mobile:hidden tablet:block'></div>

      <div className='mobile:mt-[45px] tablet:mt-0 tablet:px-[16px]'>
        <Tabs
          onChange={onChangeTab}
          contenTab={optionTab.map((item) => ({ ...item, label: t(item.label) }))}
          defaultTab={TabsEnum.Profit}
          currentTab={selectTab}
        />
        <div className='mt-[28px]'>{renderContentTab()}</div>
      </div>
    </div>
  );
};
export default PinexTop20;
