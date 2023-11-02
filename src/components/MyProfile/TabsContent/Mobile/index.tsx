import React, { useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import TabBar from '@components/common/RCTabBar';
import { ProfileTabKey } from '@components/MyProfile/TabsContent/Desktop/type';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { StockSocketLocation, stockSocketAtom } from '@store/stockStocket';
import { PROFILE_V2 } from 'src/constant/route';
import { viewAssetTracking, viewWatchListTracking } from 'src/mixpanel/mixpanel';

import Assets from '../Assets';
import Posts from '../Posts';
import WatchList from '../WatchList';

const Mobile = () => {
  const watchList = useAtomValue(stockSocketAtom);
  const { t } = useTranslation('profile');
  const router = useRouter();
  const { tab }: any = router.query;
  const [activeTab, setActiveTab] = useState<string>(ProfileTabKey.POSTS);
  const { userLoginInfo } = useUserLoginInfo();

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab, router]);

  return (
    <div id={'tabbar'}>
      <Tabs
        activeKey={activeTab}
        className='tabHome'
        renderTabBar={(props: any) => {
          return (
            <>
              <TabBar
                list={props?.panes}
                activeKey={props?.activeKey}
                onChange={(key: string) => {
                  setActiveTab(key);
                  const newPath = PROFILE_V2(userLoginInfo?.displayName, userLoginInfo?.id);

                  let currentLocale = window.history.state?.options?.locale;
                  currentLocale = currentLocale === 'en' ? '/en' : '';

                  window.history.replaceState(
                    {
                      ...window.history.state,
                      as: newPath,
                      url: currentLocale + newPath,
                    },
                    '',
                    currentLocale + newPath,
                  );

                  // tracking
                  if (key === ProfileTabKey.WATCH_LIST) {
                    const listStockCodes =
                      watchList.find(
                        (item) => item.location === StockSocketLocation.WATCH_LIST_COMPONENT_LAYOUT,
                      )?.stocks || [];

                    viewWatchListTracking(
                      'Personal Watchlist',
                      'Personal Watchlist',
                      listStockCodes,
                      listStockCodes?.length,
                      'Profile screen',
                    );
                  }

                  if (key === ProfileTabKey.ASSETS) {
                    // tracking event view assets
                    viewAssetTracking('Tab assets my profile', 'Asset Overview');
                  }
                }}
              />
            </>
          );
        }}
      >
        <TabPane tab={t('posts')} key={ProfileTabKey.POSTS}>
          <Posts />
        </TabPane>
        <TabPane tab={t('watchlist')} key={ProfileTabKey.WATCH_LIST}>
          <div>
            <WatchList />
          </div>
        </TabPane>
        <TabPane
          tab={<div className='flex justify-center'>{t('assets')}</div>}
          key={ProfileTabKey.ASSETS}
        >
          <div className='pb-[50px] tablet:pb-0'>
            <Assets />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Mobile;
