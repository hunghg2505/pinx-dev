import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import Tabs, { TabPane } from 'rc-tabs';

import styles from './index.module.scss';
import Login from './Login';
import Register from './Register/RegisterForm';

function Home() {
  const router = useRouter();
  const defaultActiveTab: '1' | '2' = router.query?.type === 'register' ? '2' : '1';
  return (
    <>
      <div className='mx-auto flex flex-col items-center justify-center px-6 md:h-screen lg:py-0'>
        <Image
          src='/static/icons/register_help_icon.svg'
          alt=''
          width='0'
          height='0'
          className={'z-999 fixed right-[14px] top-[23px] h-[28px] w-[28px]'}
          onClick={() => console.log('xxx go back')}
        />
        <div className='pt-[10px]'>
          <Tabs defaultActiveKey={defaultActiveTab} className={styles.tabLogin}>
            <TabPane tab='Login' key='1'>
              <Login />
            </TabPane>
            <TabPane tab='Register' key='2'>
              <Register />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Home;
