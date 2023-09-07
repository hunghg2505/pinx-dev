import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

import TrendingSkeleton from './Skeleton';
import { ITrending, useGetTrending } from '../service';

export enum TYPETRENDING {
  STOCK = 'STOCK',
  ALL = 'ALL',
}
const Trending = () => {
  const { t } = useTranslation();
  const { dataTrending, loading } = useGetTrending();
  const router = useRouter();
  return (
    <>
      <Text type='body-16-bold' color='neutral-2' className='mb-4'>
        {t('trending')}
      </Text>
      <div className='flex flex-wrap gap-x-[18px] gap-y-[10px]'>
        {loading && (
          <>
            <TrendingSkeleton />
            <TrendingSkeleton />
            <TrendingSkeleton />
            <TrendingSkeleton />
            <TrendingSkeleton />
            <TrendingSkeleton />
            <TrendingSkeleton />
          </>
        )}

        {dataTrending
          ?.filter((item: ITrending) => item.type !== TYPETRENDING.STOCK)
          ?.slice(0, 5)
          .map((item: ITrending, index: number) => {
            return (
              <div
                className='inline-block rounded-[100px] border-[1px] border-solid border-[#C8E2F4] px-[10px] py-[6px]'
                key={index}
              >
                <Text
                  onClick={() => router.push(`${ROUTE_PATH.SEARCHSEO}?keyword=${item.keyword}`)}
                  type='body-14-medium'
                  className='cursor-pointer'
                  color='primary-2'
                >
                  #{item.keyword}
                </Text>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Trending;
