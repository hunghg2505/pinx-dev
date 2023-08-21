import { useRequest } from 'ahooks';
import { useAtom } from 'jotai';

import { privateRequest, requestCommunity } from '@api/request';

import { profileSettingAtom } from './profileSetting';

export const useProfileSettingInitial = () => {
  const [, setProfileSetting] = useAtom(profileSettingAtom);

  const requestProfleSetting = useRequest(
    async () => {
      return privateRequest(requestCommunity.get, '/private/configuration/settings');
    },
    {
      onSuccess: (res) => {
        setProfileSetting((prev: any) => ({
          ...prev,
          ignore_vsd_validator: res?.data?.ignore_vsd_validator,
        }));
      },
      onError: () => {},
    },
  );
  return {
    requestProfleSetting,
  };
};
