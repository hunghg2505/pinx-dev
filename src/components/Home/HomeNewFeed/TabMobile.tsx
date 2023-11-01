import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
// import lazyLoadComponent from 'next-lazy-component';
import Tabs, { TabPane } from 'rc-tabs';

// import { lazyLoadComponent } from '@components/LoadCompVisible';
import lazyLoadHydrate from '@components/LazyComp/LazyComp';
import { useLogin } from '@store/auth/hydrateAuth';

import styles from './index.module.scss';
// import MarketSkeleton from '../Market/MarketSkeleton';
import Market from '../Market';
// import WatchList from '../WatchList';

// const Market = dynamic(() => import('../Market'), { loading: () => <MarketSkeleton /> });
// const WatchList = dynamic(() => import('../WatchList'));
const WatchList = lazyLoadHydrate(() => import('../WatchList'), false);

interface IPropsTabMobile {
  selectTab: string;
  onChangeTab: (val: any) => void;
}

const TabMobile = ({ selectTab, onChangeTab }: IPropsTabMobile) => {
  const { t } = useTranslation();
  const { isLogin } = useLogin();

  return (
    <Tabs
      defaultActiveKey='2'
      activeKey={selectTab}
      className={classNames('tabHome', styles.tabMobile)}
      onChange={onChangeTab}
    >
      {isLogin && (
        <TabPane tab={t('user_watchlist')} key='1'>
          <WatchList />
        </TabPane>
      )}
      <TabPane tab={t('market')} key='2'>
        <Market />
      </TabPane>
    </Tabs>
  );
};

export default TabMobile;
