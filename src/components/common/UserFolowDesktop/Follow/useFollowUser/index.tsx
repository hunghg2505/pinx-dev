import React, { useContext } from 'react';

import { useRequest } from 'ahooks';
import { toast } from 'react-hot-toast';

import { requestFollowUser } from '@components/Home/service';
import Notification from '@components/UI/Notification';

import { followContext } from '../..';

const useFollowUser = () => {
  const context = useContext(followContext);
  return useRequest(
    (id: number) => {
      return requestFollowUser(id);
    },
    {
      manual: true,
      onSuccess: context?.refresh,
      onError: (e: any) => {
        toast(() => <Notification type='error' message={e?.error} />);
      },
    },
  );
};
export default useFollowUser;
