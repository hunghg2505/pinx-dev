import { useRequest } from 'ahooks';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';
import request from 'umi-request';

import { UPDATE_USER_PROFILE } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import Notification from '@components/UI/Notification';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { useProfileInitial } from '@store/profile/useProfileInitial';

export const useUpdateUserProfile = () => {
  const { t } = useTranslation('editProfile');
  const [postDetailStatus, setPostDetailStatus] = useAtom(postDetailStatusAtom);
  const router = useRouter();
  const { run: requestGetUserProfile } = useProfileInitial();

  const { run, loading } = useRequest(
    async (update) => {
      return privateRequest(requestPist.put, UPDATE_USER_PROFILE, {
        data: update,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        router.back();
        setPostDetailStatus({ ...postDetailStatus, isChangeMyProfile: true });
        toast(() => <Notification type='success' message={t('upload_profile_success')} />);
        requestGetUserProfile();
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
