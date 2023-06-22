import { IWatchListItem, useGetWatchList } from '@components/Home/service';

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
