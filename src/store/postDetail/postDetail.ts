import { atom } from 'jotai';

export interface IPostDetailStatus {
  isDoneReplies: boolean;
  isAddCommentPostDetail?: any;
  idPostDetail?: string;
  idPostLike?: string;
  idCustomerFollow?: number;
}

export const initialPostDetailStatus: IPostDetailStatus = {
  isDoneReplies: false,
  isAddCommentPostDetail: [],
  idPostDetail: '',
  idPostLike: '',
  idCustomerFollow: 0,
};

export const postDetailStatusAtom = atom({
  ...initialPostDetailStatus,
});
