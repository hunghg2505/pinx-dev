import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import Tabs, { TabPane } from 'rc-tabs';

import AllTab from './AllTab';
import styles from './index.module.scss';
import InvestingTab from './InvestingTab';
import WatchingTab from './WatchingTab';

const StockSubscriber = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Subscriber</title>
      </Head>

      <div className='mx-auto mobile:w-[375px]'>
        <div className='px-[16px]'>
          <div
            className='mb-[8px] inline-block cursor-pointer items-center py-[16px] pl-[12px] pr-[16px]'
            onClick={handleBack}
          >
            <img
              src='/static/icons/icon_back_header.svg'
              alt=''
              className='h-[14px] w-[7px] object-contain'
            />
          </div>

          <Tabs className={styles.tab} defaultActiveKey='1'>
            <TabPane tab='All' tabKey='1'>
              <AllTab />
            </TabPane>

            <TabPane tab='Investing' key='2'>
              <InvestingTab />
            </TabPane>

            <TabPane tab='Watching' key='3'>
              <WatchingTab />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default StockSubscriber;
