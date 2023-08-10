/* eslint-disable unicorn/consistent-destructuring */
import React, { useMemo } from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import {
  IWatchListItem,
  requestJoinChannel,
  requestLeaveChannel,
  socket,
} from '@components/Home/service';

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
  const useWatchList = useRequest(
    () => {
      return privateRequest(requestPist.get, API_PATH.PRIVATE_WATCHLIST_STOCK);
    },
    {
      manual: true,
      onSuccess: (res: any) => {
        console.log('🚀 ~ file: index.tsx:35 ~ ComponentWatchList ~ res:', res);
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

  const dataFormat = useMemo(() => {
    const findIndex = dataStock?.findIndex((item: any) => item.stockCode === dataSocket.sym);
    if (findIndex !== -1) {
      const data = dataStock[findIndex];
      dataStock[findIndex] = {
        ...data,
        ...dataSocket,
      };
    }
    if (page_size) {
      return dataStock?.slice(0, page_size);
    }

    return dataStock;
  }, [dataSocket, dataStock, page_size]);
  socket.on('public', (message: any) => {
    const data = message.data;
    if (data?.id === 3220) {
      setDataSocket(data);
    }
  });
  return (
    <>
      <div className='flex flex-col gap-y-[16px]'>
        {dataFormat?.map((item: IWatchListItem, index: number) => (
          <div
            key={index}
            className={classNames({
              'relative flex items-center justify-between rounded-[12px] border-b-[1px] border-solid border-[#EBEBEB] bg-[#ECECEC] p-[12px]':
                isEdit,
              'flex items-center justify-between rounded-[12px] p-[12px] tablet-max:bg-[#F7F6F8] desktop:rounded-none desktop:border-b-[1px] desktop:border-solid desktop:border-[#EBEBEB] desktop:px-0 desktop:py-[10px] ':
                !isEdit,
            })}
          >
            <ItemWatchList data={item} isEdit={isEdit} refresh={useWatchList.refresh} />
          </div>
        ))}
      </div>

      {props?.footer && props?.footer?.(dataFormat)}
    </>
  );
};
export default ComponentWatchList;
