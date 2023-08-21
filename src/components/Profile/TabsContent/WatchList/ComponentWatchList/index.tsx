import React from 'react';

import { requestJoinChannel, requestLeaveChannel, socket } from '@components/Home/service';
import ItemWatchList from '@components/WatchList/ItemWatchList';

const ComponentWatchList = ({ watchList }: { watchList: any }) => {
  const [dataSocket, setDataSocket] = React.useState<any>({});
  const [dataStock, setDataStock] = React.useState<any>([]);
  React.useEffect(() => {
    setDataStock(watchList);
    if (watchList) {
      for (const element of watchList) {
        requestJoinChannel(element.stockCode);
      }
    }
    return () => {
      if (watchList) {
        for (const element of watchList) {
          requestLeaveChannel(element.stockCode);
        }
      }
    };
  }, [watchList]);
  React.useEffect(() => {
    const getDataSocket = (message: any) => {
      const data = message.data;
      if (data?.id === 3220) {
        setDataSocket(data);
      }
    };
    socket.on('public', getDataSocket);
    return () => {
      socket.off('public', getDataSocket);
    };
  }, []);
  const { dataFormat, isChangeStockPrice, findIndex } = React.useMemo(() => {
    const findIndex = dataStock?.findIndex((item: any) => item.stockCode === dataSocket.sym);
    let isChangeStockPrice = false;
    if (dataStock && findIndex !== -1) {
      const data = dataStock[findIndex];
      isChangeStockPrice = data?.lastPrice !== dataSocket?.lastPrice;
      dataStock[findIndex] = {
        ...data,
        ...dataSocket,
      };
    }

    return { dataFormat: dataStock, isChangeStockPrice, findIndex };
  }, [dataSocket, dataStock]);
  return (
    <>
      <div className='flex flex-col gap-y-[16px] pb-[50px] tablet:pb-0'>
        {dataFormat?.map((item: any, index: number) => {
          const isChangeStock = isChangeStockPrice && findIndex === index;
          return (
            <div
              key={`stock-userDetail-${index}`}
              className={
                'flex items-center justify-between rounded-[12px] p-[12px] tablet-max:bg-[#F7F6F8] desktop:rounded-none desktop:border-b-[1px] desktop:border-solid desktop:border-[#EBEBEB] desktop:px-0 desktop:py-[10px] '
              }
            >
              <ItemWatchList
                data={item}
                isEdit={false}
                refresh={() => {}}
                isChangeStock={isChangeStock}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default ComponentWatchList;
