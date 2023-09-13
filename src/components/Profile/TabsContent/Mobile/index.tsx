import React from 'react';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import TabBar from '@components/common/RCTabBar';
import { ViewAsset } from '@utils/dataLayer';

import Assets from '../Assets';
import Posts from '../Posts';
import WatchList from '../WatchList';

const Mobile = () => {
  const { t } = useTranslation('profile');
  const searchParams = useSearchParams();
  const { replace, query } = useRouter();
  return (
    <div id={'tabbar'}>
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

                  replace({ hash: '#tabbar', query: { ...query, tab: key } });
                }}
              />
            </>
          );
        }}
        onChange={(key: string) => {
          replace({ query: { ...query, tab: key } });
        }}
      >
        <TabPane tab={t('posts')} key='post' className='px-16px]'>
          <Posts />
        </TabPane>
        <TabPane tab={t('watchlist')} key='watchlist' className='px-16px]'>
          <WatchList />
        </TabPane>
        <TabPane tab={<div className='flex justify-center'>{t('assets')}</div>} key='assets'>
          <div className='tablet:pb-0'>
            <Assets />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Mobile;
