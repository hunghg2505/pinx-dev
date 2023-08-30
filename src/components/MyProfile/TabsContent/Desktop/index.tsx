import React, { useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import TabBar from '@components/common/RCTabBar';
import { profileUserContext } from '@components/MyProfile';
import { ROUTE_PATH } from '@utils/common';

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
  const { t } = useTranslation('profile');
  const router = useRouter();
  const { tab }: any = router.query;
  const profileUser = useContext<any>(profileUserContext);
  const [activeTab, setActiveTab] = useState<string>(ProfileTabKey.POSTS);

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

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
                tab && window.history.replaceState('', '', ROUTE_PATH.MY_PROFILE);
                if (key === 'following') {
                  profileUser.setState((prev: any) => ({ ...prev, followingKey: Date.now() }));
                }
                if (key === 'followers') {
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
