import React, { useMemo } from 'react';

import { useRouter } from 'next/router';

import { useLogin } from '@store/auth/hydrateAuth';

import { useGetIsShareWatchList } from './checkMyShareWatchList';
import { useGetUerIsShareWatchList } from './checkUserShareWatchList';
import { useCheckWatchList } from './checkWatchList';
import ComponentWatchList from './ComponentWatchList';
import NotFound, { NotfoundMessage } from './NotFound';
import NotLogin from './NotLogin';

const WatchList = () => {
  const router = useRouter();
  const { profileSlug }: any = router.query;
  const userId = useMemo(() => {
    return profileSlug.split('-').pop();
  }, [profileSlug]);

  const { isShareWatchList } = useGetIsShareWatchList();
  const { isUserShareWatchList } = useGetUerIsShareWatchList(Number(userId));
  const { watchList } = useCheckWatchList(Number(userId));
  const { isLogin } = useLogin();

  if (isLogin) {
    if (
      isShareWatchList &&
      isUserShareWatchList &&
      Array.isArray(watchList) &&
      watchList.length > 0
    ) {
      return <ComponentWatchList watchList={watchList} />;
    }

    return (
      <NotFound
        type={(() => {
          if (!isShareWatchList) {
            return NotfoundMessage.USER_NOT_SHARE_WATCH_LIST;
          } else if (!isUserShareWatchList) {
            return NotfoundMessage.OTHER_USER_NOT_SHARE_WATCH_LIST;
          } else if (
            isShareWatchList &&
            isUserShareWatchList &&
            Array.isArray(watchList) &&
            watchList.length === 0
          ) {
            return NotfoundMessage.EMPTY_STOCK;
          }
        })()}
      />
    );
  }

  return (
    <>
      <NotFound type={NotfoundMessage.USER_NOT_LOGIN} />
      <NotLogin />
    </>
  );
};
export default WatchList;
