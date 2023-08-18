import { useRequest } from 'ahooks';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';
import request from 'umi-request';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import Notification from '@components/UI/Notification';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';

export const useUpdateUserProfile = () => {
  const { t } = useTranslation('editProfile');
  const [postDetailStatus, setPostDetailStatus] = useAtom(postDetailStatusAtom);
  const router = useRouter();
  const { setUserLoginInfo } = useUserLoginInfo();

  const { run, loading } = useRequest(
    async (update) => {
      return privateRequest(requestPist.put, API_PATH.UPDATE_USER_PROFILE, {
        data: update,
      });
    },
    {
      manual: true,
      onSuccess: (_, params: any) => {
        console.log('xxx params', params);
        router.back();
        setPostDetailStatus({ ...postDetailStatus, isChangeMyProfile: true });
        toast(() => <Notification type='success' message={t('upload_profile_success')} />);
        setUserLoginInfo(prev => ({
          ...prev,
          displayName: params[0].displayName
        }));
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

export const useUploadImage = (UpLoadCover: (cover: any) => void) => {
  const { run, loading } = useRequest(
    async (formData: any, values?: any) => {
      const res = await request.post(
        'https://static.pinetree.com.vn/cloud/internal/public/images/upload/pist?type=PIST_COMMUNITY',
        {
          data: formData,
        },
      );
      return { res, values };
    },
    {
      manual: true,
      onSuccess: (res: any) => {
        const url = res?.res?.files?.[0]?.url;
        if (url) {
          UpLoadCover({
            ...res.values,
            avatar: url,
          });
        } else {
          toast(() => <Notification type='error' message={res?.files?.[0]?.message} />);
        }
      },
      onError: (e: any) => {
        toast(() => <Notification type='error' message={e?.data?.error_description} />);
      },
    },
  );
  return { run, loading };
};
