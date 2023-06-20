import React from 'react';

import Text from '@components/UI/Text';

import { IStockIndex, socket, useGetStock } from '../service';

const Market = () => {
  const [dataStock, setDataStock] = React.useState<any>();
  socket.on('public', (message: any) => {
    const data = message.data;
    if (data?.id === 1101) {
      const [change, changePercent, x, increase, decrease, ref] = data.ot.split('|');
      setDataStock({ ...data, change, changePercent, x, increase, decrease, ref });
    }
  });
  const { stockIndex } = useGetStock();
  return (
    <div className='px-[8px]'>
      <div className='flex flex-wrap gap-[16px]'>
        {stockIndex?.map((item: IStockIndex, index: number) => {
          const price = dataStock?.mc === item.mc ? dataStock.cIndex : item.cIndex;
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
              <Text type='body-24-regular' color='semantic-2-1' className='mt-[22px]'>
                {price}
              </Text>
              <div className='mt-[10px] rounded-[100px] bg-[#E3F6E2]'>
                <Text type='body-12-medium' color='semantic-2-1'>
                  +2.09 / +0.02%
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Market;
