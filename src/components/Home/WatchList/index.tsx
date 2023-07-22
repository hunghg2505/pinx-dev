import React from 'react';

import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';
import Slider from 'react-slick';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

import ItemStock from './ItemStock';
import WatchListDesktop from './WatchListDesktop';
import { IWatchListItem, requestJoinChannel, requestLeaveChannel, socket } from '../service';

const WatchList = () => {
  const router = useRouter();
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
  if (findIndex && findIndex !== -1) {
    const data = dataStock[findIndex];
    dataStock[findIndex] = {
      ...data,
      ...dataSocket,
    };
  }
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    // autoplay: true,
    // autoplaySpeed: 1000,
  };
  const onAddStock = () => {
    router.push(ROUTE_PATH.REGISTER_COMPANY);
  };
  return (
    <>
      <div className='mt-[22px] h-[179px] justify-center overflow-hidden mobile:block tablet:hidden'>
        {dataStock?.length > 0 ? (
          <div>
            <Slider
              {...settings}
              className='mx-[auto] my-[0] flex w-[calc(100%_-_32px)]'
              variableWidth
            >
              {dataStock?.slice(0, 5).map((item: IWatchListItem, index: number) => {
                return <ItemStock key={index} data={item} />;
              })}
            </Slider>
          </div>
        ) : (
          <div
            className='mx-[auto] flex h-[160px] w-[104px] flex-col items-center rounded-[12px] border-[1px] border-dashed border-[#589DC0] bg-[#FFF] [box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'
            onClick={onAddStock}
          >
            <img
              src='/static/icons/iconAddStock.svg'
              alt=''
              width={0}
              height={0}
              sizes='100vw'
              className='mb-[24px] mt-[48px] h-[38px] w-[38px]'
            />
            <Text type='body-14-bold' color='primary-1' className='text-center'>
              Add favorite stock
            </Text>
          </div>
        )}
      </div>
      <div className='mobile:hidden tablet:block'>
        {dataStock?.length > 0 ? (
          <WatchListDesktop dataStock={dataStock} />
        ) : (
          <div
            className='mx-[auto] flex h-[68px] w-full cursor-pointer items-center justify-center rounded-[12px] border-[1px] border-dashed border-[#589DC0] bg-[#FFF] [box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'
            onClick={onAddStock}
          >
            <img
              src='/static/icons/iconAddStock.svg'
              alt=''
              width={0}
              height={0}
              sizes='100vw'
              className='mr-[12px] h-[36px] w-[36px]'
            />
            <Text type='body-14-bold' color='primary-1' className='text-center'>
              Add favorite stock
            </Text>
          </div>
        )}
      </div>
    </>
  );
};
export default WatchList;
