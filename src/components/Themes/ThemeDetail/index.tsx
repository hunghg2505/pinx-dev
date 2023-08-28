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
import Community from './Community';
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
  const refCommunity: any = useRef(null);
  const refActivities: any = useRef(null);
  const [selectTab, setSelectTab] = React.useState<TabsThemeDetailEnum>(
    TabsThemeDetailEnum.Community,
  );
  const onChangeTab = (value: TabsThemeDetailEnum) => {
    setSelectTab(value);
  };
  const onGoBack = () => {
    router.back();
  };
  React.useEffect(() => {
    if (!isLogin) {
      refTheme?.current && refTheme?.current?.setActiveTab(TabsThemeDetailEnum.Community);
      setSelectTab(TabsThemeDetailEnum.Community);
    }
  }, [isLogin]);
  const optionTab = [
    {
      label: t('tab.community'),
      value: TabsThemeDetailEnum.Community,
    },
    {
      label: t('tab.stock_symbols'),
      value: TabsThemeDetailEnum.StockSymbols,
    },
    {
      label: t('tab.activities'),
      value: TabsThemeDetailEnum.Activities,
    },
    // eslint-disable-next-line array-callback-return
  ];
  const { themeDetail, refresh } = useGetThemeDetail(id, {
    onError: (err: any) => {
      if (err.errorCode === 'error.theme.notfound') {
        router.push(ROUTE_PATH.NOT_FOUND);
      }
    },
  });
  const renderContentTab = () => {
    switch (selectTab) {
      case TabsThemeDetailEnum.Community: {
        return <Community payload={themeDetail} ref={refCommunity} />;
      }
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
  const onRefreshCommunity = () => {
    if (themeDetail?.isSubsribed) {
      refCommunity?.current && refCommunity?.current.removeItem();
    } else {
      refCommunity?.current && refCommunity?.current.addItem();
    }
    refresh();
  };
  return (
    <>
      {popupStatus.popupSubsribeTheme && (
        <PopupSubsribeTheme
          visible={popupStatus.popupSubsribeTheme}
          onRefreshActivities={onRefreshActivities}
        />
      )}
      <div className='box-shadow card-style mb-10 rounded-[8px] bg-[#FFF] p-[10px] tablet:mt-[24px] tablet:p-[16px] desktop:mt-0'>
        <div className='relative mb-[16px] mt-[12px] flex h-[40px] items-center justify-center tablet:mt-0'>
          <img
            src='/static/icons/back_icon.svg'
            alt=''
            className='absolute left-0 top-1/2 w-[28px] -translate-y-1/2 cursor-pointer'
            onClick={onGoBack}
          />
          <Text type='body-20-bold' color='neutral-1' className=''>
            {t('title')}
          </Text>
        </div>

        <LandingPageDetailThemes data={themeDetail} refresh={onRefreshCommunity} />
        <div className='desktop:hidden'>
          <Community payload={themeDetail} ref={refCommunity} />
          <StockSymbols data={themeDetail} />
          <Activities data={themeDetail} ref={refActivities} />
        </div>
        <div className='mt-[20px] mobile:hidden desktop:block'>
          <Tabs
            onChange={onChangeTab}
            contenTab={optionTab}
            defaultTab={TabsThemeDetailEnum.Activities}
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
