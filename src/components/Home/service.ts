import { useRequest } from 'ahooks';
import io from 'socket.io-client';

import { API_PATH } from '@api/constant';
import { PREFIX_API_MARKET, privateRequest, requestCommunity, requestPist } from '@api/request';
import { getAccessToken } from '@store/auth';
import { ENV } from '@utils/env';

export interface ITrending {
  keyword: string;
  type: string;
  numberHit: number;
}
export interface IKOL {
  id: number;
  position: string;
  name: string;
  avatar: string;
  coverImage: string;
  caption: string;
  isKol: boolean;
  isFollowed: boolean;
  hasSyncContact: boolean;
  state: any;
  fcmToken: any;
  kolPoint: number;
  displayName: string;
  createdAt: string;
  updatedAt: string;
  isFeatureProfile: boolean;
  totalFollower: number;
  totalFollowing: number;
  latestFollowers: any;
  fullDes: string;
  open: any;
  createdAtStr: string;
}

export interface ISuggestionPeople {
  avatar: string;
  customerId: number;
  displayName: string;
  id: number;
  isFeatureProfile: boolean;
  isKol: boolean;
  name: string;
  numberFollowers: number;
  isFollowed: boolean;
}
export interface ILatestSubscribe {
  avatar: string;
  idCustomer: number;
}
export interface ITheme {
  code: string;
  name: string;
  url: string;
  bgImage: string;
  type: string;
  description: string;
  isSubsribed: boolean;
  totalSubscribe: number;
  stocks?: string[];
  latestSubscribe: ILatestSubscribe[];
}
export interface IStockIndex {
  accVol: any;
  cIndex: number;
  displayName: string;
  id: number;
  index: string;
  isBeforeTransactionTime: boolean;
  mc: string;
  oIndex: number;
  ot: string;
  status: string;
  time: string;
  value: number;
  vol: number;
}
export interface IWatchListItem {
  ceilPrice: number;
  change: number;
  changePercent: number;
  floorPrice: number;
  highPrice: number;
  id: string;
  isHnx30: boolean;
  isVn30: boolean;
  lastPrice: number;
  lastVolume: number;
  lowPrice: number;
  name: string;
  nameEn: string;
  refPrice: number;
  shortName: string;
  stockCode: string;
  stockExchange: string;
  last_price: string;
  cl: string;
  changePc: string;
  hp: number;
  lp: number;
}
export interface INewFeed {
  children: any;
  customerId: number;
  id: string;
  isFollowing: boolean;
  isReport: boolean;
  isLike: boolean;
  likes: number[];
  reports: any;
  post: any;
  postId: string;
  postType: string;
  publishedAt: number;
  reactionScore: number;
  status: string;
  textSearch: string;
  timeString: string;
  totalChildren: number;
  totalLikes: number;
  totalReports: number;
  totalViews: number;
}
export enum TYPESEARCH {
  ALL = 'ALL',
  FRIEND = 'FRIEND',
  NEWS = 'NEWS',
  POST = 'POST',
  STOCK = 'STOCK',
}
export interface ISearch {
  keyword: string;
  searchType: string;
}
interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}
export const useGetListFillter = () => {
  const { data } = useRequest(() => {
    return requestCommunity.get(API_PATH.FILTER_LIST);
  });

  return {
    data,
  };
};
const requestGetList = (params: any) => {
  return privateRequest(requestCommunity.get, API_PATH.PRIVATE_NEWFEED_LIST, { params });
};

export const useGetListNewFeed = (options?: IOptionsRequest) => {
  const { data, run, refresh, loading } = useRequest(
    (type: any, last?: string) => {
      const isLogin = !!getAccessToken();
      const params: any = {
        filterType: type,
        last,
      };
      for (const key of Object.keys(params)) {
        if (params[key] === null || params[key] === undefined || params[key] === '') {
          delete params[key];
        }
      }
      return isLogin
        ? requestGetList(params)
        : requestCommunity.get(API_PATH.NEWFEED_LIST, { params });
    },
    {
      ...options,
      manual: true,
    },
  );
  return {
    listNewFeed: data?.data,
    run,
    refresh,
    loading,
  };
};

// get list new feed
export const useGetListNewFeedAuth = () => {
  const { data, run, refresh } = useRequest(
    (type: string) => {
      return privateRequest(
        requestCommunity.get,
        API_PATH.PRIVATE_NEWFEED_LIST + `?filterType=${type}`,
      );
    },
    {
      manual: true,
    },
  );
  return {
    listNewFeedAuth: data?.data?.list,
    runNewFeedAuth: run,
    refresh,
  };
};
export const useGetTrending = () => {
  const { data } = useRequest(() => {
    return requestPist.get(API_PATH.PUBLIC_GET_TRENDING);
  });
  return {
    dataTrending: data?.data,
  };
};

export const useGetInfluencer = () => {
  const { data, refresh } = useRequest(() => {
    const isLogin = !!getAccessToken();

    return isLogin
      ? privateRequest(requestPist.get, API_PATH.PRIVATE_LIST_KOLS)
      : requestPist.get(API_PATH.KOL);
  });
  return {
    KOL: data?.data?.list || data?.data,
    refresh,
  };
};
export const socket = io(ENV.URL_SOCKET, {
  transports: ['websocket'],
});

export const requestJoinChannel = (stocks: string) => {
  const message = { action: 'join', data: stocks };
  socket.emit('regs', JSON.stringify(message));
};
export const requestLeaveChannel = (stocks: string) => {
  const message = { action: 'leave', data: stocks };
  if (socket) {
    socket.emit('regs', JSON.stringify(message));
  }
};
export const requestJoinIndex = () => {
  const message = { action: 'join', data: 'index' };
  socket.emit('regs', JSON.stringify(message));
};
export const requestLeaveIndex = () => {
  const message = { action: 'leave', data: 'index' };
  socket.emit('regs', JSON.stringify(message));
};

export const useSuggestPeople = () => {
  const { data, refresh, run } = useRequest(
    () => {
      return privateRequest(requestCommunity.get, API_PATH.SUGGESTION_PEOPLE);
    },
    {
      manual: true,
    },
  );
  return {
    suggestionPeople: data?.list,
    refreshList: refresh,
    getSuggestFriend: run,
  };
};

export const useGetTheme = () => {
  const { data, refresh } = useRequest(() => {
    const isLogin = !!getAccessToken();
    return isLogin
      ? privateRequest(requestPist.get, API_PATH.PRIVATE_ALL_THEME)
      : requestPist.get(API_PATH.PUBLIC_ALL_THEME);
  });
  return {
    theme: data?.data,
    refresh,
  };
};
// get stock market
export const useGetStock = () => {
  const { data, loading, run } = useRequest(
    () => {
      return fetch(PREFIX_API_MARKET + '/public/index').then((data: any) => data.json());
    },
    {
      manual: true,
    },
  );
  return {
    stockIndex: data?.data,
    loading,
    run,
  };
};

// folow user
export const requestFollowUser = (id: number) => {
  return privateRequest(requestPist.post, API_PATH.PRIVATE_FOLLOW_USER + `?idFriend=${id}`);
};
// unfollow user
export const requestUnFollowUser = (id: number) => {
  return privateRequest(requestPist.put, API_PATH.PRIVATE_UNFOLLOW_USER + `?idFriend=${id}`);
};
export const useGetWatchList = () => {
  const { data } = useRequest(() => {
    const isLogin = !!getAccessToken();
    return isLogin
      ? privateRequest(requestPist.get, API_PATH.PRIVATE_WATCHLIST_STOCK)
      : new Promise<void>((resolve) => {
          resolve();
        });
  });

  return {
    watchList: data?.data,
  };
};
export const useSearch = () => {
  const { data, run, loading } = useRequest(
    (payload: ISearch) => {
      return privateRequest(requestPist.post, API_PATH.PRIVATE_SEARCH, {
        data: payload,
      });
    },
    {
      manual: true,
    },
  );
  return {
    data,
    search: run,
    loading,
  };
};
// get list theme
export const useGetBgTheme = () => {
  const { data } = useRequest(() => {
    return requestCommunity.get(API_PATH.PUBLIC_THEME);
  });
  return {
    bgTheme: data?.data,
  };
};
