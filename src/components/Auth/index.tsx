import React, { useState } from 'react';

import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Tabs, { TabPane } from 'rc-tabs';

import Text from '@components/UI/Text';

import styles from './index.module.scss';
import Login from './Login';
import Register from './Register/RegisterForm';

function Home() {
  const router = useRouter();
  const defaultActiveTab: '1' | '2' = router.query?.type === 'register' ? '2' : '1';
  const [curTab, setCurTab] = useState<string>();
  return (
    <>
      {curTab === '2' && (
        <div>
          <NextLink
            href='#'
            className='z-999 fixed right-[14px] top-[23px] flex items-center gap-2'
          >
            <Image
              src='/static/icons/register_help_icon.svg'
              alt=''
              width='0'
              height='0'
              className='h-[28px] w-[28px]'
            />
            <Text type='body-14-regular' className='mobile:hidden laptop:block'>
              Sign up instructions
            </Text>
          </NextLink>
        </div>
      )}

      <div className='pt-[10px]'>
        <Tabs
          defaultActiveKey={defaultActiveTab}
          className={styles.tabLogin}
          onChange={(value) => setCurTab(value)}
        >
          <TabPane tab='Login' key='1'>
            <Login />
          </TabPane>
          <TabPane tab='Sign up' key='2'>
            <Register />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}

export default Home;
