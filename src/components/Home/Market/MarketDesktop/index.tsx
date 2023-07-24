import React from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
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
        <div className='mb-[25px] h-[496px] w-full rounded-[8px] bg-[#f3f3f3]  px-[20px] py-[30px]  [box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
          <p className='mb-5 text-base font-bold leading-[21px] text-[#0D0D0D]'>Market</p>
          <div className='mb-2 h-[48px] rounded-[8px] bg-[#0D0D0D] opacity-[0.1]'></div>
          <img src='/static/images/fake-stock.png' className='w-full object-cover' alt='' />
        </div>
      </>
    );
  }

  return (
    <>
      <div className='mb-[25px] rounded-[8px] bg-[#FFFFFF] p-[20px] pt-[30px] [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)]'>
        <Text type='body-16-bold' color='cbblack' className='mb-[25px]'>
          Market
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
                          Val
                        </Text>
                        <Text type='body-13-semibold' className='mt-[6px] text-[#263238] '>
                          {item.value.toLocaleString('en-US')}
                        </Text>
                      </div>
                      <div className='text-right'>
                        <Text type='body-12-regular' className=' text-[#78909C]'>
                          Vol
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
                    )}&type=INDEX&ref=${item.oIndex}`}
                    className='w-full rounded-[8px] tablet:h-[350px]'
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
