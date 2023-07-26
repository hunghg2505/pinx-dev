import { useRequest } from 'ahooks';
import { toast } from 'react-hot-toast';
import request from 'umi-request';

import Notification from '@components/UI/Notification';

export const useUploadImage = () => {
  const { run } = useRequest(
    async (formData: any, fieldName: string, setField: any) => {
      const res = await request.post(
        'https://static.pinetree.com.vn/cloud/internal/public/images/upload/pist?type=PIST_COMMUNITY',
        {
          data: formData,
        },
      );
      return { res, fieldName, setField };
    },
    {
      manual: true,
      onSuccess: (res: any) => {
        const url = res?.res?.files?.[0]?.url;
        if (url) {
          res.setField(url);
        } else {
          toast(() => <Notification type='error' message={res?.files?.[0]?.message} />);
        }
      },
      onError: (e: any) => {
        toast(() => <Notification type='error' message={e?.data?.error_description} />);
      },
    },
  );
  return { run };
};
