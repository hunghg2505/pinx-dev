import React from 'react';

import { useRouter } from 'next/router';

import { useGetIsShareWatchList } from './checkMyShareWatchList';
import { useGetUerIsShareWatchList } from './checkUserShareWatchList';
import { useCheckWatchList } from './checkWatchList';
import ComponentWatchList from './ComponentWatchList';
import NotFound from './NotFound';
import NotLogin from './NotLogin';

const WatchList = () => {
  const router = useRouter();
  const { isShareWatchList } = useGetIsShareWatchList();
  const { isUserShareWatchList } = useGetUerIsShareWatchList(Number(router?.query?.id));
  const { watchList } = useCheckWatchList(Number(router?.query?.id));
  return (
    <>
      {(!isShareWatchList || !isUserShareWatchList || !watchList) && (
        <NotFound
          type={(() => {
            if (!isShareWatchList && isUserShareWatchList) {
              return 1;
            }
            if (isShareWatchList && !isUserShareWatchList) {
              return 2;
            }
            if (isShareWatchList && !isUserShareWatchList) {
              return 3;
            }
            return 3;
          })()}
        />
      )}
      {(!!isShareWatchList || !!isUserShareWatchList || !!watchList) && (
        <ComponentWatchList watchList={watchList} />
      )}
      <NotLogin />
    </>
  );
};
export default WatchList;
