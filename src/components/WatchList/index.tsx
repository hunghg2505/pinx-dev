import React from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Themes from '@components/WatchList/Themes';
// @ts-ignore
import YourWatchList from '@components/WatchList/YourWatchList';
import { useResponsive } from '@hooks/useResponsive';

import { useGetInterest, useGetYourWatchList } from './service';

const Interest = dynamic(() => import('@components/WatchList/Interest'), {
  ssr: false,
});

const WatchList = () => {
  const [mounted, setMounted] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [watchlistId, setWatchlistId] = React.useState<number>();
  const [dataStock, setDataStock] = React.useState<any>([]);
  const router = useRouter();
  const { isMobile } = useResponsive();
  const onGoBack = () => {
    router.back();
  };

  const { interestStock, refreshInterest } = useGetInterest();
  const { yourWatchListStock, runYourWatchList, refreshYourWatchList, loadingYourWatchList } =
    useGetYourWatchList({
      onSuccess: (res) => {
        setDataStock(res?.data?.[0]?.stocks);
        setWatchlistId(res?.data?.[0]?.watchlistId);
      },
    });

  React.useEffect(() => {
    runYourWatchList();
    setMounted(true);
  }, []);

  // For Next.js 13, return jsx once the component is mounted
  if (!mounted) {
    return <></>;
  }

  return (
    <div className='px-[10px] py-[10px] desktop:px-[0] desktop:py-[0]'>
      <div className='box-shadow card-style'>
        <div className='flex flex-col gap-y-[16px] desktop:gap-y-[20px]'>
          {!isEdit && isMobile && (
            <img
              src='/static/icons/back_icon.svg'
              alt=''
              className='w-[28px] cursor-pointer'
              onClick={onGoBack}
            />
          )}

          <YourWatchList
            watchlistId={watchlistId}
            dataStock={dataStock}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            yourWatchListStock={yourWatchListStock}
            refreshYourWatchList={refreshYourWatchList}
            loadingYourWatchList={loadingYourWatchList}
            refreshInterest={refreshInterest}
            setDataStock={setDataStock}
          />
        </div>
        <Interest
          isEdit={isEdit}
          interestStock={interestStock}
          refreshInterest={refreshInterest}
          refreshYourWatchList={refreshYourWatchList}
        />
        <Themes isEdit={isEdit} />
      </div>
    </div>
  );
};
export default WatchList;
