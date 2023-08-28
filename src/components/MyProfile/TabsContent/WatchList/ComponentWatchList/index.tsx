import React from 'react';

import { useRequest, useUnmount } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import {
  IWatchListItem,
  requestJoinChannel,
  requestLeaveChannel,
  socket,
} from '@components/Home/service';
import ItemWatchList from '@components/WatchList/ItemWatchList';
import { StockSocketLocation, stockSocketAtom } from '@store/stockStocket';

import NotFound from '../NotFound';

interface IProps {
  isEdit?: boolean;
}
const ComponentWatchList = (props: IProps) => {
  const [stockSocket, setStockSocket] = useAtom(stockSocketAtom);
  const { isEdit = false } = props;
  const [dataStock, setDataStock] = React.useState<any>([]);
  const useWatchList = useRequest(
    () => {
      return privateRequest(requestPist.get, API_PATH.PRIVATE_WATCHLIST_STOCK);
    },
    {
      manual: true,
      onSuccess: (res: any) => {
        setDataStock(res?.data?.[0]?.stocks);
        const data = res?.data?.[0]?.stocks;
        if (data) {
          const listStockCodes: string[] = [];
          for (const element of data) {
            requestJoinChannel(element.stockCode);
            listStockCodes.push(element.stockCode);
          }

          const findStock = stockSocket.find(
            (item) => item.location === StockSocketLocation.WATCH_LIST_PROFILE_PAGE,
          );
          if (!findStock) {
            setStockSocket((prev) => [
              ...prev,
              {
                location: StockSocketLocation.WATCH_LIST_PROFILE_PAGE,
                stocks: listStockCodes,
              },
            ]);
          }
        }
      },
    },
  );
  React.useEffect(() => {
    useWatchList.run();
  }, []);

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
      prev.filter((item) => item.location !== StockSocketLocation.WATCH_LIST_PROFILE_PAGE),
    );
  });

  const [dataSocket, setDataSocket] = React.useState<any>({});
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
      <div className='mb-[50px] flex flex-col gap-y-[16px] px-[10px] galaxy-max:px-0 tablet:mb-0 desktop:px-0'>
        {dataFormat?.map((item: IWatchListItem, index: number) => {
          const isChangeStock = isChangeStockPrice && findIndex === index;
          return (
            <div
              key={index}
              className={classNames({
                'relative flex items-center justify-between rounded-[12px] border-b-[1px] border-solid border-[#EBEBEB] bg-[#ECECEC] p-[12px]':
                  isEdit,
                'flex items-center justify-between rounded-[12px] p-[12px] tablet-max:bg-[#F7F6F8] desktop:rounded-none desktop:border-b-[1px] desktop:border-solid desktop:border-[#EBEBEB] desktop:px-0 desktop:py-[10px] ':
                  !isEdit,
              })}
            >
              <ItemWatchList
                data={item}
                isEdit={isEdit}
                refresh={useWatchList.refresh}
                isChangeStock={isChangeStock}
              />
            </div>
          );
        })}
        {dataStock?.length === 0 && <NotFound />}
      </div>
    </>
  );
};
export default ComponentWatchList;
