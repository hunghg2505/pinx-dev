import React, { useState } from 'react';

import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import Login from '@components/Auth/Login';
import Register from '@components/Auth/Register/RegisterForm';
import Modal from '@components/UI/Modal/Modal';
import { REGISTER_INSTRUCTIONS_LINK, AUTH_TAB_TYPE } from 'src/constant';
import { registerTracking } from 'src/mixpanel/mixpanel';

import styles from './index.module.scss';

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const PopupAuth = (props: IProps) => {
  const { t } = useTranslation();
  const [curTab, setCurTab] = useState<string>(AUTH_TAB_TYPE.LOGIN);
  const { visible, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  const handleChangeTab = (tabKey: string) => {
    setCurTab(tabKey);
    if (tabKey === AUTH_TAB_TYPE.REGISTER) {
      registerTracking(new Date(), 'popupRegister', 'Login Modal');
    }
  };

  return (
    <>
      <Modal visible={visible} onClose={handleClose}>
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
          <TabPane tab={t('login')} key={AUTH_TAB_TYPE.LOGIN}>
            <Login isModal />
          </TabPane>
          <TabPane tab={t('sign_up')} key={AUTH_TAB_TYPE.REGISTER}>
            <Register isModal />
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};
export default PopupAuth;
