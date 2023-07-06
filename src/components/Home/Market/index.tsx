import React from 'react';

// import classNames from 'classnames';

import { useRequest } from 'ahooks';
import classNames from 'classnames';

import { PREFIX_API_MARKET } from '@api/request';
import Text from '@components/UI/Text';

import styles from './index.module.scss';
import { socket } from '../service';

const enum MARKET_STATUS {
  P = 'ATO session',
  O = 'Continuous session',
  I = 'Time break',
  A = 'ATC session',
  Z = 'Put Through session',
  C = 'Market Closed',
  S = 'Market Paused',
  W = 'Market Closed',
  L = 'PLO session',
  WO = 'Waiting Open',
}
const renderMarketStatus = (type: string) => {
  if (type === 'P') {
    return MARKET_STATUS.P;
  }
  if (type === 'O') {
    return MARKET_STATUS.O;
  }
  if (type === 'I') {
    return MARKET_STATUS.I;
  }
  if (type === 'A') {
    return MARKET_STATUS.A;
  }
  if (type === 'Z') {
    return MARKET_STATUS.Z;
  }
  if (type === 'C') {
    return MARKET_STATUS.C;
  }
  if (type === 'S') {
    return MARKET_STATUS.S;
  }
  if (type === 'W') {
    return MARKET_STATUS.W;
  }
  if (type === 'L') {
    return MARKET_STATUS.L;
  }
  if (type === 'WO') {
    return MARKET_STATUS.WO;
  }
};
const Market = () => {
  const [dataStock, setDataStock] = React.useState<any>([]);
  const [dataStockIndex, setDataStockIndex] = React.useState<any>([]);
  const { run } = useRequest(
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
    dataStockIndex[findIndex] = { ...data, ...dataStock };
  }
  return (
    <div className='mt-[24px] px-[16px]'>
      <div className='grid grid-cols-2 flex-wrap items-center gap-[16px]'>
        {dataStockIndex?.map((item: any, index: number) => {
          const [change, changePercent] = item.ot.split('|');
          const isIncrease = item?.cIndex > item?.oIndex;
          const isDecrease = item?.cIndex < item?.oIndex;
          const isNoChange = item?.cIndex === item?.oIndex;
          const isChange = findIndex === index;
          return (
            <div
              key={index}
              className='rounded-[8px] bg-[#FFFFFF] [box-shadow:0px_3px_6px_-4px_rgba(0,_0,_0,_0.12),_0px_6px_16px_rgba(0,_0,_0,_0.08),_0px_9px_28px_8px_rgba(0,_0,_0,_0.05)] tablet:w-[163px]'
            >
              <div className='item p-[20px] text-left ' key={index}>
                <Text type='body-20-semibold' color='neutral-1'>
                  {item?.displayName}
                </Text>
                <Text type='body-12-regular' color='neutral-4' className='mt-[4px]'>
                  {renderMarketStatus(item.status)}
                </Text>
                <Text
                  type='body-24-regular'
                  className={classNames('mt-[10px] h-[36px] px-[5px] py-[2px]', {
                    'text-[#128F63]': isIncrease,
                    'text-[#DB4444]': isDecrease,
                    'text-[#E6A70A]': isNoChange,
                    [styles.isDecrease]: isDecrease && isChange,
                    [styles.isIncrease]: isIncrease && isChange,
                  })}
                >
                  {item?.cIndex?.toLocaleString('en-US')}
                </Text>
                <div
                  className={classNames('mt-[6px] inline-block rounded-[100px] px-[5px] py-[2px]', {
                    'bg-[#E3F6E2]': isIncrease,
                    'bg-[#F5E4E7]': isDecrease,
                    'bg-[#FCECC4]': isNoChange,
                    [styles.isDecrease]: isDecrease && isChange,
                    [styles.isIncrease]: isIncrease && isChange,
                  })}
                >
                  <Text
                    type='body-12-medium'
                    className={classNames('px-[5px] py-[2px]', {
                      'text-[#128F63]': isIncrease,
                      'text-[#DB4444]': isDecrease,
                      'text-[#E6A70A]': isNoChange,
                      [styles.isDecrease]: isDecrease && isChange,
                      [styles.isIncrease]: isIncrease && isChange,
                    })}
                  >
                    {isIncrease ? '+' : '-'}
                    {item?.change || change} / {isIncrease ? '+' : ''}
                    {item?.changePercent || changePercent}
                  </Text>
                </div>
              </div>
              <iframe
                src={`https://price.pinetree.vn/chart-index/market-chart?marketCode=${item.mc}`}
                className='h-[70px] w-full rounded-[8px]'
              ></iframe>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Market;
