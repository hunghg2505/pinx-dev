import React, { useContext } from 'react';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import TabBar from '@components/common/RCTabBar';
import { profileUserContext } from '@components/Profile';
import { ViewAsset } from '@utils/dataLayer';

import Assets from '../Assets';
import Follower from '../Follower';
import Following from '../Following';
import Posts from '../Posts';
import WatchList from '../WatchList';

const Desktop = () => {
  const { t } = useTranslation('profile');
  const searchParams = useSearchParams();
  const { replace, query } = useRouter();
  const profileUser = useContext<any>(profileUserContext);

  if (!profileUser?.id) {
    return <></>;
  }

  return (
    <Tabs
      defaultActiveKey='1'
      activeKey={searchParams.get('tab') || 'post'}
      className='tabHome'
      renderTabBar={(props: any) => {
        return (
          <>
            <TabBar
              list={props?.panes}
              activeKey={props?.activeKey}
              onChange={(key: string) => {
                if (key === 'assets') {
                  // tracking event view assets
                  ViewAsset('Tab assets user detail', 'Asset Overview');
                }

                replace({ query: { id: query.id, tab: key } });
              }}
            />
          </>
        );
      }}
      onChange={(key: string) => {
        replace({ query: { ...query, tab: key } });
      }}
    >
      <TabPane tab={t('posts')} key='post'>
        <Posts />
      </TabPane>
      <TabPane tab={t('watchlist')} key='watchlist'>
        <WatchList />
      </TabPane>
      <TabPane tab={<div className='flex justify-center'>{t('assets')}</div>} key='assets'>
        <Assets />
      </TabPane>

      <TabPane tab={t('following')} key='following'>
        <Following key={profileUser?.totalFollowing} />
      </TabPane>
      <TabPane tab={t('followers')} key='followers'>
        <Follower key={profileUser?.totalFollower} />
      </TabPane>
    </Tabs>
  );
};
export default Desktop;
