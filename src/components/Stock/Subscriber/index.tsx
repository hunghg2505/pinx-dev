import React from 'react';

import classNames from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import Text from '@components/UI/Text';

import AllTab from './AllTab';
import styles from './index.module.scss';
import InvestingTab from './InvestingTab';
import WatchingTab from './WatchingTab';

const StockSubscriber = () => {
  const { t } = useTranslation(['stock', 'common']);
  const router = useRouter();
  const { stockCode }: any = router.query;

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>{t('subscribe_page_title')}</title>
      </Head>

      <div className='p-[10px] desktop:p-0'>
        <div className='box-shadow card-style'>
          <div className='relative mb-[12px] flex h-[44px] items-center justify-center tablet:mb-0 tablet:h-[48px]'>
            <div className='absolute left-0 top-1/2 flex -translate-y-1/2 items-center justify-between'>
              <div className='cursor-pointer items-center pr-[16px]' onClick={handleBack}>
                <img
                  src='/static/icons/back_icon.svg'
                  alt=''
                  className='h-[28px] w-[28px] object-contain'
                />
              </div>
            </div>

            <Text type='body-20-bold' color='primary-5' className='hidden tablet:block'>
              {t('subscribe_page_title')}
            </Text>
          </div>

          <div>
            <Tabs className={classNames(styles.tab, 'tablet:mt-[20px]')} defaultActiveKey='1'>
              <TabPane tab={t('subscriber_tab.all')} tabKey='1'>
                <AllTab stockCode={stockCode} />
              </TabPane>

              <TabPane tab={t('subscriber_tab.investing')} key='2'>
                <InvestingTab stockCode={stockCode} />
              </TabPane>

              <TabPane tab={t('subscriber_tab.watching')} key='3'>
                <WatchingTab stockCode={stockCode} />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockSubscriber;
