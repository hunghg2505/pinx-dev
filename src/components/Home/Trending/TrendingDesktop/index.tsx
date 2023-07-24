import { ITrending, useGetTrending } from '@components/Home/service';
import SkeletonLoading from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

const TrendingDesktop = () => {
  const { dataTrending, loading } = useGetTrending();

  if (loading) {
    return (
      <>
        <div className='mb-[25px] h-[496px] w-full rounded-[8px] bg-[#fff]  px-[30x] py-[20px]  [box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
          <SkeletonLoading hiddenImg={false} />
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
