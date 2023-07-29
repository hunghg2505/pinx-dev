import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { ITopWatchingStock, useGetTopWatchingStock } from '@components/Explore/service';
import WatchingStock from '@components/Explore/WatchingStock';
import Text from '@components/UI/Text';

const TopWatching = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const onGoBack = () => {
    router.back();
  };
  const { listStock } = useGetTopWatchingStock();
  const maxTopWatchStock = listStock && Math.max(...listStock?.map((item: any) => item.totalCount));
  return (
    <div className='box-shadow card-style mb-10 rounded-[8px] bg-[#FFF] p-[10px] tablet:mt-[24px] tablet:p-[16px] desktop:mt-0'>
      <div className='relative mb-[16px] mt-[12px] h-[40px] text-center tablet:mt-0'>
        <img
          src='/static/icons/back_icon.svg'
          alt=''
          className='absolute top-1/2 w-[28px] -translate-y-1/2 cursor-pointer'
          onClick={onGoBack}
        />
        <Text
          type='body-20-semibold'
          color='neutral-1'
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        >
          {t('top.watching.title')}
        </Text>
      </div>

      <Text type='body-14-regular' color='neutral-black'>
        {t('top.watching.desc')}
      </Text>
      <div className='mt-[16px] flex flex-col flex-wrap gap-x-[14px] gap-y-[20px]'>
        {listStock?.map((item: ITopWatchingStock, index: number) => {
          return (
            <WatchingStock
              percen={(item.totalCount / maxTopWatchStock) * 100}
              key={`stock-${index}`}
              data={item}
            />
          );
        })}
      </div>
    </div>
  );
};
export default TopWatching;
