import { atom } from 'jotai';

export interface IPostDetailStatus {
  isDoneReplies: boolean;
  isAddCommentPostDetail?: any;
  idPostAddComment?: string;
  idPostDetail?: string;
  idPostLike?: string;
  idCustomerFollow?: number;
  themeWatchlist: any;
  stockWatchList: any;
  isChangeMyProfile?: boolean;
  isChangeStockWatchList?: boolean;
  isRefreshHome?: boolean;
  idPostHideComment?: string;
  refreshCommentofComment?: (id: string) => void;
}

export const initialPostDetailStatus: IPostDetailStatus = {
  isDoneReplies: false,
  isChangeMyProfile: false,
  isAddCommentPostDetail: [],
  idPostAddComment: '',
  idPostDetail: '',
  idPostLike: '',
  idPostHideComment: '',
  idCustomerFollow: 0,
  themeWatchlist: undefined,
  stockWatchList: undefined,
  isChangeStockWatchList: false,
  isRefreshHome: false,
  refreshCommentofComment: () => {},
};

export const postDetailStatusAtom = atom({
  ...initialPostDetailStatus,
});
