import React, { useEffect } from 'react';

import { useUpdateEffect } from 'ahooks';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { useGetDataStockHome } from '@store/stockMarketHome/useGetDataStockHome';
import { useStockMarketHome } from '@store/stockMarketHome/useStockMarketHome';

import styles from './index.module.scss';

const MARKET_STATUS = {
  P: 'market_status.ato_session',
  O: 'market_status.continuous_session',
  I: 'market_status.time_break',
  A: 'market_status.atc_session',
  Z: 'market_status.put_through_session',
  C: 'market_status.market_closed',
  S: 'market_status.market_paused',
  W: 'market_status.market_closed2',
  L: 'market_status.plo_session',
  WO: 'market_status.waiting_open',
} as any;

let DEFAULT = [
  {
    id: 1101,
    ot: '35.81|3.44%|14637214|516|32|26',
    accVol: null,
    time: 'null',
    vol: 772_121_338,
    value: 14_637_214,
    mc: '10',
    status: 'C',
    isBeforeTransactionTime: false,
    index: 'VNINDEX',
    displayName: 'VNINDEX',
    oIndex: 1039.66,
    cIndex: 1075.47,
  },
  {
    id: 1101,
    ot: '35.85|3.41%|5374941|30|0|0',
    accVol: null,
    time: 'null',
    vol: 195_216_900,
    value: 5_374_941,
    mc: '11',
    status: 'C',
    isBeforeTransactionTime: false,
    index: 'VN30',
    displayName: 'VN30',
    oIndex: 1051.65,
    cIndex: 1087.5,
  },
  {
    id: 1101,
    ot: '8.32|3.97%|2147120|175|37|28',
    accVol: null,
    time: 'null',
    vol: 125_172_683,
    value: 2_147_120,
    mc: '02',
    status: 'C',
    isBeforeTransactionTime: false,
    index: 'HNXINDEX',
    displayName: 'HNX',
    oIndex: 209.65,
    cIndex: 217.97,
  },
  {
    id: 1101,
    ot: '2.27|2.78%|668080|271|47|42',
    accVol: null,
    time: 'null',
    vol: 47_110_960,
    value: 668_080,
    mc: '03',
    status: 'C',
    isBeforeTransactionTime: false,
    index: 'UPCOMINDEX',
    displayName: 'UPCOM',
    oIndex: 81.7,
    cIndex: 83.97,
  },
];

const Market = () => {
  const { t } = useTranslation('home');
  const { dataStockIndex, findIndex } = useGetDataStockHome();
  const { closeSocket } = useStockMarketHome();

  useEffect(() => {
    return () => {
      closeSocket();
    };
  }, []);

  useUpdateEffect(() => {
    if (dataStockIndex?.length) {
      DEFAULT = dataStockIndex;
    }
  }, [dataStockIndex]);

  // if (!dataStockIndex?.length) {
  //   return (
  //     <div className='mt-[24px] desktop:px-[16px]'>
  //       <div className='grid min-h-[476px] grid-cols-2 flex-wrap items-center gap-[16px]'>
  //         {[1, 2, 3, 4].map((item) => (
  //           <div
  //             key={`skeleton-market-${item}`}
  //             className='h-[230px] w-full rounded-[8px] bg-[#e1edf4] tablet:w-[163px]'
  //           ></div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

  const data = dataStockIndex?.length ? dataStockIndex : DEFAULT;

  return (
    <div className='mt-[24px] desktop:px-[16px]'>
      <div className='grid grid-cols-2 flex-wrap items-center gap-[16px] galaxy-max:gap-[8px]'>
        {data?.map((item: any, index: number) => {
          const [change, changePercent] = item.ot.split('|');
          const isIncrease = item?.cIndex > item?.oIndex;
          const isDecrease = item?.cIndex < item?.oIndex;
          const isNoChange = item?.cIndex === item?.oIndex;
          const isChange = findIndex === index;

          let unit;
          if (isNoChange) {
            unit = '';
          } else if (isIncrease) {
            unit = '+';
          } else {
            unit = '-';
          }

          return (
            <div
              key={index}
              className='rounded-[8px] bg-[#FFFFFF] [box-shadow:0px_3px_6px_-4px_rgba(0,_0,_0,_0.12),_0px_6px_16px_rgba(0,_0,_0,_0.08),_0px_9px_28px_8px_rgba(0,_0,_0,_0.05)] tablet:w-[163px]'
            >
              <div className='item px-[12px] py-[20px] text-left galaxy-max:p-[12px] ' key={index}>
                <Text type='body-20-semibold' className='galaxy-max:text-[16px]' color='neutral-1'>
                  {item?.displayName}
                </Text>
                <Text type='body-12-regular' color='neutral-4' className='mt-[4px]'>
                  {t(MARKET_STATUS[item.status])}
                </Text>
                <Text
                  type='body-24-regular'
                  className={classNames(
                    'mt-[10px] h-[36px] px-[5px] py-[2px] galaxy-max:text-[20px]',
                    {
                      'text-[#128F63]': isIncrease,
                      'text-[#DB4444]': isDecrease,
                      'text-[#E6A70A]': isNoChange,
                      [styles.isDecrease]: isDecrease && isChange,
                      [styles.isIncrease]: isIncrease && isChange,
                    },
                  )}
                >
                  {item?.cIndex?.toLocaleString('en-US')}
                </Text>
                <div
                  className={classNames(
                    'mt-[6px] inline-block whitespace-nowrap rounded-[100px] px-[5px] py-[2px]',
                    {
                      'bg-[#E3F6E2]': isIncrease,
                      'bg-[#F5E4E7]': isDecrease,
                      'bg-[#FCECC4]': isNoChange,
                      [styles.isDecrease]: isDecrease && isChange,
                      [styles.isIncrease]: isIncrease && isChange,
                    },
                  )}
                >
                  <Text
                    type='body-12-medium'
                    className={classNames('px-[5px] py-[2px] galaxy-max:text-[10px]', {
                      'text-[#128F63]': isIncrease,
                      'text-[#DB4444]': isDecrease,
                      'text-[#E6A70A]': isNoChange,
                      [styles.isDecrease]: isDecrease && isChange,
                      [styles.isIncrease]: isIncrease && isChange,
                    })}
                  >
                    {unit}
                    {item?.change || change} / {unit}
                    {item?.changePercent || changePercent}
                  </Text>
                </div>
              </div>

              <iframe
                src={`https://price.pinetree.vn/chart-index/market-chart?marketCode=${item.mc}`}
                loading='lazy'
                className='h-[70px] w-full rounded-[8px] bg-[#e1edf4]'
              ></iframe>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Market;
