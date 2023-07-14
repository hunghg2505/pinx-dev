import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { IOptions, privateRequest, requestPist } from '@api/request';

export interface ResultSubscribedTheme {
  data: {
    code: string;
    name: string;
  }[];
}

const requestGetSuggestThemes = async () => {
  return await privateRequest(requestPist.get, API_PATH.PRIVATE_THEMES);
};

export const useSuggestThemes = () => {
  const { data, loading } = useRequest(async () => {
    return await requestGetSuggestThemes();
  });

  return {
    themes: data,
    loading,
  };
};

const requestSubscribeThemes = async (themes: string) => {
  return await privateRequest(requestPist.post, API_PATH.PRIVATE_THEME_SUBSCRIBE(themes));
};

export const useSubscribeThemes = (options: IOptions) => {
  const { data, loading, run } = useRequest(
    async (themes: string) => {
      return await requestSubscribeThemes(themes);
    },
    {
      manual: true,
      ...options,
    },
  );

  const onSubscribeThemes = (themes: string) => {
    run(themes);
  };

  return {
    themes: data,
    loading,
    onSubscribeThemes,
  };
};

const serviceGetSubscribedTheme = () => {
  return privateRequest(requestPist.get, API_PATH.PRIVATE_LIST_THEME_SUBSCRIBED);
};

export const useGetSubscribedTheme = (options: IOptions) => {
  const requestGetSubscribedTheme = useRequest(serviceGetSubscribedTheme, {
    manual: true,
    ...options,
  });

  return requestGetSubscribedTheme;
};

const serviceUnSubscribeTheme = (themeCodes: string) => {
  return privateRequest(requestPist.put, API_PATH.PRIVATE_UNFOLLOW_THEME, {
    params: {
      themeCodes,
    },
  });
};

export const useUnSubscribeTheme = () => {
  const requestUnSubscribeTheme = useRequest(serviceUnSubscribeTheme, {
    manual: true,
  });

  return requestUnSubscribeTheme;
};
