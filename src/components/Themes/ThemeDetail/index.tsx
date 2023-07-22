import React from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Tabs from '@components/UI/Tabs';
import Text from '@components/UI/Text';
import { getAccessToken } from '@store/auth';
import { ROUTE_PATH } from '@utils/common';

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
  const { t } = useTranslation('theme');
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
    //   label: t('tab.community'),
    //   value: TabsThemeDetailEnum.Community,
    // },
    {
      label: t('tab.stock_symbols'),
      value: TabsThemeDetailEnum.StockSymbols,
    },
    {
      label: t('tab.activities'),
      value: TabsThemeDetailEnum.Activities,
    },
    // eslint-disable-next-line array-callback-return
  ].filter((item) => {
    if (!isLogin) {
      return item.label === t('tab.stock_symbols');
    }
    return item;
  });
  const { themeDetail, refresh } = useGetThemeDetail(id, {
    onError: (err: any) => {
      if (err === 'error.theme.notfound') {
        router.push(ROUTE_PATH.NOT_FOUND);
      }
    },
  });
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
  // if (!themeDetail) {
  //
  // }
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
          <Text type='body-20-bold' color='neutral-1' className=''>
            {t('title')}
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
