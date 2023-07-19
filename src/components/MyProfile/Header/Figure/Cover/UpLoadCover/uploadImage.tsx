import { useRequest } from 'ahooks';
import { toast } from 'react-hot-toast';
import request from 'umi-request';

import Notification from '@components/UI/Notification';

export const useUploadImage = (UpLoadCover: (cover: any) => void) => {
  const { run, loading } = useRequest(
    (formData: any) => {
      return request.post(
        'https://static.pinetree.com.vn/cloud/internal/public/images/upload/pist?type=PIST_COMMUNITY',
        {
          data: formData,
        },
      );
    },
    {
      manual: true,
      onSuccess: (res: any) => {
        const url = res?.files?.[0]?.url;
        if (url) {
          UpLoadCover({
            coverImage: url,
          });
        } else {
          toast(() => <Notification type='error' message={res?.files?.[0]?.message} />);
        }
      },
    },
  );
  return { run, loading };
};
