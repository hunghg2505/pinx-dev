import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';
import { REGISTER_INSTRUCTIONS_LINK } from '@utils/constant';
import { RegisterTracking } from '@utils/dataLayer';
import { AUTH_TAB_TYPE } from 'src/constant';

import styles from './index.module.scss';
import Login from './Login';
import Register from './Register/RegisterForm';

function Auth() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const defaultActiveTab = (router.query?.type || AUTH_TAB_TYPE.LOGIN) as string;
  const [curTab, setCurTab] = useState<string>(defaultActiveTab);

  useEffect(() => {
    setCurTab(defaultActiveTab);
  }, [defaultActiveTab]);

  const handleChangeTab = (tabKey: string) => {
    setCurTab(tabKey);

    if (tabKey === AUTH_TAB_TYPE.REGISTER) {
      router.replace({
        pathname: ROUTE_PATH.LOGIN,
        query: {
          type: AUTH_TAB_TYPE.REGISTER,
        },
      });
      RegisterTracking(new Date(), 'Header', 'CTA');
    } else {
      router.replace({
        pathname: ROUTE_PATH.LOGIN,
      });
    }
  };

  return (
    <>
      {curTab === AUTH_TAB_TYPE.REGISTER && (
        <div className=''>
          <a
            href={REGISTER_INSTRUCTIONS_LINK}
            className='fixed right-[14px] top-[23px] z-[999] flex items-center gap-2 '
            target='_blank'
            rel='noreferrer'
          >
            <Image
              src='/static/icons/register_help_icon.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='h-[28px] w-[28px]'
            />
            <Text type='body-14-regular' className='mobile:hidden laptop:block'>
              {t('sign_up_instruction')}
            </Text>
          </a>
        </div>
      )}

      <div className='pt-[10px] '>
        <Tabs activeKey={curTab} className={styles.tabLogin} onChange={handleChangeTab}>
          <TabPane tab={t('login')} key={AUTH_TAB_TYPE.LOGIN}>
            <Login />
          </TabPane>
          <TabPane tab={t('sign_up')} key={AUTH_TAB_TYPE.REGISTER}>
            <Register />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}

export default Auth;
