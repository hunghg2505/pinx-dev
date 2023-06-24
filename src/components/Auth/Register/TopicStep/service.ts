import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { IOptions, privateRequest, requestPist } from '@api/request';

const requestGetSuggestTopic = async (limit?: number) => {
  return await privateRequest(requestPist.get, API_PATH.PRIVATE_TOPIC_ALL(limit));
};

export const useSuggestTopic = () => {
  const { data, loading, run } = useRequest(
    async (limit?: number) => {
      return await requestGetSuggestTopic(limit);
    },
    {
      manual: true,
    },
  );

  const getTopics = (limit?: number) => {
    run(limit);
  };

  return {
    topics: data,
    loading,
    getTopics,
  };
};

export const useSelectedTopics = (options: IOptions) => {
  const { loading, run } = useRequest(
    async ({ topicCodes }: { topicCodes: string }) => {
      return requestPist.post(API_PATH.PRIVATE_TOPIC_SELECTED, {
        data: {
          topicCodes,
        },
      });
    },
    {
      manual: true,
      ...options,
    },
  );

  const onSelectedTopics = (topicCodes: string) => {
    run({
      topicCodes,
    });
  };

  return {
    loading,
    onSelectedTopics,
  };
};
