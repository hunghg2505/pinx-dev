import { PRIVATE_REPLY_COMMENT_V2 } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

export const requestReplyCommnet = (id: string, payload: any) => {
  return privateRequest(requestCommunity.post, PRIVATE_REPLY_COMMENT_V2(id), {
    data: payload,
  });
};
