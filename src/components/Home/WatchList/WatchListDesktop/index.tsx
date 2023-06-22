import { IWatchListItem, useGetWatchList } from '@components/Home/service';
import Text from '@components/UI/Text';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import Image from 'next/image';
import ItemStock from './ItemStock';

const WatchListDesktop = () => {
  const { watchList } = useGetWatchList();
  const data = watchList?.[0]?.stocks;
  return (
    <>
      {data?.map((item: IWatchListItem, index: number) => {
        return <ItemStock key={index} data={item} />;
      })}
    </>
  );
};
export default WatchListDesktop;
