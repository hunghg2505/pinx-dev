import React from 'react';

import { useRequest } from 'ahooks';

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
}
const ComponentWatchList = (props: IProps) => {
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
          for (const element of data) {
            requestJoinChannel(element.stockCode);
          }
        }
      },
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
  const [dataSocket, setDataSocket] = React.useState<any>({});

  socket.on('public', (message: any) => {
    const data = message.data;
    if (data?.id === 3220) {
      setDataSocket(data);
    }
  });
  const findIndex = dataStock?.findIndex((item: any) => item.stockCode === dataSocket.sym);
  if (findIndex !== -1) {
    const data = dataStock[findIndex];
    dataStock[findIndex] = {
      ...data,
      ...dataSocket,
    };
  }
  return (
    <>
      <div className='flex flex-col gap-y-[16px]'>
        {dataStock.map((item: IWatchListItem, index: number) => (
          <div
            key={index}
            className='flex items-center justify-between rounded-[12px] p-[12px] tablet-max:bg-[#F7F6F8] desktop:rounded-none desktop:border-b-[1px] desktop:border-solid desktop:border-[#EBEBEB] desktop:px-0 desktop:py-[10px]'
          >
            <ItemWatchList data={item} isEdit={isEdit} refresh={useWatchList.refresh} />
          </div>
        ))}
      </div>
    </>
  );
};
export default ComponentWatchList;
