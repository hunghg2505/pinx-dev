import { PRIVATE_MAPPING_REPORT_POST } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

export enum TYPEREPORT {
  INAPPROPRIATE = 'INAPPROPRIATE',
  PROVOKE = 'PROVOKE',
  SPAM = 'SPAM',
  OTHER = 'OTHER',
}
export const serviceReportPost = (postId: string, payload: any) => {
  return privateRequest(requestCommunity.post, PRIVATE_MAPPING_REPORT_POST(postId), {
    data: payload,
  });
};
