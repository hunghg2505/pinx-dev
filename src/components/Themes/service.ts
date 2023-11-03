import { useRequest } from 'ahooks';

import {
  PRIVATE_GET_THEME_DETAIL,
  PUBLIC_GET_THEME_DETAIL,
  PRIVATE_GET_ALL_CUSTOMER_SUBSCRIBE_THEME,
  PRIVATE_GET_COMMUNITY_THEME_DETAIL,
  SUGGESTION_PEOPLE,
  PRIVATE_GET_LIST_ACTIVITIES_THEME,
  PUBLIC_GET_LIST_ACTIVITIES,
  PUBLIC_GET_SUBSCRIBED_CUSTOMERS_THEME,
  PUBLIC_SEO_PAGE_V2,
  PUBLIC_GET_THEME_DETAIL_V2,
} from '@api/constant';
import {
  PREFIX_API_IP_COMMUNITY,
  privateRequest,
  requestCommunity,
  requestPist,
} from '@api/request';
import { ILatestSubscribe } from '@components/Home/service';
import { getAccessToken } from '@store/auth';

export enum TabsThemeDetailEnum {
  Community = 'Community',
  Activities = 'Activities',
  StockSymbols = 'StockSymbols',
}
export interface IStockTheme {
  ceil_price: number;
  change_price: number;
  change_price_percent: number;
  floor_price: number;
  last_price: number;
  ref_price: number;
  stock_code: string;
  stock_exchange: string;
  stock_name: string;
  change?: string;
  changePc?: string;
  lastPrice: number;
}
export interface IThemeDetail {
  bgImage: string;
  code: string;
  description: string;
  isSubsribed: boolean;
  latestSubscribe: ILatestSubscribe[];
  name: string;
  stockList: IStockTheme[];
  totalSubscribe: number;
  type: string;
  url: string;
}
export interface IUserTheme {
  avatar: string;
  customerId: number;
  displayName: string;
  email: string;
  isFeatureProfile: boolean;
  isKol: boolean;
  name: string;
  phoneNumber: string;
}
export const useGetThemeDetail = (code: any, option = {}) => {
  const { data, refresh, loading } = useRequest(
    () => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? privateRequest(requestPist.get, PRIVATE_GET_THEME_DETAIL(code))
        : requestPist.get(PUBLIC_GET_THEME_DETAIL(code));
    },
    {
      ...option,
    },
  );
  return {
    themeDetail: data?.data,
    refresh,
    loading,
  };
};

export const useGetCustomerTheme = (code: string) => {
  const { data, run } = useRequest(
    () => {
      return privateRequest(requestPist.get, PRIVATE_GET_ALL_CUSTOMER_SUBSCRIBE_THEME(code));
    },
    {
      manual: true,
    },
  );
  return {
    listUser: data?.data,
    run,
  };
};
const getAllCommunity = (code: string, page?: number, pageSize?: number) => {
  const params = {
    page: page || 1,
    pageSize: pageSize || 30,
  };

  return privateRequest(requestPist.get, PRIVATE_GET_COMMUNITY_THEME_DETAIL(code), {
    params,
  });
};
export const useGetCommunity = (code: string, option = {}) => {
  const requestGetCommunityModal = useRequest(
    (page?: number, pageSize?: number) => {
      return getAllCommunity(code, page, pageSize);
    },
    {
      manual: true,
      ...option,
    },
  );
  const onLoadmoreCommunity = async (d: any) => {
    try {
      const r: any = await requestGetCommunityModal.runAsync(d?.nextId ?? 1, 30);

      return {
        list: r?.data?.content,
        nextId: r?.data?.number < r?.data?.totalPages ? r?.data?.number + 1 : undefined,
      };
    } catch {}
  };
  return {
    community: requestGetCommunityModal?.data?.data,
    onLoadmoreCommunity,
    run: requestGetCommunityModal.run,
  };
};

export const useSuggestPeopleTheme = () => {
  const requestGetPeople = useRequest(
    async (last?: string) => {
      return privateRequest(requestCommunity.get, SUGGESTION_PEOPLE, {
        params: {
          last: last || '',
          limit: 20,
        },
      });
    },
    {
      manual: true,
    },
  );
  const onLoadmorePeople = async (d?: any) => {
    try {
      const r: any = await requestGetPeople.runAsync(d?.nextId ?? '');
      return {
        list: r?.list,
        nextId: r?.hasNext ? r?.last : undefined,
      };
    } catch {}
  };
  return {
    suggestionPeople: requestGetPeople?.data?.list,
    refreshList: requestGetPeople?.refresh,
    getSuggestFriend: requestGetPeople?.run,
    onLoadmorePeople,
  };
};

export const useGetListActivitiesTheme = (code: string, limit?: number) => {
  const params = {
    themeCode: code,
    limit: limit || 10,
  };
  const { data, run, refresh, loading } = useRequest(
    () => {
      const isLogin = !!getAccessToken();

      return isLogin
        ? privateRequest(requestCommunity.get, PRIVATE_GET_LIST_ACTIVITIES_THEME, {
            params,
          })
        : requestCommunity.get(PUBLIC_GET_LIST_ACTIVITIES(code));
    },
    {
      manual: true,
    },
  );
  return {
    activities: data?.data?.list,
    run,
    refresh,
    loading,
  };
};

export async function getCommunity(page: number, code: string): Promise<any> {
  const r = await requestPist.get(PUBLIC_GET_SUBSCRIBED_CUSTOMERS_THEME(code), {
    params: {
      page,
      pageSize: 10,
    },
  });
  const pageCommunity = r?.data?.first ? r?.data?.number + 2 : r?.data?.number + 1;
  return {
    list: r?.data?.content,
    page: r?.data?.last ? false : pageCommunity,
    totalElements: r?.data?.totalElements,
  };
}

export const fetchSeoDataFromServer = async (textSearch: string) => {
  // PREFIX_API_IP_COMMUNITY
  try {
    return fetch(`${PREFIX_API_IP_COMMUNITY}${PUBLIC_SEO_PAGE_V2(textSearch)}`).then((data: any) =>
      data.json(),
    );
  } catch {
    return {
      data: {},
    };
  }
};

export const fetchThemeDetailFromServer = async (code: string) => {
  // PREFIX_API_IP_COMMUNITY
  try {
    return fetch(`${PREFIX_API_IP_COMMUNITY}${PUBLIC_GET_THEME_DETAIL_V2(code)}`).then(
      (data: any) => data.json(),
    );
  } catch {
    return {
      data: {},
    };
  }
};
