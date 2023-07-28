import React, { useContext } from 'react';

import { useRequest } from 'ahooks';
import { toast } from 'react-hot-toast';

import { requestUnFollowUser } from '@components/Home/service';
import Notification from '@components/UI/Notification';

import { followContext } from '../../';

const useUnFollowUser = () => {
  const context = useContext<any>(followContext);
  return useRequest(
    (id: number) => {
      return requestUnFollowUser(id);
    },
    {
      manual: true,
      onSuccess: () => {
        context.setState((prev: any) => ({ ...prev, isFollowed: false }));
        context?.onUnFollow();
      },
      onError: (e: any) => {
        toast(() => <Notification type='error' message={e?.error} />);
      },
    },
  );
};
export default useUnFollowUser;
