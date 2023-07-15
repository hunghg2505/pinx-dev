/* eslint-disable require-await */
import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { requestPist, privateRequest } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

const serviceGetSetting = async (key: string) => {
  return privateRequest(requestPist.get, API_PATH.GET_CUSTOMER_SETTING, {
    params: {
      key
    }
  });
};

export const useGetSetting = (key: string, options?: IOptionsRequest) => {
  const requestGetSetting = useRequest(
    async () => {
      return await serviceGetSetting(key);
    }, {
    ...options,
  });

  return requestGetSetting;
};

const serviceGetSettings = async () => {
  return privateRequest(requestPist.get, API_PATH.GET_CUSTOMER_ALL_SETTINGS);
};

export const useGetSettings = (options?: IOptionsRequest) => {
  const requestGetSettings = useRequest(serviceGetSettings, {
    ...options,
  });

  return requestGetSettings;
};


const serviceUpdateSetting = async (key: string, value: string) => {
  return privateRequest(requestPist.post, API_PATH.GET_CUSTOMER_SETTING, {
    params: {
      key,
      value
    }
  });
};

export const useUpdateSetting = (options?: IOptionsRequest) => {
  const requestUpdateSetting = useRequest(serviceUpdateSetting, {
    manual: true,
    ...options,
  });

  return requestUpdateSetting;
};

