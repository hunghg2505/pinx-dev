import React from 'react';

import { useRouter } from 'next/router';

import { ITopWatchingStock, useGetTopMentionStock } from '@components/Explore/service';
import WatchingStock from '@components/Explore/WatchingStock';
import Text from '@components/UI/Text';

const TopMention = () => {
  const router = useRouter();
  const onGoBack = () => {
    router.back();
  };
  const { listMention } = useGetTopMentionStock();
  const maxTopMentionStock =
    listMention && Math.max(...listMention?.map((item: any) => item.totalCount));
  return (
    <div className='rounded-[8px] bg-[#FFF] px-[24px] py-[20px] tablet-max:px-[0]'>
      <div className='relative text-center'>
        <img
          src='/static/icons/back_icon.svg'
          alt=''
          className='absolute left-0 top-0 w-[28px] cursor-pointer'
          onClick={onGoBack}
        />
        <Text type='body-20-semibold' color='neutral-1' className=''>
          Top mention stock
        </Text>
      </div>
      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
      <Text type='body-14-regular' color='neutral-black'>
        Top most mentioned stocks on PineX
      </Text>
      <div className=' mt-[16px] flex flex-col flex-wrap gap-x-[14px] gap-y-[20px]'>
        {listMention?.map((item: ITopWatchingStock, index: number) => {
          return (
            <WatchingStock
              percen={(item.totalCount / maxTopMentionStock) * 100}
              key={`stock-${index}`}
              data={item}
              mention
            />
          );
        })}
      </div>
    </div>
  );
};
export default TopMention;
