import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import { useAuth } from '@store/auth/useAuth';

import styles from './index.module.scss';
import Market from '../Market';
import WatchList from '../WatchList';

interface IPropsTabMobile {
  selectTab: string;
  onChangeTab: (val: any) => void;
}

const TabMobile = ({ selectTab, onChangeTab }: IPropsTabMobile) => {
  const { t } = useTranslation();
  const { isLogin } = useAuth();

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
