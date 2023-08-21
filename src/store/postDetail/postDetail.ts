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
}

export const initialPostDetailStatus: IPostDetailStatus = {
  isDoneReplies: false,
  isChangeMyProfile: false,
  isAddCommentPostDetail: [],
  idPostAddComment: '',
  idPostDetail: '',
  idPostLike: '',
  idCustomerFollow: 0,
  themeWatchlist: undefined,
  stockWatchList: undefined,
  isChangeStockWatchList: false,
  isRefreshHome: false,
};

export const postDetailStatusAtom = atom({
  ...initialPostDetailStatus,
});
