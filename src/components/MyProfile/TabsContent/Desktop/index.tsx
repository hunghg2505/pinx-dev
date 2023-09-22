import React, { useContext, useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import TabBar from '@components/common/RCTabBar';
import { profileUserContext } from '@components/MyProfile';
import { stockSocketAtom, StockSocketLocation } from '@store/stockStocket';
import { ROUTE_PATH } from '@utils/common';
import { ViewAsset, ViewWatchlist } from '@utils/dataLayer';

import Assets from '../Assets';
import Follower from '../Follower';
import Following from '../Following';
import Posts from '../Posts';
import WatchList from '../WatchList';

export enum ProfileTabKey {
  POSTS = 'POSTS',
  WATCH_LIST = 'WATCH_LIST',
  ASSETS = 'ASSETS',
  FOLLOWING = 'FOLLOWING',
  FOLLOWERS = 'FOLLOWERS',
}

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
                const newPath = ROUTE_PATH.MY_PROFILE;

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

                  ViewWatchlist(
                    'Default',
                    'Normal WL',
                    listStockCodes,
                    listStockCodes?.length,
                    'Profile screen',
                  );
                }

                if (key === ProfileTabKey.ASSETS) {
                  // tracking event view assets
                  ViewAsset('Tab assets my profile', 'Asset Overview');
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
