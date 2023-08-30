import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import TabBar from '@components/common/RCTabBar';
import { ROUTE_PATH } from '@utils/common';

import Assets from '../Assets';
import { ProfileTabKey } from '../Desktop';
import Posts from '../Posts';
import WatchList from '../WatchList';

const Mobile = () => {
  const { t } = useTranslation('profile');
  const router = useRouter();
  const { tab }: any = router.query;
  const [activeTab, setActiveTab] = useState<string>(ProfileTabKey.POSTS);

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

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
                  window.history.replaceState('', '', ROUTE_PATH.MY_PROFILE);
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
