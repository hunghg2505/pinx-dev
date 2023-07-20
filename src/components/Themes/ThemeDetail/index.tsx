import React from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Tabs from '@components/UI/Tabs';
import Text from '@components/UI/Text';
import { getAccessToken } from '@store/auth';

// import Community from './Community';
import StockSymbols from './StockSymbols';
import { TabsThemeDetailEnum, useGetThemeDetail } from '../service';

const LandingPageDetailThemes = dynamic(() => import('./LandingPage'), {
  ssr: false,
});
const Activities = dynamic(() => import('./Activities'), {
  ssr: false,
});
const ThemeDetail = () => {
  const router = useRouter();
  const isLogin = !!getAccessToken();
  const refTheme: any = React.useRef();
  const id = router.query.id || '';
  const [selectTab, setSelectTab] = React.useState<TabsThemeDetailEnum>(
    TabsThemeDetailEnum.StockSymbols,
  );
  const onChangeTab = (value: TabsThemeDetailEnum) => {
    setSelectTab(value);
  };
  const onGoBack = () => {
    router.back();
  };
  React.useEffect(() => {
    if (!isLogin) {
      refTheme?.current && refTheme?.current?.setActiveTab(TabsThemeDetailEnum.StockSymbols);
      setSelectTab(TabsThemeDetailEnum.StockSymbols);
    }
  }, [isLogin]);
  const optionTab = [
    // {
    //   label: 'Community',
    //   value: TabsThemeDetailEnum.Community,
    // },
    {
      label: 'Stock symbols',
      value: TabsThemeDetailEnum.StockSymbols,
    },
    {
      label: 'Activities',
      value: TabsThemeDetailEnum.Activities,
    },
    // eslint-disable-next-line array-callback-return
  ].filter((item) => {
    if (!isLogin) {
      return item.label === 'Stock symbols';
    }
    return item;
  });
  const { themeDetail, refresh } = useGetThemeDetail(id);
  const renderContentTab = () => {
    switch (selectTab) {
      // case TabsThemeDetailEnum.Community: {
      //   return isLogin ? <Community payload={themeDetail} /> : <></>;
      // }
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
      <div className='mt-[24px] desktop:px-[24px] desktop:py-[20px] xdesktop:mt-[0]'>
        <div className='relative text-center'>
          <img
            src='/static/icons/back_icon.svg'
            alt=''
            className='absolute left-0 top-0 mb-[16px] w-[28px] cursor-pointer'
            onClick={onGoBack}
          />
          <Text type='body-24-semibold' color='neutral-1' className=''>
            Theme details
          </Text>
        </div>
        <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
        <LandingPageDetailThemes data={themeDetail} refresh={refresh} />
        <div className='desktop:hidden'>
          {/* {isLogin && <Community payload={themeDetail} />} */}
          <StockSymbols data={themeDetail} />
          <Activities data={themeDetail} />
        </div>
        <div className='mt-[20px] mobile:hidden desktop:block'>
          <Tabs
            onChange={onChangeTab}
            contenTab={optionTab}
            defaultTab={TabsThemeDetailEnum.StockSymbols}
            currentTab={selectTab}
            ref={refTheme}
          />
          {renderContentTab()}
        </div>
      </div>
    </>
  );
};
export default ThemeDetail;
