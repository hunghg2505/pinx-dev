import React, { useContext } from 'react';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import TabBar from '@components/common/RCTabBar';
import { profileUserContext } from '@components/Profile';

import Assets from '../Assets';
import Follower from '../Follower';
import Following from '../Following';
import LockIcon from '../lock-closed';
import Posts from '../Posts';
import WatchList from '../WatchList';

const Desktop = () => {
  const { t } = useTranslation('profile');
  const searchParams = useSearchParams();
  const { replace, query } = useRouter();
  const profileUser = useContext<any>(profileUserContext);

  return (
    <div className='px-[16px] tablet:px-0'>
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
                  replace({ query: { ...query, tab: key } });
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
          <div className='px-[16px] tablet:px-0'>
            <Posts />
          </div>
        </TabPane>
        <TabPane tab={t('watchlist')} key='watchlist'>
          <div className='px-[16px] tablet:px-0'>
            <WatchList />
          </div>
        </TabPane>
        <TabPane
          tab={
            <div className='flex justify-center'>
              <LockIcon />
              {t('Assets')}
            </div>
          }
          key='assets'
        >
          <Assets />
        </TabPane>

        <TabPane tab={t('following')} key='following'>
          <div className='px-[16px] tablet:px-0'>
            <Following key={profileUser?.totalFollowing} />
          </div>
        </TabPane>
        <TabPane tab={t('followers')} key='followers'>
          <div className='px-[16px] tablet:px-0'>
            <Follower key={profileUser?.totalFollower} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Desktop;
