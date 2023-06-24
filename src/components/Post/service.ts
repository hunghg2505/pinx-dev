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
}
export interface IContentPost {
  customerId: number;
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
  head: string;
  headImageUrl: string;
  url: string;
  stockCode: string;
  timeString: string;
  contentText: string;
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
const isLogin = !!getAccessToken();
const getPostDetail = async (postId: string) => {
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

export const usePostDetail = (postId: string) => {
  const { data, loading, refresh } = useRequest(
    () => {
      return isLogin
        ? getPostDetail(postId)
        : requestCommunity.get(API_PATH.PUCLIC_MAPPING_POST_DETAIL(postId));
    },
    {
      refreshDeps: [postId],
    },
  );

  return {
    postDetail: data,
    loading,
    refresh,
  };
};

const getCommentsOfPostAuth = async (postId: string) => {
  return await privateRequest(requestCommunity.get, API_PATH.PRIVATE_MAPPING_POST_COMMENTS(postId));
};
const getCommentsOfPost = (postId: string) => {
  return requestCommunity.get(API_PATH.PUBLIC_MAPPING_POST_COMMENTS(postId));
};
export const useCommentsOfPost = (postId: string) => {
  const { data, loading, refresh } = useRequest(
    () => {
      return isLogin ? getCommentsOfPostAuth(postId) : getCommentsOfPost(postId);
    },
    {
      refreshDeps: [postId],
    },
  );

  return {
    commentsOfPost: data,
    loading,
    refreshCommentOfPOst: refresh,
  };
};

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
  return privateRequest(requestCommunity.post, API_PATH.PRIVATE_REPLY_COMMENT(id), {
    data: payload,
  });
};
export const requestAddComment = (payload: any) => {
  return privateRequest(requestCommunity.post, API_PATH.PRIVATE_ADD_COMMENT, {
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
