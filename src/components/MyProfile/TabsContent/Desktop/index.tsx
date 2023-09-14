import React, { useContext } from 'react';

import { useAtomValue } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import TabBar from '@components/common/RCTabBar';
import { profileUserContext } from '@components/MyProfile';
import { stockSocketAtom, StockSocketLocation } from '@store/stockStocket';
import { ViewAsset, ViewWatchlist } from '@utils/dataLayer';

import Assets from '../Assets';
import Follower from '../Follower';
import Following from '../Following';
import Posts from '../Posts';
import WatchList from '../WatchList';

const Desktop = () => {
  const watchList = useAtomValue(stockSocketAtom);
  const { t } = useTranslation('profile');
  const searchParams = useSearchParams();
  const { replace, query } = useRouter();
  const profileUser = useContext<any>(profileUserContext);

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
                if (key === 'watchlist') {
                  const listStockCodes =
                    watchList.find(
                      (item) => item.location === StockSocketLocation.WATCH_LIST_COMPONENT_LAYOUT,
                    )?.stocks || [];

                  ViewWatchlist(
                    'Default',
                    'Normal WL',
                    listStockCodes,
                    listStockCodes?.length,
                    'Profile screen',
                  );
                }

                if (key === 'assets') {
                  // tracking event view assets
                  ViewAsset('Tab assets my profile', 'Asset Overview');
                }

                replace({ query: { tab: key } });
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
        <div className='tablet:px-0 '>
          <Assets />
        </div>
      </TabPane>

      <TabPane tab={t('following')} key='following'>
        <Following totalFollowing={profileUser.totalFollowing} key={profileUser.followingKey} />
      </TabPane>
      <TabPane tab={t('followers')} key='followers'>
        <Follower totalFollower={profileUser?.totalFollower} key={profileUser.followerKey} />
      </TabPane>
    </Tabs>
  );
};
export default Desktop;
