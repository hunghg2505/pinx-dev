import { useRequest } from 'ahooks';

import { PRIVATE_DELETE_COMMENT, PRIVATE_DELETE_POST } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

// hide comment
export const requestHideComment = (id: string) => {
  return privateRequest(requestCommunity.delete, PRIVATE_DELETE_COMMENT(id));
};

export const useDeletePost = (option = {}) => {
  const { run } = useRequest(
    (id: string) => {
      return privateRequest(requestCommunity.delete, PRIVATE_DELETE_POST(id));
    },
    {
      manual: true,
      ...option,
    },
  );
  return {
    run,
  };
};
