import { API_PATH } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

export enum TYPEREPORT {
  INAPPROPRIATE = 'INAPPROPRIATE',
  PROVOKE = 'PROVOKE',
  SPAM = 'SPAM',
  OTHER = 'OTHER',
}
export const requestReportPost = (postId: string, payload: any) => {
  return privateRequest(requestCommunity.post, API_PATH.PRIVATE_REPORT_COMMENT(postId), {
    data: payload,
  });
};
