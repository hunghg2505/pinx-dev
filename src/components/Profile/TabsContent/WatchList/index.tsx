import React from 'react';

import { useRouter } from 'next/router';

import { useAuth } from '@store/auth/useAuth';

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
  const { isLogin } = useAuth();
  return (
    <>
      {(!isShareWatchList || !isUserShareWatchList || !watchList || watchList?.length === 0) && (
        <NotFound
          type={(() => {
            if (isShareWatchList && isUserShareWatchList && watchList?.length === 0) {
              return 1;
            } else if (isShareWatchList === '0') {
              return 2;
            } else if (!isUserShareWatchList) {
              return 3;
            } else if (isLogin) {
              return 1;
            } else {
              return 4;
            }
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
