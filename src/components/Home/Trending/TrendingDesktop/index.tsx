import { ITrending, useGetTrending } from '@components/Home/service';
import Text from '@components/UI/Text';

import TrendingDesktopLoading from './Skeleton';

const TrendingDesktop = () => {
  const { dataTrending, loading } = useGetTrending({
    staleTime: -1,
    cacheKey: 'data-trending',
  });

  if (loading) {
    return (
      <>
        <div className='mb-[25px] h-[200px] w-full rounded-[8px] bg-[#fff]  px-[30x] py-[20px] '>
          <TrendingDesktopLoading />
          <TrendingDesktopLoading />
          <TrendingDesktopLoading />
          <TrendingDesktopLoading />
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        {dataTrending?.map((item: ITrending, index: number) => {
          return (
            <div
              className='item flex items-center py-[10px] [border-bottom:1px_solid_#ECECEC] last:border-none'
              key={index}
            >
              <div className='mr-[10px] flex h-[36px] w-[36px] flex-row items-center justify-center rounded-full border-[1px] border-solid border-[#F0F7FC]'>
                <Text type='body-12-bold' color='primary-2'>
                  {index < 8 ? `0${index + 1}` : `${index + 1}`}
                </Text>
              </div>
              <Text type='body-14-regular' color='primary-2'>
                #{item.keyword}
              </Text>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default TrendingDesktop;
