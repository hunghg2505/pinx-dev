import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import { useLogin } from '@store/auth/hydrateAuth';

import styles from './index.module.scss';
import Market from '../Market';
// import WatchList from '../WatchList';

const WatchList = dynamic(() => import('../WatchList'), { ssr: false });
interface IPropsTabMobile {
  selectTab: string;
  onChangeTab: (val: any) => void;
}

const TabMobile = ({ selectTab, onChangeTab }: IPropsTabMobile) => {
  const { t } = useTranslation();
  const { isLogin } = useLogin();

  return (
    <>
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
    </>
  );
};

export default TabMobile;
