import Text from '@components/UI/Text';

import { ITrending, useGetTrending } from '../service';

export enum TYPETRENDING {
  STOCK = 'STOCK',
  ALL = 'ALL',
}
const Trending = () => {
  const { dataTrending } = useGetTrending();
  return (
    <>
      <Text type='body-16-bold' color='neutral-2' className='mb-4'>
        Trending
      </Text>
      <div className='flex flex-wrap gap-x-[18px] gap-y-[10px]'>
        {dataTrending
          .filter((item) => item.type !== TYPETRENDING.STOCK)
          .map((item: ITrending, index: number) => {
            return (
              <div
                className='inline-block rounded-[100px] border-[1px] border-solid border-[#C8E2F4] px-[10px] py-[6px]'
                key={index}
              >
                <Text type='body-14-medium' color='primary-2'>
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
