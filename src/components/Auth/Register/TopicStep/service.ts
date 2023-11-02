import { useRequest } from 'ahooks';

import { PRIVATE_TOPIC_ALL, PRIVATE_TOPIC_SELECTED } from '@api/constant';
import { IOptions, privateRequest, requestPist } from '@api/request';

const requestGetSuggestTopic = async (limit?: number) => {
  return privateRequest(requestPist.get, PRIVATE_TOPIC_ALL(limit));
};

export const useSuggestTopic = () => {
  const { data, loading, run } = useRequest(
    async (limit?: number) => {
      return requestGetSuggestTopic(limit);
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
  return privateRequest(requestPist.post, PRIVATE_TOPIC_SELECTED, {
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
