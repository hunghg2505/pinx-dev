import React, { useContext, useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import TabBar from '@components/common/RCTabBar';
import { profileUserContext } from '@components/MyProfile';
import { ProfileTabKey } from '@components/MyProfile/TabsContent/Desktop/type';
import { stockSocketAtom, StockSocketLocation } from '@store/stockStocket';
import { PROFILE_V2 } from 'src/constant/route';
import { viewAssetTracking, viewWatchListTracking } from 'src/mixpanel/mixpanel';

import Assets from '../Assets';
import Follower from '../Follower';
import Following from '../Following';
import Posts from '../Posts';
import WatchList from '../WatchList';

const Desktop = () => {
  const watchList = useAtomValue(stockSocketAtom);
  const { t } = useTranslation('profile');
  const router = useRouter();
  const { tab }: any = router.query;
  const profileUser = useContext<any>(profileUserContext);
  const [activeTab, setActiveTab] = useState<string>(ProfileTabKey.POSTS);

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab, router]);

  return (
    <Tabs
      className='tabHome'
      activeKey={activeTab}
      renderTabBar={(props: any) => {
        return (
          <>
            <TabBar
              list={props?.panes}
              activeKey={props?.activeKey}
              onChange={(key: string) => {
                setActiveTab(key);
                const newPath = PROFILE_V2(profileUser?.displayName, profileUser?.id);

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

                if (key === ProfileTabKey.FOLLOWING) {
                  profileUser.setState((prev: any) => ({ ...prev, followingKey: Date.now() }));
                }
                if (key === ProfileTabKey.FOLLOWERS) {
                  profileUser.setState((prev: any) => ({ ...prev, followerKey: Date.now() }));
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
        <WatchList />
      </TabPane>
      <TabPane
        tab={<div className='flex justify-center'>{t('assets')}</div>}
        key={ProfileTabKey.ASSETS}
      >
        <div className='tablet:px-0 '>
          <Assets />
        </div>
      </TabPane>

      <TabPane tab={t('following')} key={ProfileTabKey.FOLLOWING}>
        <Following totalFollowing={profileUser.totalFollowing} key={profileUser.followingKey} />
      </TabPane>
      <TabPane tab={t('followers')} key={ProfileTabKey.FOLLOWERS}>
        <Follower totalFollower={profileUser?.totalFollower} key={profileUser.followerKey} />
      </TabPane>
    </Tabs>
  );
};
export default Desktop;
