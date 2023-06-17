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

const FIXED_TOKEN =
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
