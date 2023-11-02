import request from 'umi-request';

import { IResponseTotalShare } from '@components/Post/service/type';

// total share of post
export const getTotalSharePost = (url: string): Promise<IResponseTotalShare> => {
  const API_URL = 'https://count-server.sharethis.com/v2.0/get_counts?url=';
  return request.get(API_URL + url);
};
