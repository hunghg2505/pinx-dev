import { useRequest } from 'ahooks';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import Notification from '@components/UI/Notification';
import { ROUTE_PATH } from '@utils/common';

export const useUpdateUserProfile = () => {
  const { t } = useTranslation('editProfile');
  const router = useRouter();
  const { run, loading } = useRequest(
    async (update) => {
      return privateRequest(requestPist.put, API_PATH.UPDATE_USER_PROFILE, {
        data: update,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        toast(() => <Notification type='success' message={t('upload_profile_success')} />);
        router.push(ROUTE_PATH.MY_PROFILE);
      },
      onError: () => {
        toast(() => <Notification type='error' message={t('upload_profile_error')} />);
      },
    },
  );
  return {
    run,
    loading,
  };
};
