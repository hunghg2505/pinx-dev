import { PUBLIC_PINNED_POST } from '@api/constant';
import { PREFIX_API_IP_COMMUNITY } from '@api/request';

export const fetchPinedPostFromServer = async () => {
  try {
    return fetch(`${PREFIX_API_IP_COMMUNITY}${PUBLIC_PINNED_POST}`).then((data: any) =>
      data.json(),
    );
  } catch {
    return {
      data: [],
    };
  }
};
