import React from 'react';

import { IWatchListItem } from '@components/Home/service';
import Text from '@components/UI/Text';

import ItemStock from './ItemStock';

interface IProps {
  dataStock: IWatchListItem[];
}
const WatchListDesktop = (props: IProps) => {
  const { dataStock } = props;
  return (
    <>
      {dataStock?.slice(0, 5)?.map((item: IWatchListItem, index: number) => {
        return <ItemStock key={index} data={item} />;
      })}
      <div className='mt-[15px] flex h-[40px] w-full flex-row items-center justify-center rounded-[5px] bg-[#F0F7FC]'>
        <Text type='body-14-bold' color='primary-2'>
          View more
        </Text>
      </div>
    </>
  );
};
export default WatchListDesktop;