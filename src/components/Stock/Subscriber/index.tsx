import React from 'react';

import classNames from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Tabs, { TabPane } from 'rc-tabs';

import ContentRight from '@components/Home/ContentRight';
import Text from '@components/UI/Text';

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

      <div className='flex items-start'>
        <div className='rounded-[8px] mobile:w-[375px] tablet:mr-[15px] tablet:w-[calc(100%_-_265px)] desktop:mr-[24px] desktop:w-[749px] desktop:bg-[#FFF] desktop:[box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
          <div className='relative flex h-[46px] items-center justify-center tablet:h-[72px] tablet:border-b tablet:border-solid tablet:border-[#EEF5F9]'>
            <div className='absolute left-[16px] top-1/2 flex -translate-y-1/2 items-center justify-between tablet:left-[24px]'>
              <div
                className='cursor-pointer items-center py-[12px] pl-[8px] pr-[16px]'
                onClick={handleBack}
              >
                <img
                  src='/static/icons/icon_back_header.svg'
                  alt=''
                  className='h-[14px] w-[7px] object-contain tablet:hidden'
                />

                <img
                  src='/static/icons/iconBack.svg'
                  alt=''
                  className='hidden h-[19px] w-[19px] object-contain tablet:block'
                />
              </div>
            </div>

            <Text type='body-20-bold' color='primary-5' className='hidden tablet:block'>
              Community
            </Text>
          </div>

          <div className='px-[16px] tablet:px-[24px]'>
            <Tabs className={classNames(styles.tab, 'tablet:mt-[20px]')} defaultActiveKey='1'>
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

        <ContentRight />
      </div>
    </>
  );
};

export default StockSubscriber;
