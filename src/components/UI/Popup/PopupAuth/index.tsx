import React, { useState } from 'react';

import 'rc-dialog/assets/index.css';
import Dialog from 'rc-dialog';
import Tabs, { TabPane } from 'rc-tabs';

import Login from '@components/Auth/Login';
import Register from '@components/Auth/Register/RegisterForm';
import { REGISTER_INSTRUCTIONS_LINK } from '@utils/constant';
import { AUTH_TAB_TYPE } from 'src/constant';

import styles from './index.module.scss';

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const ModalAuth = (props: IProps) => {
  const [curTab, setCurTab] = useState<string>('login');
  const { visible, onClose } = props;

  const renderCloseIcon = (): React.ReactNode => {
    return <img src='/static/icons/close_icon.svg' alt='' />;
  };

  const handleClose = () => {
    onClose();
  };

  const handleChangeTab = (tabKey: string) => {
    setCurTab(tabKey);
  };

  return (
    <>
      <Dialog visible={visible} onClose={handleClose} closeIcon={renderCloseIcon()}>
        {curTab === AUTH_TAB_TYPE.REGISTER && (
          <div>
            <a
              href={REGISTER_INSTRUCTIONS_LINK}
              className='z-999 absolute right-[20px] top-[65px] flex items-center gap-2'
              target='_blank'
              rel='noreferrer'
            >
              <img
                src='/static/icons/register_help_icon.svg'
                alt=''
                width='0'
                height='0'
                className='h-[28px] w-[28px]'
              />
            </a>
          </div>
        )}
        <Tabs activeKey={curTab} className={styles.tabLogin} onChange={handleChangeTab}>
          <TabPane tab='Login' key={AUTH_TAB_TYPE.LOGIN}>
            <Login isModal />
          </TabPane>
          <TabPane tab='Sign up' key={AUTH_TAB_TYPE.REGISTER}>
            <Register isModal />
          </TabPane>
        </Tabs>
      </Dialog>
    </>
  );
};
export default ModalAuth;
