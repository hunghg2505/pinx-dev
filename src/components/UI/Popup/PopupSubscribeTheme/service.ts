import { useRequest } from 'ahooks';

import { PRIVATE_SHARE_THEME_ACTIVITY } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IBodyShareThemeActivity {
  action: string;
  message: string;
  themeCode: string;
  themeName: string;
}

const serviceShareThemeActivity = async (values: IBodyShareThemeActivity) => {
  return privateRequest(requestCommunity.post, PRIVATE_SHARE_THEME_ACTIVITY, {
    data: values,
  });
};

export const useShareThemeActivity = (options: IOptionsRequest) => {
  const requestShareThemeActivity = useRequest(serviceShareThemeActivity, {
    manual: true,
    ...options,
  });

  return requestShareThemeActivity;
};
