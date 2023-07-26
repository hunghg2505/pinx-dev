import Tabs, { TabPane } from 'rc-tabs';

import { useAuth } from '@store/auth/useAuth';

import Market from '../Market';
import WatchList from '../WatchList';

interface IPropsTabMobile {
  selectTab: string;
  onChangeTab: (val: any) => void;
}

const TabMobile = ({ selectTab, onChangeTab }: IPropsTabMobile) => {
  const { isLogin } = useAuth();

  return (
    <>
      <Tabs defaultActiveKey='2' activeKey={selectTab} className='tabHome' onChange={onChangeTab}>
        {isLogin && (
          <TabPane tab='Watchlist' key='1'>
            <WatchList />
          </TabPane>
        )}
        <TabPane tab='Market' key='2'>
          <Market />
        </TabPane>
      </Tabs>
    </>
  );
};

export default TabMobile;
