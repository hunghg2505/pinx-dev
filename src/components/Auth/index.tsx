import React from 'react';

import Image from 'next/image'
import Tabs, { TabPane } from 'rc-tabs';

import styles from './index.module.scss';
import Login from './Login';
import Register from './Register';


function Home() {
  return (
    <>
      <div className='flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0'>
        <Image src='/static/icons/register_help_icon.svg' alt='' width='0' height='0' className={'w-[28px] h-[28px] fixed top-[23px] right-[14px] z-999'} onClick={() => console.log('xxx go back')} />
        <div className='pt-[10px]'>
          <Tabs defaultActiveKey='1' className={styles.tabLogin}>
            <TabPane tab='Login' key='1'>
              <Login />
            </TabPane>
            <TabPane tab='Register' key='2'>
              <Register />
            </TabPane>
          </Tabs>
        </div>
      </div >

    </>

  );
}

export default Home;
