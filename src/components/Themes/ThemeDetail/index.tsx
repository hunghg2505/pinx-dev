import React from 'react';

import { useRouter } from 'next/router';

import Tabs from '@components/UI/Tabs';
import Text from '@components/UI/Text';

import Activities from './Activities';
import Community from './Community';
import LandingPageDetailThemes from './LandingPage';
import StockSymbols from './StockSymbols';
import { TabsThemeDetailEnum, useGetThemeDetail } from '../service';

export const optionTab = [
  {
    label: 'Community',
    value: TabsThemeDetailEnum.Community,
  },
  {
    label: 'Stock symbols',
    value: TabsThemeDetailEnum.StockSymbols,
  },
  {
    label: 'Activities',
    value: TabsThemeDetailEnum.Activities,
  },
];
const ThemeDetail = () => {
  const router = useRouter();
  const id = router.query.id || '';
  const [selectTab, setSelectTab] = React.useState<TabsThemeDetailEnum>(
    TabsThemeDetailEnum.Community,
  );
  const onChangeTab = (value: TabsThemeDetailEnum) => {
    setSelectTab(value);
  };
  const onGoBack = () => {
    router.back();
  };
  const { themeDetail, refresh } = useGetThemeDetail(id);
  const renderContentTab = () => {
    switch (selectTab) {
      case TabsThemeDetailEnum.Community: {
        return <Community payload={themeDetail} />;
      }
      case TabsThemeDetailEnum.StockSymbols: {
        return <StockSymbols data={themeDetail} />;
      }
      case TabsThemeDetailEnum.Activities: {
        return <Activities data={themeDetail} />;
      }
      default: {
        break;
      }
    }
  };
  return (
    <>
      <div className='desktop:px-[24px] desktop:py-[20px]'>
        <div className='relative text-center'>
          <img
            src='/static/icons/back_icon.svg'
            alt=''
            className='absolute left-0 top-0 mb-[16px] w-[28px] cursor-pointer'
            onClick={onGoBack}
          />
          <Text type='body-24-semibold' color='neutral-1' className=''>
            Themes details
          </Text>
        </div>
        <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
        <LandingPageDetailThemes data={themeDetail} refresh={refresh} />
        <div className='desktop:hidden'>
          <Community payload={themeDetail} />
          <StockSymbols data={themeDetail} />
          <Activities data={themeDetail} />
        </div>
        <div className='mt-[20px] mobile:hidden desktop:block'>
          <Tabs
            onChange={onChangeTab}
            contenTab={optionTab}
            defaultTab={TabsThemeDetailEnum.Community}
            currentTab={selectTab}
          />
          {renderContentTab()}
        </div>
      </div>
    </>
  );
};
export default ThemeDetail;
