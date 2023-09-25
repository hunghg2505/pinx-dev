import React, { useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import TabBar from '@components/common/RCTabBar';
import { ProfileTabKey } from '@components/MyProfile/TabsContent/Desktop';
import { profileUserContext } from '@components/Profile';
import { ROUTE_PATH } from '@utils/common';
import { ViewAsset } from '@utils/dataLayer';

import Assets from '../Assets';
import Follower from '../Follower';
import Following from '../Following';
import Posts from '../Posts';
import WatchList from '../WatchList';

const Desktop = () => {
  const { t } = useTranslation('profile');
  const [activeTab, setActiveTab] = useState<string>(ProfileTabKey.POSTS);
  const router = useRouter();
  const { tab }: any = router.query;
  const profileUser = useContext<any>(profileUserContext);

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  if (!profileUser?.id) {
    return <></>;
  }

  return (
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
                const newPath = ROUTE_PATH.PROFILE_DETAIL(profileUser?.id);

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

                if (key === ProfileTabKey.ASSETS) {
                  // tracking event view assets
                  ViewAsset('Tab assets user detail', 'Asset Overview');
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
        <Assets />
      </TabPane>

      <TabPane tab={t('following')} key={ProfileTabKey.FOLLOWING}>
        <Following key={profileUser?.totalFollowing} />
      </TabPane>
      <TabPane tab={t('followers')} key={ProfileTabKey.FOLLOWERS}>
        <Follower key={profileUser?.totalFollower} />
      </TabPane>
    </Tabs>
  );
};
export default Desktop;
