import { useRequest } from 'ahooks';
import io from 'socket.io-client';

import { API_PATH } from '@api/constant';
import { privateRequest, requestCommunity, requestPist } from '@api/request';
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
  stocks: string[];
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
const isLogin = !!getAccessToken();
export const useGetListFillter = () => {
  const { data } = useRequest(() => {
    return requestCommunity.get(API_PATH.FILTER_LIST);
  });
  return {
    data,
  };
};
const requestGetList = (type: string) => {
  return privateRequest(
    requestCommunity.get,
    API_PATH.PRIVATE_NEWFEED_LIST + `?filterType=${type}`,
  );
};
// unauth
export const useGetListNewFeed = () => {
  const { data, run, refresh } = useRequest(
    (type: string) => {
      return isLogin
        ? requestGetList(type)
        : requestCommunity.get(API_PATH.NEWFEED_LIST + `?filterType=${type}`);
    },
    {
      manual: true,
    },
  );
  return {
    listNewFeed: data?.data?.list,
    run,
    refresh,
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
  const { data } = useRequest(() => {
    return requestPist.get(API_PATH.KOL);
  });
  return {
    KOL: data?.data?.list,
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
  console.log('handle leave', stocks);
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
  const { data, refresh } = useRequest(() => {
    return privateRequest(requestCommunity.get, API_PATH.SUGGESTION_PEOPLE);
  });
  return {
    suggestionPeople: data?.list,
    refresh,
  };
};

export const useGetTheme = () => {
  const { data, refresh } = useRequest(() => {
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
      return fetch('https://testapi.pinex.vn/market/public/index').then((data: any) => data.json());
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
export const useGetWatchList = (id: number) => {
  const { data } = useRequest(() => {
    return privateRequest(requestPist.get, API_PATH.PRIVATE_WATCHLIST_STOCK(id));
  });
  return {
    watchList: data,
  };
};
