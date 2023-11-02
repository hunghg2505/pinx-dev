import { PUCLIC_MAPPING_POST_DETAIL } from '@api/constant';
import { PREFIX_API_IP_COMMUNITY } from '@api/request';

export const fetchPostDetailFromServer = async (id: string) => {
  try {
    return fetch(`${PREFIX_API_IP_COMMUNITY}${PUCLIC_MAPPING_POST_DETAIL(id)}`).then((data: any) =>
      data.json(),
    );
  } catch {
    return {
      data: {},
    };
  }
};
