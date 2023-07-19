import React from 'react';

import { useRequest } from 'ahooks';
import { toast } from 'react-hot-toast';

import { requestUnFollowUser } from '@components/Home/service';
import Notification from '@components/UI/Notification';

const useUnFollowUser = () => {
  return useRequest(
    (id: number) => {
      return requestUnFollowUser(id);
    },
    {
      manual: true,
      onError: (e: any) => {
        toast(() => <Notification type='error' message={e?.error} />);
      },
    },
  );
};
export default useUnFollowUser;
