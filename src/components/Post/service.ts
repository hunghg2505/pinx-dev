import { useRequest } from 'ahooks';
import request from 'umi-request';

import { API_PATH } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';
import { getAccessToken } from '@store/auth';

export interface ICustomerInfo {
  id: number;
  customerId: number;
  name: string;
  displayName: string;
  avatar: string;
  numberFollowers: number;
  isKol: boolean;
  isFeatureProfile: boolean;
  totalFollowers: number;
  isWatching: boolean;
  isInvesting: boolean;
}

export interface IComment {
  id: string;
  customerId: number;
  customerInfo: ICustomerInfo;
  message: string;
  status: string;
  tagStocks: any;
  metadata: null;
  metadataList: null;
  urlImages: string[];
  urlLinks: null;
  tagPeople: ICustomerInfo[];
  children: IComment[];
  totalChildren: number;
  parentId: string;
  totalLikes: number;
  totalReports: number;
  level: number;
  likes: any;
  reports: any;
  timeString: string;
  isLike: boolean;
  isReport: boolean;
}
export interface IPost {
  children: any;
  customerId: number;
  id: string;
  isLike: boolean;
  isReport: boolean;
  likes: any;
  post: IContentPost;
  postId: string;
  postType: string;
  publishedAt: number;
  reactionScore: number;
  report: any;
  status: string;
  textSearch: string;
  timeString: string;
  totalChildren: number;
  totalLikes: number;
  totalReports: number;
  totalViews: number;
  isFollowing: boolean;
}
export interface IContentPost {
  customerId: number;
  hashtags?: string[];
  customerInfo: ICustomerInfo;
  id: string;
  message: string;
  metadata: any;
  metadataList: any;
  postCategory: any;
  postThemeId: any;
  postType: string;
  postTypeGroup: string;
  status: string;
  tagExchanges: any;
  tagPeople: any;
  tagStocks: string[];
  textSearch: string;
  urlImages: string[];
  urlLinks: string[];
  action: string;
  bgImage: string;
  themeName: string;
  themeCode: string;
  head: string;
  headImageUrl: string;
  url: string;
  stockCode: string;
  timeString: string;
  contentText: string;
  tradingDate: string;
  pnlRate: number;
  title: string;
  type: string;
  vendorInfo: IVendorInfo;
}

interface IVendorInfo {
  id: string;
  logo: string;
  favicon: string;
  code: string;
  name: string;
  homeUrl: string;
}

interface IResponseTotalShare {
  shares: {
    all: number;
  };
  total: number;
}

export enum TYPEPOST {
  POST = 'Post',
  ActivityTheme = 'ActivityTheme',
  ActivityWatchlist = 'ActivityWatchlist',
  ActivityMatchOrder = 'ActivityMatchOrder',
  VietstockNews = 'VietstockNews',
  VietstockLatestNews = 'VietstockLatestNews',
  VietstockStockNews = 'VietstockStockNews',
  TNCKNews = 'TNCKNews',
  PinetreeDailyNews = 'PinetreeDailyNews',
  PinetreeWeeklyNews = 'PinetreeWeeklyNews',
  PinetreeMorningBrief = 'PinetreeMorningBrief',
  PinetreeMarketBrief = 'PinetreeMarketBrief',
  PinetreePost = 'PinetreePost',
  CafeFNews = 'CafeFNews',
}

export const TypePostOnlyReportAction = [
  TYPEPOST.VietstockNews,
  TYPEPOST.VietstockLatestNews,
  TYPEPOST.VietstockStockNews,
  TYPEPOST.TNCKNews,
  TYPEPOST.PinetreeDailyNews,
  TYPEPOST.PinetreeWeeklyNews,
  TYPEPOST.PinetreeMorningBrief,
  TYPEPOST.PinetreeMarketBrief,
  TYPEPOST.CafeFNews,
];

export const getPostDetail = async (postId: string) => {
  return await privateRequest(requestCommunity.get, API_PATH.PRIVATE_MAPPING_POST_DETAIL(postId));
};

// export const usePostDetail = (postId: string) => {
//   const { data, loading, refresh } = useRequest(() => getPostDetail(postId), {
//     refreshDeps: [postId],
//   });

//   return {
//     postDetail: data,
//     loading,
//     onRefreshPostDetail: refresh,
//   };
// };

export const usePostDetail = (postId: string, option = {}) => {
  const { data, loading, refresh, run } = useRequest(
    () => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? getPostDetail(postId)
        : requestCommunity.get(API_PATH.PUCLIC_MAPPING_POST_DETAIL(postId));
    },
    {
      refreshDeps: [postId],
      ...option,
      // manual: true,
    },
  );
  return {
    postDetail: data,
    loading,
    refresh,
    run,
  };
};

export const getCommentsOfPostAuth = async (postId: string, params?: any) => {
  return await privateRequest(
    requestCommunity.get,
    API_PATH.PRIVATE_MAPPING_POST_COMMENTS(postId),
    { params },
  );
};
export const getCommentsOfPost = (postId: string, params?: any) => {
  return requestCommunity.get(API_PATH.PUBLIC_MAPPING_POST_COMMENTS(postId), { params });
};
export const useCommentsOfPost = (postId: string) => {
  const { data, loading, refresh } = useRequest(
    async () => {
      const isLogin = !!getAccessToken();
      return isLogin ? getCommentsOfPostAuth(postId) : getCommentsOfPost(postId);
    },
    {
      refreshDeps: [postId],
    },
  );
  return {
    commentsOfPost: data,
    loading,
    refreshCommentOfPost: refresh,
  };
};

export async function getMoreCommentPost(postId: string, nextId: string): Promise<any> {
  const params = {
    limit: 20,
    last: nextId ?? '',
  };
  const isLogin = !!getAccessToken();
  const r = isLogin
    ? await getCommentsOfPostAuth(postId, params)
    : await getCommentsOfPost(postId, params);
  return {
    list: r?.data?.list,
    nextId: r?.data?.hasNext ? r?.data?.last : false,
  };
}

export const likePost = async (postId: string) => {
  return await privateRequest(requestCommunity.post, API_PATH.PRIVATE_MAPPING_LIKE_POST(postId));
};

export const useLikePost = (postId: string) => {
  const { data, loading, run } = useRequest(() => likePost(postId), {
    manual: true,
    refreshDeps: [postId],
    debounceWait: 250,
  });

  const onLikePost = () => {
    run();
  };

  return {
    likePost: data,
    loading,
    onLikePost,
  };
};

export const unlikePost = async (postId: string) => {
  return await privateRequest(requestCommunity.post, API_PATH.PRIVATE_MAPPING_UNLIKE_POST(postId));
};

export const useUnlikePost = (postId: string) => {
  const { data, loading, run } = useRequest(() => unlikePost(postId), {
    manual: true,
    refreshDeps: [postId],
    debounceWait: 250,
  });

  const onUnlikePost = () => {
    run();
  };

  return {
    unlikePost: data,
    loading,
    onUnlikePost,
  };
};

// like comment
export const requestLikeComment = (id: string) => {
  return privateRequest(requestCommunity.post, API_PATH.PRIVATE_LIKE_COMMENT(id));
};
// unlike comment
export const requestUnLikeComment = (id: string) => {
  return privateRequest(requestCommunity.post, API_PATH.PRIVATE_UNLIKE_COMMENT(id));
};
export const requestReplyCommnet = (id: string, payload: any) => {
  return privateRequest(requestCommunity.post, API_PATH.PRIVATE_REPLY_COMMENT_V2(id), {
    data: payload,
  });
};
export const requestAddComment = (payload: any) => {
  return privateRequest(requestCommunity.post, API_PATH.PRIVATE_ADD_COMMENT_V2, {
    data: payload,
  });
};
export const requestHidePost = (id: string) => {
  return privateRequest(requestCommunity.put, API_PATH.PRIVATE_HIDE_POST + `?mappingId=${id}`);
};
// export const requestSearch = () => {
//   return privateRequest
// }

// total share of post
export const getTotalSharePost = (url: string): Promise<IResponseTotalShare> => {
  const API_URL = 'https://count-server.sharethis.com/v2.0/get_counts?url=';
  return request.get(API_URL + url);
};

export const useGetTotalSharePost = () => {
  const { data, run } = useRequest((url: string) => getTotalSharePost(url), {
    manual: true,
  });

  return {
    total: data?.shares.all,
    onGetTotalShare: run,
  };
};

// hide comment
export const requestHideComment = (id: string) => {
  return privateRequest(requestCommunity.delete, API_PATH.PRIVATE_DELETE_COMMENT(id));
};

export const useDeletePost = (option = {}) => {
  const { run } = useRequest(
    (id: string) => {
      return privateRequest(requestCommunity.delete, API_PATH.PRIVATE_DELETE_POST(id));
    },
    {
      manual: true,
      ...option,
    },
  );
  return {
    run,
  };
};
