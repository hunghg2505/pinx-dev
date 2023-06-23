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

const requestSelectTopic = async (topicCodes: string) => {
  return await privateRequest(requestPist.post, API_PATH.PRIVATE_TOPIC_SELECTED, {
    data: {
      topicCodes,
    },
  });
};

export const useSelectTopic = (options: IOptions) => {
  const { loading, run } = useRequest(
    async ({ topicCodes }: { topicCodes: string }) => {
      return requestSelectTopic(topicCodes);
    },
    {
      manual: true,
      ...options,
    },
  );

  const onSelectTopic = (topicCodes: string) => {
    run({
      topicCodes,
    });
  };

  return {
    loading,
    onSelectTopic,
  };
};
