import { PRIVATE_NEWFEED_LIST } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

export const requestGetList = (params: any) => {
  return privateRequest(requestCommunity.get, PRIVATE_NEWFEED_LIST, { params });
};
