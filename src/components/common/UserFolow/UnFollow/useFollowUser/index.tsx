import React from 'react';

import { useRequest } from 'ahooks';
import { toast } from 'react-hot-toast';

import { requestFollowUser } from '@components/Home/service';
import Notification from '@components/UI/Notification';

const useFollowUser = () => {
  return useRequest(
    (id: number) => {
      return requestFollowUser(id);
    },
    {
      manual: true,
      onError: (e: any) => {
        toast(() => <Notification type='error' message={e?.error} />);
      },
    },
  );
};
export default useFollowUser;
