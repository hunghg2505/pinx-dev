import React from 'react';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import TabBar from '@components/common/RCTabBar';

import Assets from '../Assets';
import Follower from '../Follower';
import Following from '../Following';
import LockIcon from '../lock-closed';
import Posts from '../Posts';
import WatchList from '../WatchList';

const Desktop = () => {
  const { t } = useTranslation('profile');
  const searchParams = useSearchParams();
  const { push, query } = useRouter();

  return (
    <div className='px-[16px]'>
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
                  push({ query: { ...query, tab: key } });
                }}
              />
            </>
          );
        }}
        onChange={(key: string) => {
          push({ query: { ...query, tab: key } });
        }}
      >
        <TabPane tab={t('post')} key='post'>
          <div className='px-[16px]'>
            <Posts />
          </div>
        </TabPane>
        <TabPane tab={t('watchlist')} key='watchlist'>
          <div className='px-[16px]'>
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
          <div className='px-[16px]'>
            <Assets />
          </div>
        </TabPane>

        <TabPane tab={t('following')} key='following'>
          <div className='px-[16px]'>
            <Following />
          </div>
        </TabPane>
        <TabPane tab={t('followers')} key='follower'>
          <div className='px-[16px]'>
            <Follower />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Desktop;
