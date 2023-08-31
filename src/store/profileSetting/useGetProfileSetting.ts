import { useRequest } from 'ahooks';
import { useAtom } from 'jotai';

import { privateRequest, requestCommunity } from '@api/request';

import { profileSettingAtom } from './profileSetting';

export const useProfileSettingInitial = () => {
  const [profileSetting, setProfileSetting] = useAtom(profileSettingAtom);

  const { run: requestProfleSetting } = useRequest(
    async () => {
      return privateRequest(requestCommunity.get, '/private/configuration/settings');
    },
    {
      onSuccess: (res) => {
        setProfileSetting({
          ...profileSetting,
          ignore_vsd_validator: res?.data?.ignore_vsd_validator,
        });
      },
    },
  );
  return {
    requestProfleSetting,
  };
};
