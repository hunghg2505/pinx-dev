import { useRequest } from 'ahooks';

import {
  PRIVATE_THEMES,
  PRIVATE_THEME_SUBSCRIBE,
  PRIVATE_LIST_THEME_SUBSCRIBED,
  PRIVATE_UNFOLLOW_THEME,
} from '@api/constant';
import { IOptions, privateRequest, requestPist } from '@api/request';

export interface ResultSubscribedTheme {
  data: {
    code: string;
    name: string;
  }[];
}

const requestGetSuggestThemes = async () => {
  return privateRequest(requestPist.get, PRIVATE_THEMES);
};

export const useSuggestThemes = () => {
  const { data, loading } = useRequest(async () => {
    return requestGetSuggestThemes();
  });

  return {
    themes: data,
    loading,
  };
};

const requestSubscribeThemes = async (themes: string) => {
  return privateRequest(requestPist.post, PRIVATE_THEME_SUBSCRIBE(themes));
};

export const useSubscribeThemes = (options: IOptions) => {
  const { data, loading, run } = useRequest(
    async (themes: string) => {
      return requestSubscribeThemes(themes);
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
  return privateRequest(requestPist.get, PRIVATE_LIST_THEME_SUBSCRIBED);
};

export const useGetSubscribedTheme = (options: IOptions) => {
  const requestGetSubscribedTheme = useRequest(serviceGetSubscribedTheme, {
    manual: true,
    ...options,
  });

  return requestGetSubscribedTheme;
};

const serviceUnSubscribeTheme = (themeCodes: string) => {
  return privateRequest(requestPist.put, PRIVATE_UNFOLLOW_THEME, {
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
