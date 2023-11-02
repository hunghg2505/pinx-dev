// topic
export const PRIVATE_TOPIC_ALL = (limit?: number) =>
  limit ? `/private/topic/all?limit=${limit}` : '/private/topic/all';
export const PRIVATE_TOPIC_SELECTED = '/private/topic/selected';
