import React from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { ITopWatchingStock, useGetTopMentionStock } from '@components/Explore/service';
import WatchingStock from '@components/Explore/WatchingStock';
import Text from '@components/UI/Text';

const TopMention = () => {
  const { t } = useTranslation('common');
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
          {t('top.mention.title')}
        </Text>
      </div>
      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9] tablet:w-[calc(100%+48px)] tablet:-translate-x-[24px]'></div>
      <Text type='body-14-regular' color='neutral-black'>
        {t('top.mention.desc')}
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
