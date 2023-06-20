import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

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
  urlImages: null;
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
}
export enum TYPEPOST {
  POST = 'POST',
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

const getPostDetail = async (postId: string) => {
  return await privateRequest(requestCommunity.get, API_PATH.PRIVATE_MAPPING_POST_DETAIL(postId));
};

export const usePostDetail = (postId: string) => {
  const { data, loading, refresh } = useRequest(() => getPostDetail(postId), {
    refreshDeps: [postId],
  });

  const onRefreshPostDetail = () => {
    refresh();
  };

  return {
    postDetail: data,
    loading,
    onRefreshPostDetail,
  };
};

export const useGetPostDetailUnAuth = (postId: string) => {
  const { data, loading } = useRequest(
    () => {
      return requestCommunity.get(API_PATH.PUCLIC_MAPPING_POST_DETAIL(postId));
    },
    {
      refreshDeps: [postId],
    },
  );

  return {
    postDetailUnAuth: data,
    loading,
  };
};

const getCommentsOfPost = async (postId: string) => {
  return await privateRequest(requestCommunity.get, API_PATH.PRIVATE_MAPPING_POST_COMMENTS(postId));
};

export const useCommentsOfPost = (postId: string) => {
  const { data, loading } = useRequest(() => getCommentsOfPost(postId), {
    refreshDeps: [postId],
  });

  return {
    commentsOfPost: data,
    loading,
  };
};

export const useCommentsOfPostUnAuth = (postId: string) => {
  const { data, loading } = useRequest(
    () => {
      return requestCommunity.get(API_PATH.PUBLIC_MAPPING_POST_COMMENTS(postId));
    },
    {
      refreshDeps: [postId],
    },
  );
  return {
    commentsOfPostUnAuth: data,
    loading,
  };
};

const likePost = async (postId: string) => {
  console.log('service like post', postId);
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

const unlikePost = async (postId: string) => {
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
export const requestHidePost = () => {
  return privateRequest;
};
// export const requestSearch = () => {
//   return privateRequest
// }
