import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { useGetWatchList } from '@components/Home/service';
import lazyLoadHydrate from '@components/LazyComp/LazyComp';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { useLogin } from '@store/auth/hydrateAuth';
import { ROUTE_PATH } from '@utils/common';
import { getMoreInfoTracking, viewWatchListTracking } from 'src/mixpanel/mixpanel';

import styles from './index.module.scss';
// import MarketSkeleton from '../Market/MarketSkeleton';
import Market from '../Market';

// import WatchList from '../WatchList';

// const Market = dynamic(() => import('../Market'), { loading: () => <MarketSkeleton /> });
// const WatchList = dynamic(() => import('../WatchList'));
const WatchList = lazyLoadHydrate(() => import('../WatchList'), false);
// const Market = lazyLoadHydrate(() => import('../Market'), true);

const TabMobile = () => {
  const { t } = useTranslation();
  const { isLogin } = useLogin();
  const [selectTab, setSelectTab] = useState<string>('2');
  const { watchList } = useGetWatchList();
  const isHaveStockWatchList = !!(watchList?.[0]?.stocks?.length > 0);

  useEffect(() => {
    const isHaveStockWatchList = !!(watchList?.[0]?.stocks?.length > 0);

    if (isHaveStockWatchList) {
      setSelectTab('1');
    }
  }, [watchList]);

  const handleTracking = () => {
    const isHaveStockWatchList = !!(watchList?.[0]?.stocks?.length > 0);

    // tracking event view wl
    const stockCodes = isHaveStockWatchList
      ? watchList?.[0]?.stocks?.map((item: any) => item.stockCode)
      : [];

    viewWatchListTracking(
      'Personal Watchlist',
      'Personal Watchlist',
      stockCodes,
      stockCodes.length,
      'Home screen',
    );

    // tracking event get more info
    getMoreInfoTracking('Home screen', 'Watchlist', 'My watchlist');
  };

  const onChangeTab = (key: string) => {
    setSelectTab(key);
  };

  return (
    <>
      {selectTab === '1' && isHaveStockWatchList && (
        <CustomLink
          className='absolute right-[0] top-[3px] z-50 flex flex-row items-center'
          href={ROUTE_PATH.WATCHLIST}
          onClick={handleTracking}
        >
          <Text
            type='body-12-medium'
            className='galaxy-max:hidden tablet:text-[14px]'
            color='primary-1'
          >
            {t('see_all')}
          </Text>
          <img
            src='/static/icons/iconNext.svg'
            width={5}
            height={5}
            alt=''
            className='ml-[11px] w-[10px]'
          />
        </CustomLink>
      )}
      <div className={classNames('flex gap-[20px] align-middle', styles.tabWrap)}>
        {isLogin && (
          <div
            className={classNames(styles.tabItem, {
              [styles.tabItemActive]: selectTab === '1',
            })}
            onClick={() => onChangeTab('1')}
          >
            {t('user_watchlist')}
          </div>
        )}
        <div
          className={classNames(styles.tabItem, {
            [styles.tabItemActive]: selectTab === '2',
          })}
          onClick={() => onChangeTab('2')}
        >
          {t('market')}
        </div>
      </div>
      {selectTab === '1' && <WatchList />}
      {selectTab === '2' && <Market />}
    </>
  );
};

export default TabMobile;
