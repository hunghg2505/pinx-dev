import React, { useState } from 'react';

import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import TabBar from '@components/common/RCTabBar';

import Assets from './Assets';
import LockIcon from './lock-closed';

const RightBar = () => {
  const { t } = useTranslation('profile');
  const [state, setState] = useState({ tab: 'assets' });

  return (
    <div className='px-[16px]'>
      <Tabs
        defaultActiveKey='1'
        activeKey={state.tab}
        className='tabHome'
        renderTabBar={(props: any) => {
          return (
            <>
              <TabBar
                list={props?.panes}
                activeKey={props?.activeKey}
                onChange={(key: string) => {
                  setState((prev) => ({ ...prev, tab: key }));
                }}
              />
            </>
          );
        }}
        onChange={(key: string) => {
          setState((prev) => ({ ...prev, tab: key }));
        }}
      >
        <TabPane tab={t('post')} key='post'>
          <h1>hello post</h1>
        </TabPane>
        <TabPane tab={t('watchlist')} key='watchlist'>
          <h1>hello watchlist</h1>
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
      </Tabs>
    </div>
  );
};
export default RightBar;
