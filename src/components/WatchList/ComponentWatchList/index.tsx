/* eslint-disable unicorn/consistent-destructuring */
import React, { useMemo } from 'react';

import { useRequest } from 'ahooks';
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
import { postDetailStatusAtom } from '@store/postDetail/postDetail';

import ItemWatchList from '../ItemWatchList';

interface IProps {
  isEdit?: boolean;
  page_size?: number;
  footer?: (list: any) => void;
  optionsRequest?: any;
}
const ComponentWatchList = (props: IProps) => {
  const { isEdit = false, page_size, optionsRequest = {} } = props;
  const [dataStock, setDataStock] = React.useState<any>([]);
  const [dataSocket, setDataSocket] = React.useState<any>({});
  const [postDetailStatus, setPostDetailStatus] = useAtom(postDetailStatusAtom);
  React.useEffect(() => {
    if (postDetailStatus?.isChangeStockWatchList) {
      useWatchList.run();
    }
  }, [postDetailStatus?.isChangeStockWatchList]);
  const useWatchList = useRequest(
    () => {
      return privateRequest(requestPist.get, API_PATH.PRIVATE_WATCHLIST_STOCK);
    },
    {
      manual: true,
      onSuccess: (res: any) => {
        setPostDetailStatus({ ...postDetailStatus, isChangeStockWatchList: false });
        setDataStock(res?.data?.[0]?.stocks);
        const data = res?.data?.[0]?.stocks;
        if (data) {
          for (const element of data) {
            requestJoinChannel(element.stockCode);
          }
        }
      },
      ...optionsRequest,
    },
  );

  React.useEffect(() => {
    useWatchList.run();

    return () => {
      if (dataStock) {
        for (const element of dataStock) {
          requestLeaveChannel(element.stockCode);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { dataFormat, isChangeStockPrice, findIndex } = useMemo(() => {
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
    if (page_size) {
      dataStock?.slice(0, page_size);
    }
    return { dataFormat: dataStock, isChangeStockPrice, findIndex };
  }, [dataSocket, dataStock, page_size]);
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
  return (
    <>
      <div className='flex flex-col gap-y-[16px]'>
        {dataFormat?.map((item: IWatchListItem, index: number) => {
          const isChangeStock = isChangeStockPrice && findIndex === index;
          return (
            <div
              key={`${item.stockCode}-${index}`}
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
      </div>

      {props?.footer && props?.footer?.(dataFormat)}
    </>
  );
};
export default ComponentWatchList;
