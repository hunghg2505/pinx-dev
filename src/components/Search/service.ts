import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { requestCommunity, requestPist, privateRequest } from '@api/request';
import { getAccessToken } from '@store/auth';

export const useGetCompany = (option = {}, size?: number) => {
  const { data, run } = useRequest(
    async (keyword: string, page?: number) => {
      const params = {
        keyword,
        page: page || 1,
        size: size || 10,
      };
      if (keyword) {
        return requestPist.get(API_PATH.PUBLIC_SEARCH_COMPANY, { params });
      }
      return [];
    },
    {
      manual: true,
      ...option,
    },
  );
  return {
    company: data?.data?.list,
    totalPage: data?.data?.totalPages,
    hasNext: data?.data?.hasNext,
    run,
  };
};

export const useGetPeople = (option = {}, size?: number) => {
  const { data, run, refresh } = useRequest(
    async (keyword: string, page?: number) => {
      const isLogin = !!getAccessToken();
      const params = {
        keyword,
        page: page || 1,
        size: size || 14,
      };
      const payload = {
        keyword,
        searchType: 'ALL',
      };
      if (keyword) {
        return isLogin
          ? privateRequest(requestPist.post, API_PATH.PRIVATE_SEARCH_PEOPLE, {
              data: payload,
            })
          : requestPist.get(API_PATH.PUBLIC_SEARCH_PEOPLE, { params });
      }
      return [];
    },
    {
      manual: true,
      ...option,
    },
  );
  return {
    people: data?.data?.list || data?.list,
    run,
    refresh,
  };
};

export const useGetPosts = (option = {}, size?: number) => {
  const { data, run, refresh } = useRequest(
    async (keyword: string, page?: number) => {
      const isLogin = !!getAccessToken();
      const params = {
        keyword,
        page: page || 1,
        size: size || 10,
      };
      const payload = {
        keyword,
      };
      if (keyword) {
        return isLogin
          ? privateRequest(requestCommunity.post, API_PATH.PRIVATE_SEARCH_POST, {
              data: payload,
            })
          : requestCommunity.get(API_PATH.PUBLIC_SEARCH_POST, { params });
      }
      return [];
    },
    {
      manual: true,
      ...option,
    },
  );
  return {
    posts: data?.data?.list,
    run,
    refresh,
  };
};

export const useGetNews = (option = {}, size?: number) => {
  const { data, run } = useRequest(
    async (keyword: string, page?: number) => {
      const params = {
        keyword,
        page: page || 1,
        size: size || 10,
      };
      if (keyword) {
        return requestCommunity.get(API_PATH.PUBLIC_SEARCH_NEWS, { params });
      }
      return [];
    },
    {
      manual: true,
      ...option,
    },
  );
  return {
    news: data?.data?.list,
    run,
  };
};
