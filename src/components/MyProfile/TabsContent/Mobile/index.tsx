import React from 'react';

import { useAtomValue } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import TabBar from '@components/common/RCTabBar';
import { StockSocketLocation, stockSocketAtom } from '@store/stockStocket';
import { ViewWatchlist } from '@utils/dataLayer';

import Assets from '../Assets';
import Posts from '../Posts';
import WatchList from '../WatchList';

const Mobile = () => {
  const watchList = useAtomValue(stockSocketAtom);
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
                  // tracking
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
        <TabPane tab={t('posts')} key='post'>
          <Posts />
        </TabPane>
        <TabPane tab={t('watchlist')} key='watchlist'>
          <div>
            <WatchList />
          </div>
        </TabPane>
        <TabPane tab={<div className='flex justify-center'>{t('assets')}</div>} key='assets'>
          <div className='pb-[50px] tablet:pb-0'>
            <Assets />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Mobile;
