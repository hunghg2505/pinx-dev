import React, { useState } from 'react';

import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import Assets from './Assets';

const RightBar = () => {
  const { t } = useTranslation('profile');
  const [state, setState] = useState({ tab: 'assets' });

  return (
    <div className='px-[16px]'>
      <Tabs
        defaultActiveKey='1'
        activeKey={state.tab}
        className='tabHome'
        onChange={(key: string) => {
          setState((prev) => ({ ...prev, tab: key }));
        }}
      >
        <TabPane tab={t('post')} key='post' prefixCls='flex-auto '>
          <h1>hello post</h1>
        </TabPane>
        <TabPane tab={t('watchlist')} key='watchlist' prefixCls='flex-auto '></TabPane>
        <TabPane tab={t('Assets')} key='assets' prefixCls='flex-auto '>
          <Assets />
        </TabPane>
        {/* <TabPane tab='Watchlist' key='1'>
          <WatchList />
        </TabPane> */}
      </Tabs>
    </div>
  );
};
export default RightBar;
