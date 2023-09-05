import React from 'react';

import { useUnmount } from 'ahooks';
import { useAtom } from 'jotai';

import { requestJoinChannel, requestLeaveChannel, socket } from '@components/Home/service';
import ItemWatchList from '@components/WatchList/ItemWatchList';
import { StockSocketLocation, stockSocketAtom } from '@store/stockStocket';
import { ViewTickerInfo } from '@utils/dataLayer';

// tracking event view ticker info
const handleTrackingViewStockInfo = (stockCode: string) => {
  ViewTickerInfo(stockCode, 'User detail screen', 'Watch list tab', 'Stock');
};

const ComponentWatchList = ({ watchList }: { watchList: any }) => {
  const [dataSocket, setDataSocket] = React.useState<any>({});
  const [dataStock, setDataStock] = React.useState<any>([]);
  const [stockSocket, setStockSocket] = useAtom(stockSocketAtom);

  React.useEffect(() => {
    setDataStock(watchList);
    if (watchList) {
      const listStockCodes: string[] = [];
      for (const element of watchList) {
        requestJoinChannel(element.stockCode);
        listStockCodes.push(element.stockCode);
      }

      const findStock = stockSocket.find(
        (item) => item.location === StockSocketLocation.WATCH_LIST_USER_DETAIL_PAGE,
      );
      if (!findStock) {
        setStockSocket((prev) => [
          ...prev,
          {
            location: StockSocketLocation.WATCH_LIST_USER_DETAIL_PAGE,
            stocks: listStockCodes,
          },
        ]);
      }
    }
  }, [watchList]);

  useUnmount(() => {
    if (dataStock) {
      const listStockCodes = dataStock.map((item: any) => item.stockCode);
      const stockNotJoinSocketChannel = listStockCodes.filter((item: any) => {
        return stockSocket.some((v) => !v.stocks.includes(item));
      });

      if (stockNotJoinSocketChannel.length > 0) {
        requestLeaveChannel(stockNotJoinSocketChannel.toString());
      }
    }

    setStockSocket((prev) =>
      prev.filter((item) => item.location !== StockSocketLocation.WATCH_LIST_USER_DETAIL_PAGE),
    );
  });

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
                handleTrackingViewStockInfo={handleTrackingViewStockInfo}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default ComponentWatchList;
