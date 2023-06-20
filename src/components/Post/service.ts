import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, request } from '@api/request';

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
export const FIXED_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJjaWYiOiIwMDExMjUzMyIsImZpcnN0TG9naW4iOmZhbHNlLCJ2c2QiOiIwMTBDMDcxNzU4Iiwic2Vzc2lvbiI6IktRUG9CVUpySnhIamsxRlk1TTVhWURYNEh2WGlwNXlZYmRycGpSTWlybzFtM0JUbmdWRmRmWmNkZGNyVUZCVG0iLCJhY250U3RhdCI6IkFDVElWRSIsImF1dGhEZWYiOiJUT1AiLCJ1c2VySWQiOjE1NTAsImF1dGhvcml0aWVzIjoiUk9MRV9DVVNUT01FUiIsImV4cGlyZWRBdCI6MTcxODA4MDI5MjQxOSwic3ViQWNjb3VudE5vIjoiTjAwMDc4ODkzIiwiY3VzdFN0YXQiOiJQUk8iLCJwaG9uZSI6IjA5ODYwNTcxNDciLCJhY2NvdW50Tm8iOiIwMDA3ODg3OSIsIm5hbWUiOiJU4buQTkcgVEjhu4ogTUFJIE1BSSBNQUkgTkdBIiwiZW1haWwiOiJza3NrZmxkQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiMDk4NjA1NzE0NyJ9.oHSZrVhA4OYhIJ-JqlygDhKUcAFUtGWV4Ld-poJxwvQ';

const getPostDetail = async (postId: string) => {
  return await privateRequest(request.get, API_PATH.PRIVATE_MAPPING_POST_DETAIL(postId), {
    headers: {
      Authorization: FIXED_TOKEN,
    },
  });
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
      return request.get(API_PATH.PUCLIC_MAPPING_POST_DETAIL(postId));
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
  return await privateRequest(request.get, API_PATH.PRIVATE_MAPPING_POST_COMMENTS(postId), {
    headers: {
      Authorization: FIXED_TOKEN,
    },
  });
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
      return request.get(API_PATH.PUBLIC_MAPPING_POST_COMMENTS(postId));
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
  return await privateRequest(request.post, API_PATH.PRIVATE_MAPPING_LIKE_POST(postId), {
    headers: {
      Authorization: FIXED_TOKEN,
    },
  });
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
  return await privateRequest(request.post, API_PATH.PRIVATE_MAPPING_UNLIKE_POST(postId), {
    headers: {
      Authorization: FIXED_TOKEN,
    },
  });
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
  return privateRequest(request.post, API_PATH.PRIVATE_LIKE_COMMENT(id));
};
// unlike comment
export const requestUnLikeComment = (id: string) => {
  return privateRequest(request.post, API_PATH.PRIVATE_UNLIKE_COMMENT(id));
};
export const requestReplyCommnet = (id: string, payload: any) => {
  return privateRequest(request.post, API_PATH.PRIVATE_REPLY_COMMENT(id), {
    data: payload,
  });
};
export const requestAddComment = (payload: any) => {
  return privateRequest(request.post, API_PATH.PRIVATE_ADD_COMMENT, {
    data: payload,
  });
};
export const requestHidePost = () => {
  return privateRequest;
};
// export const requestSearch = () => {
//   return privateRequest
// }
