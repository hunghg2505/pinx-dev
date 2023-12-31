import { useRequest } from 'ahooks';

import {
  PRIVATE_SEARCH_SEO_SUGGEST,
  PUBLIC_SEARCH_SEO_SUGGEST,
  PRIVATE_SEARCH_SEO_CREATE,
  PUBLIC_SEARCH_SEO_RESULT,
  PRIVATE_SEARCH_SEO_RESULT,
  PRIVATE_SEARCH_SEO_MEDIA_V2,
  PUBLIC_SEARCH_SEO_MEDIA_V2,
  PUBLIC_SEARCH_SEO_CREATE,
  PRIVATE_SEARCH_SEO_COMPANY_V2,
  PUBLIC_SEARCH_SEO_COMPANY_V2,
  PRIVATE_SEARCH_SEO_PEOPLE_V2,
  PUBLIC_SEARCH_SEO_PEOPLE_V2,
  PRIVATE_SEARCH_POST,
  PUBLIC_SEARCH_POST,
  PRIVATE_SEARCH_NEWS,
  PUBLIC_SEARCH_NEWS,
} from '@api/constant';
import { PREFIX_API_IP_COMMUNITY, privateRequest, requestCommunity } from '@api/request';
import { ICustomerInfo } from '@components/Post/service';
import { IStock } from '@components/Stock/type';
import { getAccessToken } from '@store/auth';

interface IOptions {
  onSuccess?: (res: any, params?: any) => void;
  onError?: (error: any) => void;
}

export const useGetSearchRecent = (options?: IOptions) => {
  const params = {
    textSearch: '',
    type: '',
    page: 0,
    pageSize: 10,
  };
  const { data, run, refresh, loading } = useRequest(
    () => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? privateRequest(requestCommunity.get, PRIVATE_SEARCH_SEO_SUGGEST, { params })
        : requestCommunity.get(PUBLIC_SEARCH_SEO_SUGGEST, { params });
    },
    {
      manual: true,
      ...options,
    },
  );
  return {
    listRecent: data?.data,
    runRecent: run,
    refreshSearchRecent: refresh,
    loadingSearchRecent: loading,
  };
};

export const useCreateSearch = (options?: IOptions) => {
  const initPayloads = {
    link: '',
    postId: [],
    stockCode: [],
    themeId: [],
    typeSearch: 'ALL',
  };
  const { run } = useRequest(
    (textSearch) => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? privateRequest(requestCommunity.post, PRIVATE_SEARCH_SEO_CREATE, {
            data: { ...initPayloads, ...textSearch },
          })
        : requestCommunity.post(PUBLIC_SEARCH_SEO_CREATE, {
            data: { ...initPayloads, ...textSearch },
          });
    },
    {
      manual: true,
      ...options,
    },
  );
  return {
    run,
  };
};

export const useSearchPublic = (options?: IOptions) => {
  const initParam = {
    textSearch: '',
    type: '',
    page: 0,
    pageSize: 10,
  };
  const { data, run, loading, refresh, mutate } = useRequest(
    (params) => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? privateRequest(requestCommunity.get, PRIVATE_SEARCH_SEO_RESULT, {
            params: { ...initParam, ...params },
          })
        : requestCommunity.get(PUBLIC_SEARCH_SEO_RESULT, {
            params: { ...initParam, ...params },
          });
    },
    {
      manual: true,
      // cacheKey: 'search-seo',
      staleTime: -1,
      ...options,
    },
  );
  return {
    data,
    run,
    loading,
    refresh,
    mutate,
  };
};
export const useSearchPublicPage = (options?: IOptions) => {
  const initParam = {
    textSearch: '',
    type: '',
    page: 0,
    pageSize: 10,
  };
  const { data, run, loading, refresh, mutate } = useRequest(
    (params) => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? privateRequest(requestCommunity.get, PRIVATE_SEARCH_SEO_RESULT, {
            params: { ...initParam, ...params },
          })
        : requestCommunity.get(PUBLIC_SEARCH_SEO_RESULT, {
            params: { ...initParam, ...params },
          });
    },
    {
      manual: true,
      cacheKey: 'search-seo-page',
      staleTime: -1,
      ...options,
    },
  );
  return {
    data,
    run,
    loading,
    refresh,
    mutate,
  };
};

interface paramsSearch {
  textSearch?: string;
  keyword?: string;
  page?: number;
  last?: string;
}

export interface ResponseSearchCompany {
  data: {
    list: IStock[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
    hasNext: boolean;
  };
}

export const useSearchCompany = (options?: object) => {
  const { data, loading, run } = useRequest(
    (params?: paramsSearch) => {
      const isLogin = !!getAccessToken();

      return isLogin
        ? privateRequest(requestCommunity.get, PRIVATE_SEARCH_SEO_COMPANY_V2, {
            params,
          })
        : requestCommunity.get(PUBLIC_SEARCH_SEO_COMPANY_V2, {
            params,
          });
    },
    {
      ...options,
    },
  );

  return {
    data,
    loading,
    run,
  };
};

export interface ResponseSearchPeople {
  data: {
    list: ICustomerInfo[];
    totalElements: number;
    totalPages: number;
    pageSize: number;
    pageNumber: number;
    isLast: boolean;
  };
}

export const useSearchPeople = (options?: object) => {
  const { data, loading, run } = useRequest(
    (params?: paramsSearch) => {
      const isLogin = !!getAccessToken();

      return isLogin
        ? privateRequest(requestCommunity.get, PRIVATE_SEARCH_SEO_PEOPLE_V2, {
            params,
          })
        : requestCommunity.get(PUBLIC_SEARCH_SEO_PEOPLE_V2, {
            params,
          });
    },
    {
      ...options,
    },
  );

  return {
    data,
    loading,
    run,
  };
};

export interface ResponseSearchPost {
  data: {
    list: any[];
    last: string;
    hasNext: boolean;
  };
}
export const useSearchPost = (options?: object) => {
  const requestSearchPost = useRequest(
    (params?: paramsSearch) => {
      const isLogin = !!getAccessToken();

      return isLogin
        ? privateRequest(requestCommunity.post, PRIVATE_SEARCH_POST, {
            data: {
              keyword: params?.keyword,
            },
            params: {
              last: params?.last,
            },
          })
        : requestCommunity.get(PUBLIC_SEARCH_POST, {
            params,
          });
    },
    {
      ...options,
    },
  );

  return requestSearchPost;
};

export const useSearchNews = (options?: object) => {
  const requestSearchPost = useRequest(
    (params?: paramsSearch) => {
      const isLogin = !!getAccessToken();

      return isLogin
        ? privateRequest(requestCommunity.post, PRIVATE_SEARCH_NEWS, {
            data: {
              keyword: params?.keyword,
            },
            params: {
              last: params?.last,
            },
          })
        : requestCommunity.get(PUBLIC_SEARCH_NEWS, {
            params,
          });
    },
    {
      ...options,
    },
  );

  return requestSearchPost;
};

export interface ResponseSearchMedia {
  data: {
    list: any[];
    totalElements: number;
    totalPages: number;
    pageSize: number;
    pageNumber: number;
    isLast: boolean;
  };
}

export const useSearchMedia = (options?: object) => {
  const requestSearchPost = useRequest(
    (params?: paramsSearch) => {
      const isLogin = !!getAccessToken();

      return isLogin
        ? privateRequest(requestCommunity.get, PRIVATE_SEARCH_SEO_MEDIA_V2, {
            params,
          })
        : requestCommunity.get(PUBLIC_SEARCH_SEO_MEDIA_V2, {
            params,
          });
    },
    {
      ...options,
    },
  );

  return requestSearchPost;
};

export const createSearchSeoFromServer = async (textSearch: string) => {
  try {
    return fetch(`${PREFIX_API_IP_COMMUNITY}${PUBLIC_SEARCH_SEO_CREATE}`, {
      method: 'POST',
      body: JSON.stringify({
        textSearch,
        link: '',
        postId: [''],
        stockCode: [''],
        themeId: [''],
        typeSearch: 'ALL',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((data: any) => data.json());
  } catch {}
};
