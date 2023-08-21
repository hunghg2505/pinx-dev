import React from 'react';

import { useTranslation } from 'next-i18next';

import { requestJoinChannel, requestLeaveChannel, socket } from '@components/Home/service';
import { IStockTheme, IThemeDetail } from '@components/Themes/service';
import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

import ItemStock from './ItemStock';

const SkeletonLoading = () => {
  return (
    <div className='flex h-[82px] items-center justify-between rounded-[12px] border border-solid border-[#F7F6F8] px-[12px]'>
      <div className='flex items-center'>
        <Skeleton avatar width={36} height={36} />

        <div className='ml-[10px] flex flex-col gap-y-[8px]'>
          <Skeleton height={15} round width={100} />
          <Skeleton height={15} round width={115} />
        </div>
      </div>

      <div className='flex flex-col gap-y-[8px]'>
        <Skeleton height={15} round width={100} wrapClassName='items-end' />
        <Skeleton height={15} round width={115} />
      </div>
    </div>
  );
};

const StockSymbols = ({ data, loading }: { data: IThemeDetail; loading?: boolean }) => {
  const { t } = useTranslation('theme');
  const stockList = React.useMemo(() => {
    if (data?.stockList) {
      return [...data?.stockList];
    }
    return [];
  }, [data]);
  // const stockList = data?.stockList && [...data?.stockList];
  const [dataSocket, setDataSocket] = React.useState<any>({});
  React.useEffect(() => {
    if (stockList) {
      for (const element of stockList) {
        requestJoinChannel(element.stock_code);
      }
    }
    return () => {
      if (stockList) {
        for (const element of stockList) {
          requestLeaveChannel(element.stock_code);
        }
      }
    };
  }, []);
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

  const findIndex = stockList?.findIndex((item: any) => item.stock_code === dataSocket.sym);
  if (stockList && findIndex !== -1) {
    const data = stockList[findIndex];
    stockList[findIndex] = {
      ...data,
      ...dataSocket,
    };
  }
  return (
    <>
      <Text
        type='body-20-semibold'
        color='neutral-black'
        className='mb-[16px] mt-[26px] block desktop:hidden'
      >
        {t('tab.stock_symbols')}
      </Text>
      <div className='flex flex-col gap-y-[16px] desktop:mt-[26px]'>
        {loading ? (
          <>
            <SkeletonLoading />
            <SkeletonLoading />
            <SkeletonLoading />
            <SkeletonLoading />
            <SkeletonLoading />
            <SkeletonLoading />
          </>
        ) : (
          stockList?.map((item: IStockTheme, index: number) => {
            const isChangeStock = findIndex === index;
            return <ItemStock key={index} data={item} isChangeStock={isChangeStock} />;
          })
        )}
      </div>
    </>
  );
};
export default StockSymbols;
