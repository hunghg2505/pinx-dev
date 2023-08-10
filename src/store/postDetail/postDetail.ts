import { atom } from 'jotai';

export interface IPostDetailStatus {
  isDoneReplies: boolean;
  isAddCommentPostDetail?: any;
  idPostDetail?: string;
  idPostLike?: string;
  idCustomerFollow?: number;
  themeWatchlist: any;
}

export const initialPostDetailStatus: IPostDetailStatus = {
  isDoneReplies: false,
  isAddCommentPostDetail: [],
  idPostDetail: '',
  idPostLike: '',
  idCustomerFollow: 0,
  themeWatchlist: undefined,
};

export const postDetailStatusAtom = atom({
  ...initialPostDetailStatus,
});
