import React from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import { PREFIX_API_MARKET } from '@api/request';
import { socket } from '@components/Home/service';
import Text from '@components/UI/Text';

import styles from './index.module.scss';

export const getMarketCodeChart = (marketCode: string) => {
  if (marketCode === '10') {
    return 'VNINDEX';
  }

  if (marketCode === '02') {
    return 'HNXINDEX';
  }

  if (marketCode === '03') {
    return 'UPCOMINDEX';
  }

  if (marketCode === '11') {
    return 'VN30';
  }

  return '';
};
const MarketDesktop = () => {
  const { t, i18n } = useTranslation('common');
  const [dataStock, setDataStock] = React.useState<any>([]);
  const [dataStockIndex, setDataStockIndex] = React.useState<any>([]);
  const { run, loading } = useRequest(
    () => {
      return fetch(PREFIX_API_MARKET + '/public/index').then((data: any) => data.json());
    },
    {
      manual: true,
      onSuccess: (res) => {
        setDataStockIndex(res?.data);
      },
    },
  );

  React.useEffect(() => {
    run();
  }, []);

  socket.on('public', (message: any) => {
    const data = message.data;
    if (data?.id === 1101) {
      const [change, changePercent, x, increase, decrease, ref] = data.ot.split('|');
      const newData = {
        ...data,
        change,
        changePercent,
        x,
        increase,
        decrease,
        ref,
      };
      delete newData.ot;
      setDataStock(newData);
    }
  });

  const findIndex = dataStockIndex?.findIndex((item: any) => item.mc === dataStock.mc);
  if (findIndex !== -1) {
    const data = dataStockIndex[findIndex];
    dataStockIndex[findIndex] = { ...dataStock, ...data };
  }

  if (loading) {
    return (
      <>
        <div className='mb-[25px]  min-h-[536px] w-full rounded-[8px] bg-[#fff]  px-[20px] py-[30px]  [box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
          <p className='body-16-bold cbblack mb-[25px]'>{t('market')}</p>

          <img src='/static/images/fake-stock.png' className=' w-full object-contain' alt='' />
        </div>
      </>
    );
  }

  return (
    <>
      <div className='box-shadow card-style mb-[25px] rounded-[8px] bg-[#FFFFFF] p-[20px] pt-[30px]'>
        <Text type='body-16-bold' color='cbblack' className='mb-[25px]'>
          {t('market')}
        </Text>
        <Tabs defaultActiveKey='1' className='tabHomePc'>
          {dataStockIndex?.map((item: any, index: number) => {
            const [change, changePercent] = item.ot.split('|');
            const isIncrease = item?.cIndex > item?.oIndex;
            const isDecrease = item?.cIndex < item?.oIndex;
            const isNoChange = item?.cIndex === item?.oIndex;
            const isChange = findIndex === index;
            return (
              <TabPane tab={item.displayName} key={index + 1}>
                <div className='mt-[20px]'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <Text
                        type='body-14-semibold'
                        className={classNames('px-[5px] py-[2px]', {
                          'text-[#128F63]': isIncrease,
                          'text-[#DB4444]': isDecrease,
                          'text-[#E6A70A]': isNoChange,
                          [styles.isDecrease]: isDecrease && isChange,
                          [styles.isIncrease]: isIncrease && isChange,
                          [styles.isNoChange]: isNoChange && isChange,
                        })}
                      >
                        {item?.cIndex}
                      </Text>
                      <Text
                        type='body-12-medium'
                        className={classNames('mt-[2px] px-[5px] py-[2px]', {
                          'text-[#128F63]': isIncrease,
                          'text-[#DB4444]': isDecrease,
                          'text-[#E6A70A]': isNoChange,
                          [styles.isDecrease]: isDecrease && isChange,
                          [styles.isIncrease]: isIncrease && isChange,
                          [styles.isNoChange]: isNoChange && isChange,
                        })}
                      >
                        {isIncrease ? '+' : '-'}
                        {item?.change || change} / {isIncrease ? '+' : ''}
                        {item?.changePercent || changePercent}
                      </Text>
                    </div>
                    <div className='flex'>
                      <div className='mr-[35px] text-right'>
                        <Text type='body-12-regular' className='text-[#78909C]'>
                          {t('val')}
                        </Text>
                        <Text type='body-13-semibold' className='mt-[6px] text-[#263238] '>
                          {item.value.toLocaleString('en-US')}
                        </Text>
                      </div>
                      <div className='text-right'>
                        <Text type='body-12-regular' className=' text-[#78909C]'>
                          {t('vol')}
                        </Text>
                        <Text type='body-13-semibold' className='mt-[6px] text-[#263238]'>
                          {item.vol.toLocaleString('en-US')}
                        </Text>
                      </div>
                    </div>
                  </div>
                  <iframe
                    src={`https://price.pinetree.vn/chart-index/stock-chart?code=${getMarketCodeChart(
                      item.mc,
                    )}&type=INDEX&ref=${item.oIndex}&lang=${i18n.language}`}
                    className='h-[350px] w-full rounded-[8px]'
                  ></iframe>
                </div>
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    </>
  );
};
export default MarketDesktop;
