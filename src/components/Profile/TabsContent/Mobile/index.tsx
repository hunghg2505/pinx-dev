import React from 'react';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import TabBar from '@components/common/RCTabBar';

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
          <div className='mt-[-21px]  px-[16px] tablet:px-0'>
            <Posts />
          </div>
        </TabPane>
        <TabPane tab={t('watchlist')} key='watchlist' className='px-16px]'>
          <div className='px-[16px] tablet:px-0'>
            <WatchList />
          </div>
        </TabPane>
        <TabPane
          className='px-16px]'
          tab={<div className='flex justify-center'>{t('Assets')}</div>}
          key='assets'
        >
          <div className='tablet:px-0 tablet:pb-0'>
            <Assets />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Mobile;
