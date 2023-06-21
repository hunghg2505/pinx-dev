import React, { useEffect } from 'react';

// import classNames from 'classnames';

import Text from '@components/UI/Text';

import { socket, useGetStock } from '../service';

const Market = () => {
  const { stockIndex, loading } = useGetStock();

  const [dataStock, setDataStock] = React.useState<any>([]);
  useEffect(() => {
    setDataStock(stockIndex);
  }, [loading]);
  console.log('🚀 ~ file: index.tsx:11 ~ Market ~ dataStock:', dataStock);
  // console.log('socket', socket);
  const newListStock = stockIndex && [...stockIndex];
  console.log('🚀 ~ file: index.tsx:16 ~ Market ~ test:', newListStock);

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
      console.log('🚀 ~ file: index.tsx:26 ~ socket.on ~ newData:', newData);

      const newItem = newListStock.find((item: any) => item.mc === data.mc);

      console.log('🚀 ~ file: index.tsx:32 ~ socket.on ~ newItem:', newItem);
      // setDataStock([...dataStock, { ...data, change, changePercent, x, increase, decrease, ref }]);
    }
  });
  console.log('🚀 ~ file: index.tsx:13 ~ Market ~ dataStock:', dataStock);
  if (loading) {
    return <></>;
  }
  return (
    <div className='px-[8px]'>
      <div className='flex flex-wrap gap-[16px]'>
        <div className='item w-[165px] rounded-[8px] bg-[#FFFFFF] p-[20px] text-center [box-shadow:0px_3px_6px_-4px_rgba(0,_0,_0,_0.12),_0px_6px_16px_rgba(0,_0,_0,_0.08),_0px_9px_28px_8px_rgba(0,_0,_0,_0.05)]'>
          <Text type='body-20-bold' color='neutral-1'>
            {/* {item?.displayName} */}
          </Text>
          <Text type='body-12-regular' color='neutral-4'>
            Phiên liên tục
          </Text>
          <Text
            type='body-24-regular'
            // className={classNames('mt-[22px]', {
            //   'text-[#128F63]': isIncrease,
            //   'text-[#DB4444]': isDecrease,
            //   'text-[#E6A70A]': isNoChange,
            // })}
          >
            {/* {price} */}
          </Text>
          <div className='mt-[10px] rounded-[100px] bg-[#E3F6E2]'>
            <Text
              type='body-12-medium'
              // className={classNames('', {
              //   'text-[#128F63]': isIncrease,
              //   'text-[#DB4444]': isDecrease,
              //   'text-[#E6A70A]': isNoChange,
              // })}
            >
              +{dataStock?.change} / +{dataStock?.changePercent}
            </Text>
          </div>
        </div>
        <div className='item w-[165px] rounded-[8px] bg-[#FFFFFF] p-[20px] text-center [box-shadow:0px_3px_6px_-4px_rgba(0,_0,_0,_0.12),_0px_6px_16px_rgba(0,_0,_0,_0.08),_0px_9px_28px_8px_rgba(0,_0,_0,_0.05)]'>
          <Text type='body-20-bold' color='neutral-1'>
            {/* {item?.displayName} */}
          </Text>
          <Text type='body-12-regular' color='neutral-4'>
            Phiên liên tục
          </Text>
          <Text
            type='body-24-regular'
            // className={classNames('mt-[22px]', {
            //   'text-[#128F63]': isIncrease,
            //   'text-[#DB4444]': isDecrease,
            //   'text-[#E6A70A]': isNoChange,
            // })}
          >
            {/* {price} */}
          </Text>
          <div className='mt-[10px] rounded-[100px] bg-[#E3F6E2]'>
            <Text
              type='body-12-medium'
              // className={classNames('', {
              //   'text-[#128F63]': isIncrease,
              //   'text-[#DB4444]': isDecrease,
              //   'text-[#E6A70A]': isNoChange,
              // })}
            >
              +{dataStock?.change} / +{dataStock?.changePercent}
            </Text>
          </div>
        </div>
        <div className='item w-[165px] rounded-[8px] bg-[#FFFFFF] p-[20px] text-center [box-shadow:0px_3px_6px_-4px_rgba(0,_0,_0,_0.12),_0px_6px_16px_rgba(0,_0,_0,_0.08),_0px_9px_28px_8px_rgba(0,_0,_0,_0.05)]'>
          <Text type='body-20-bold' color='neutral-1'>
            {/* {item?.displayName} */}
          </Text>
          <Text type='body-12-regular' color='neutral-4'>
            Phiên liên tục
          </Text>
          <Text
            type='body-24-regular'
            // className={classNames('mt-[22px]', {
            //   'text-[#128F63]': isIncrease,
            //   'text-[#DB4444]': isDecrease,
            //   'text-[#E6A70A]': isNoChange,
            // })}
          >
            {/* {price} */}
          </Text>
          <div className='mt-[10px] rounded-[100px] bg-[#E3F6E2]'>
            <Text
              type='body-12-medium'
              // className={classNames('', {
              //   'text-[#128F63]': isIncrease,
              //   'text-[#DB4444]': isDecrease,
              //   'text-[#E6A70A]': isNoChange,
              // })}
            >
              +{dataStock?.change} / +{dataStock?.changePercent}
            </Text>
          </div>
        </div>
        <div className='item w-[165px] rounded-[8px] bg-[#FFFFFF] p-[20px] text-center [box-shadow:0px_3px_6px_-4px_rgba(0,_0,_0,_0.12),_0px_6px_16px_rgba(0,_0,_0,_0.08),_0px_9px_28px_8px_rgba(0,_0,_0,_0.05)]'>
          <Text type='body-20-bold' color='neutral-1'>
            {/* {item?.displayName} */}
          </Text>
          <Text type='body-12-regular' color='neutral-4'>
            Phiên liên tục
          </Text>
          <Text
            type='body-24-regular'
            // className={classNames('mt-[22px]', {
            //   'text-[#128F63]': isIncrease,
            //   'text-[#DB4444]': isDecrease,
            //   'text-[#E6A70A]': isNoChange,
            // })}
          >
            {/* {price} */}
          </Text>
          <div className='mt-[10px] rounded-[100px] bg-[#E3F6E2]'>
            <Text
              type='body-12-medium'
              // className={classNames('', {
              //   'text-[#128F63]': isIncrease,
              //   'text-[#DB4444]': isDecrease,
              //   'text-[#E6A70A]': isNoChange,
              // })}
            >
              +{dataStock?.change} / +{dataStock?.changePercent}
            </Text>
          </div>
        </div>
        {/* {stockIndex?.map((item: IStockIndex, index: number) => {
          const price = dataStock?.mc === item.mc ? dataStock.cIndex : item.cIndex;
          // const cIndex = dataStock?.mc === item.mc && dataStock.cIndex;
          // const oIndex = dataStock?.mc === item.mc && dataStock.oIndex;

          return (
            <div
              className='item w-[165px] rounded-[8px] bg-[#FFFFFF] p-[20px] text-center [box-shadow:0px_3px_6px_-4px_rgba(0,_0,_0,_0.12),_0px_6px_16px_rgba(0,_0,_0,_0.08),_0px_9px_28px_8px_rgba(0,_0,_0,_0.05)]'
              key={index}
            >
              <Text type='body-20-bold' color='neutral-1'>
                {item?.displayName}
              </Text>
              <Text type='body-12-regular' color='neutral-4'>
                Phiên liên tục
              </Text>
              <Text
                type='body-24-regular'
                // className={classNames('mt-[22px]', {
                //   'text-[#128F63]': isIncrease,
                //   'text-[#DB4444]': isDecrease,
                //   'text-[#E6A70A]': isNoChange,
                // })}
              >
                {price}
              </Text>
              <div className='mt-[10px] rounded-[100px] bg-[#E3F6E2]'>
                <Text
                  type='body-12-medium'
                  // className={classNames('', {
                  //   'text-[#128F63]': isIncrease,
                  //   'text-[#DB4444]': isDecrease,
                  //   'text-[#E6A70A]': isNoChange,
                  // })}
                >
                  +{dataStock?.change} / +{dataStock?.changePercent}
                </Text>
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};
export default Market;
