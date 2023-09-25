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
import Posts from '../Posts';
import WatchList from '../WatchList';

const Mobile = () => {
  const { t } = useTranslation('profile');
  const router = useRouter();
  const { tab }: any = router.query;
  const [activeTab, setActiveTab] = useState<string>(ProfileTabKey.POSTS);
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
        <TabPane tab={t('posts')} key={ProfileTabKey.POSTS} className='px-16px]'>
          <Posts />
        </TabPane>
        <TabPane tab={t('watchlist')} key={ProfileTabKey.WATCH_LIST} className='px-16px]'>
          <WatchList />
        </TabPane>
        <TabPane
          tab={<div className='flex justify-center'>{t('assets')}</div>}
          key={ProfileTabKey.ASSETS}
        >
          <div className='tablet:pb-0'>
            <Assets />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Mobile;
