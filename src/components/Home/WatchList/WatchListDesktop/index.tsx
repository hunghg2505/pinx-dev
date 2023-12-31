import React from 'react';

import { useRouter } from 'next/router';

import { IWatchListItem } from '@components/Home/service';
import Text from '@components/UI/Text';
import { WATCHLIST } from 'src/constant/route';

import ItemStock from './ItemStock';

interface IProps {
  dataStock: IWatchListItem[];
  findIndex: number;
}
const WatchListDesktop = (props: IProps) => {
  const router = useRouter();
  const { dataStock, findIndex } = props;
  return (
    <>
      {dataStock?.slice(0, 5)?.map((item: IWatchListItem, index: number) => {
        const isChangeStock = findIndex === index;
        return <ItemStock key={index} data={item} isChangeStock={isChangeStock} />;
      })}
      <div
        className='mt-[15px] flex h-[40px] w-full cursor-pointer flex-row items-center justify-center rounded-[5px] bg-[#F0F7FC]'
        onClick={() => router.push(WATCHLIST)}
      >
        <Text type='body-14-bold' color='primary-2'>
          View more
        </Text>
      </div>
    </>
  );
};
export default WatchListDesktop;
