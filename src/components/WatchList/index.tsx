import React, { useMemo } from 'react';

import dynamic from 'next/dynamic';
// import { useRouter } from 'next/router';

import { requestJoinChannel, requestLeaveChannel, socket } from '@components/Home/service';
import { Skeleton } from '@components/UI/Skeleton';
import Themes from '@components/WatchList/Themes';
// import { useResponsive } from '@hooks/useResponsive';

import { useGetInterest, useGetYourWatchList } from './service';
import WatchListSkeletonLoading from './YourWatchList/SkeletonLoading';

const YourWatchList = dynamic(() => import('@components/WatchList/YourWatchList'), {
  ssr: false,
  loading: () => (
    <div>
      <WatchListSkeletonLoading />
      <WatchListSkeletonLoading />
      <WatchListSkeletonLoading />
      <WatchListSkeletonLoading />
      <WatchListSkeletonLoading />
      <WatchListSkeletonLoading />
      <WatchListSkeletonLoading />
      <WatchListSkeletonLoading />
      <WatchListSkeletonLoading />
      <WatchListSkeletonLoading />
    </div>
  ),
});

const Interest = dynamic(() => import('@components/WatchList/Interest'), {
  ssr: false,
  loading: () => (
    <div className='mt-[16px] flex overflow-x-hidden'>
      <Skeleton
        width={112}
        height={172}
        rows={10}
        wrapClassName='!flex-row gap-x-[16px]'
        className='!rounded-[12px]'
      />
    </div>
  ),
});

const WatchList = () => {
  const [mounted, setMounted] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [watchlistId, setWatchlistId] = React.useState<number>();
  const [dataStock, setDataStock] = React.useState<any>([]);
  const [dataInterest, setDataInterest] = React.useState<any>([]);
  const [dataSocket, setDataSocket] = React.useState<any>({});

  // const router = useRouter();
  // const { isMobile } = useResponsive();
  // const onGoBack = () => {
  //   router.back();
  // };

  const { interestStock, refreshInterest, getInterest } = useGetInterest({
    manual: true,
    onSuccess: (res: any) => {
      const data = res?.data;
      setDataInterest(data);
      if (data) {
        for (const element of data) {
          requestJoinChannel(element.stockCode);
        }
      }
    },
  });
  const { yourWatchListStock, runYourWatchList, refreshYourWatchList, loadingYourWatchList } =
    useGetYourWatchList({
      onSuccess: (res) => {
        setDataStock(res?.data?.[0]?.stocks);
        setWatchlistId(res?.data?.[0]?.watchlistId);
        const data = res?.data?.[0]?.stocks;
        if (data) {
          for (const element of data) {
            requestJoinChannel(element.stockCode);
          }
        }
      },
    });

  React.useEffect(() => {
    runYourWatchList();
    getInterest();
    setMounted(true);
    return () => {
      if (dataStock) {
        for (const element of dataStock) {
          requestLeaveChannel(element.stockCode);
        }
      }
      if (dataInterest) {
        for (const element of dataInterest) {
          requestLeaveChannel(element.stockCode);
        }
      }
    };
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

    return { dataFormat: dataStock, isChangeStockPrice, findIndex };
  }, [dataStock, dataSocket]);
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

  // For Next.js 13, return jsx once the component is mounted
  if (!mounted) {
    return <></>;
  }

  return (
    <div className='desktop:px-[0] desktop:py-[0]'>
      <div className='box-shadow card-style flex flex-col gap-y-[32px]'>
        <div className='flex flex-col gap-y-[16px] desktop:gap-y-[20px]'>
          {/* {!isEdit && isMobile && (
            <img
              src='/static/icons/back_icon.svg'
              alt=''
              className='w-[28px] cursor-pointer'
              onClick={onGoBack}
            />
          )} */}

          <YourWatchList
            watchlistId={watchlistId}
            dataStock={dataFormat}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            yourWatchListStock={yourWatchListStock}
            refreshYourWatchList={refreshYourWatchList}
            loadingYourWatchList={loadingYourWatchList}
            refreshInterest={refreshInterest}
            setDataStock={setDataStock}
            isChangeStockPrice={isChangeStockPrice}
            findIndex={findIndex}
          />
        </div>
        <Interest
          isEdit={isEdit}
          interestStock={interestStock}
          refreshInterest={refreshInterest}
          refreshYourWatchList={refreshYourWatchList}
          totalStock={yourWatchListStock?.length || 0}
        />
        <Themes isEdit={isEdit} />
      </div>
    </div>
  );
};
export default WatchList;
