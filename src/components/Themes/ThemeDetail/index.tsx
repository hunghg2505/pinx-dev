import React, { useRef } from 'react';

import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import PopupSubsribeTheme from '@components/UI/Popup/PopupSubscribeTheme';
import Tabs from '@components/UI/Tabs';
import Text from '@components/UI/Text';
import { getAccessToken } from '@store/auth';
import { popupStatusAtom } from '@store/popup/popup';
import { ROUTE_PATH } from '@utils/common';

// import Community from './Community';
import Activities from './Activities';
import StockSymbols from './StockSymbols';
import { TabsThemeDetailEnum, useGetThemeDetail } from '../service';

const LandingPageDetailThemes = dynamic(() => import('./LandingPage'), {
  ssr: false,
});

const ThemeDetail = () => {
  const { t } = useTranslation('theme');
  const router = useRouter();
  const isLogin = !!getAccessToken();
  const refTheme: any = React.useRef();
  const id = router.query.id || '';
  const [popupStatus] = useAtom(popupStatusAtom);
  const refActivities: any = useRef(null);

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
      return item.label !== t('tab.community');
    }
    return item;
  });
  const { themeDetail, refresh } = useGetThemeDetail(id, {
    onError: (err: any) => {
      if (err.errorCode === 'error.theme.notfound') {
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
        return <Activities data={themeDetail} ref={refActivities} />;
      }
      default: {
        break;
      }
    }
  };
  // if (!themeDetail) {
  //
  // }

  const onRefreshActivities = () => {
    refActivities.current && refActivities.current.onRefreshActivities();
  };

  return (
    <>
      {popupStatus.popupSubsribeTheme && (
        <PopupSubsribeTheme
          visible={popupStatus.popupSubsribeTheme}
          onRefreshActivities={onRefreshActivities}
        />
      )}
      <div className='mb-10 rounded-[10px] bg-white px-[10px] pt-[24px] desktop:px-[24px] desktop:py-[20px]'>
        <div className='relative h-[20px]'>
          <img
            src='/static/icons/back_icon.svg'
            alt=''
            className='absolute left-0 top-1/2 w-[28px] -translate-y-1/2 cursor-pointer'
            onClick={onGoBack}
          />
          <Text
            type='body-20-bold'
            color='neutral-1'
            className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
          >
            {t('title')}
          </Text>
        </div>
        <div className='my-[20px] block h-[2px] bg-[#EEF5F9] tablet:w-[calc(100%+48px)] tablet:-translate-x-[24px]'></div>
        <LandingPageDetailThemes data={themeDetail} refresh={refresh} />
        <div className='desktop:hidden'>
          {/* {isLogin && <Community payload={themeDetail} />} */}
          <StockSymbols data={themeDetail} />
          <Activities data={themeDetail} ref={refActivities} />
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
