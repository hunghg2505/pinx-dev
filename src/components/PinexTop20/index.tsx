import React from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Tabs, { TabsEnum } from '@components/UI/Tabs';
import Text from '@components/UI/Text';
import { ViewTickerInfo } from '@utils/dataLayer';

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

// tracking event view ticker info
const handleTrackingViewTickerInfo = (stockCode: string, location: string) => {
  ViewTickerInfo(stockCode, 'Pinex top 20 screen', location, 'Stock');
};

const PinexTop20 = () => {
  const [isClient, setIsClient] = React.useState(false);
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

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const renderContentTab = () => {
    switch (selectTab) {
      case TabsEnum.Profit: {
        return <Profit onTrackingViewTickerInfo={handleTrackingViewTickerInfo} />;
      }
      case TabsEnum.Revenue: {
        return <Revenue onTrackingViewTickerInfo={handleTrackingViewTickerInfo} />;
      }
      case TabsEnum.MarketCapitalization: {
        return <MarketCap onTrackingViewTickerInfo={handleTrackingViewTickerInfo} />;
      }
      case TabsEnum.ChangeInPrice1Y: {
        return <ChangeInPrice onTrackingViewTickerInfo={handleTrackingViewTickerInfo} />;
      }
      case TabsEnum.Price: {
        return <Price onTrackingViewTickerInfo={handleTrackingViewTickerInfo} />;
      }
      default: {
        break;
      }
    }
  };
  return (
    <div className='box-shadow card-style mb-10 rounded-[8px] bg-[#FFF] p-[10px] tablet:mt-[24px] tablet:p-[16px] desktop:mt-0'>
      <div className='relative h-[40px] tablet:mb-[16px]'>
        <img
          src='/static/icons/back_icon.svg'
          alt=''
          className='absolute top-1/2 w-[28px] -translate-y-1/2 cursor-pointer'
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

      <div>
        {isClient && (
          <Tabs
            onChange={onChangeTab}
            contenTab={optionTab.map((item) => ({ ...item, label: t(item.label) }))}
            defaultTab={TabsEnum.Profit}
            currentTab={selectTab}
          />
        )}
        <div className='mt-[28px]'>{renderContentTab()}</div>
      </div>
    </div>
  );
};
export default PinexTop20;
