import { useRequest } from 'ahooks';

import { SUGGESTION_PEOPLE } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

export const useSuggestPeople = (options = {}) => {
  const { data, refresh, run, loading } = useRequest(
    () => {
      return privateRequest(requestCommunity.get, SUGGESTION_PEOPLE);
    },
    {
      manual: true,
      ...options,
      loadingDelay: 300,
    },
  );
  return {
    suggestionPeople: data?.list,
    refreshList: refresh,
    getSuggestFriend: run,
    loading,
  };
};
