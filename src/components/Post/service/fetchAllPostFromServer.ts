import { PUBLIC_MAPPING_SITE_MAP } from '@api/constant';
import { PREFIX_API_IP_COMMUNITY } from '@api/request';

export const fetchAllPostFromServer = async () => {
  try {
    return fetch(`${PREFIX_API_IP_COMMUNITY}${PUBLIC_MAPPING_SITE_MAP}`).then((data: any) =>
      data.json(),
    );
  } catch {
    return {
      data: {},
    };
  }
};
