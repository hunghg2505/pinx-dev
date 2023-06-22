import React from 'react';

// import classNames from 'classnames';

import { useRequest } from 'ahooks';
import classNames from 'classnames';

import Text from '@components/UI/Text';

import { socket } from '../service';

const Market = () => {
  const [dataStock, setDataStock] = React.useState<any>([]);
  const [dataStockIndex, setDataStockIndex] = React.useState<any>([]);
  const { run } = useRequest(
    () => {
      return fetch('https://testapi.pinex.vn/market/public/index').then((data: any) => data.json());
    },
    {
      manual: true,
      onSuccess: (res) => {
        setDataStockIndex(res.data);
        console.log('🚀 ~ file: index.tsx:26 ~ Market ~ res:', res);
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
  return (
    <div className='px-[8px]'>
      <div className='flex flex-wrap items-center gap-[16px]'>
        {dataStockIndex?.map((item: any, index: number) => {
          const [change, changePercent] = item.ot.split('|');
          const isIncrease = item?.cIndex > item?.oIndex;
          const isDecrease = item?.cIndex < item?.oIndex;
          const isNoChange = item?.cIndex === item?.oIndex;
          const isChange = findIndex === index;
          return (
            <div
              key={index}
              className='w-[171px] rounded-[8px] bg-[#FFFFFF] [box-shadow:0px_3px_6px_-4px_rgba(0,_0,_0,_0.12),_0px_6px_16px_rgba(0,_0,_0,_0.08),_0px_9px_28px_8px_rgba(0,_0,_0,_0.05)]'
            >
              <div className='item p-[20px] text-center ' key={index}>
                <Text type='body-20-bold' color='neutral-1'>
                  {item?.displayName}
                </Text>
                <Text type='body-12-regular' color='neutral-4'>
                  Phiên liên tục
                </Text>
                <Text
                  type='body-24-regular'
                  className={classNames('mt-[22px]', {
                    'text-[#128F63]': isIncrease,
                    'text-[#DB4444]': isDecrease,
                    'text-[#E6A70A]': isNoChange,
                    'bg-[#128F63] text-[#ffffff]': isIncrease && isChange,
                    'bg-[#DB4444] text-[#ffffff]': isDecrease && isChange,
                    'bg-[#E6A70A] text-[#ffffff]': isNoChange && isChange,
                  })}
                >
                  {item?.cIndex}
                </Text>
                <div
                  className={classNames('mt-[10px] rounded-[100px]', {
                    'bg-[#E3F6E2]': isIncrease,
                    'bg-[#F5E4E7]': isDecrease,
                    'bg-[#FCECC4]': isNoChange,
                  })}
                >
                  <Text
                    type='body-12-medium'
                    className={classNames('', {
                      'text-[#128F63]': isIncrease,
                      'text-[#DB4444]': isDecrease,
                      'text-[#E6A70A]': isNoChange,
                      'bg-[#128F63] text-[#ffffff]': isIncrease && isChange,
                      'bg-[#DB4444] text-[#ffffff]': isDecrease && isChange,
                      'bg-[#E6A70A] text-[#ffffff]': isNoChange && isChange,
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
