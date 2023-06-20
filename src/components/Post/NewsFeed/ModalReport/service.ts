import { API_PATH } from '@api/constant';
import { privateRequest, request } from '@api/request';

export enum TYPEREPORT {
  INAPPROPRIATE = 'INAPPROPRIATE',
  PROVOKE = 'PROVOKE',
  SPAM = 'SPAM',
  OTHER = 'OTHER',
}
export const requestReportPost = (postId: string, payload: any) => {
  return privateRequest(request.post, API_PATH.PRIVATE_MAPPING_REPORT_POST(postId), {
    data: payload,
  });
};
