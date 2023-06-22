import { socket } from '@components/Home/service';
import Text from '@components/UI/Text';
import { useRequest } from 'ahooks';
import Tabs, { TabPane } from 'rc-tabs';
import React from 'react';

const MarketDesktop = () => {
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
    <>
      <Tabs defaultActiveKey='1' className='tabHomePc'>
        {dataStockIndex?.map((item: any, index: number) => {
          const [change, changePercent] = item.ot.split('|');
          const isIncrease = item?.cIndex > item?.oIndex;
          const isDecrease = item?.cIndex < item?.oIndex;
          const isNoChange = item?.cIndex === item?.oIndex;
          const isChange = findIndex === index;
          return (
            <TabPane tab={item.displayName} key={index + 1}>
              <div>
                <div className='flex items-center justify-between'>
                  <div>
                    <Text type='body-14-semibold' color='semantic-2-1'>
                      {item?.cIndex}
                    </Text>
                    <Text type='body-12-medium' color='semantic-2-1' className='mt-[2px]'>
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
                        39.2
                      </Text>
                    </div>
                    <div className='text-right'>
                      <Text type='body-12-regular' className=' text-[#78909C]'>
                        Vol
                      </Text>
                      <Text type='body-13-semibold' className='mt-[6px] text-[#263238]'>
                        28,200
                      </Text>
                    </div>
                  </div>
                </div>
                <iframe
                  src={`https://price.pinetree.vn/chart-index/market-chart?marketCode=${item.mc}`}
                  className='h-[248px] w-full rounded-[8px]'
                ></iframe>
              </div>
            </TabPane>
          );
        })}
      </Tabs>
    </>
  );
};
export default MarketDesktop;
