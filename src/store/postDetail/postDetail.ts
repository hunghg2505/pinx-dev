import { atom } from 'jotai';

export interface IPostDetailStatus {
  isDoneReplies: boolean;
  isAddCommentPostDetail?: any;
  idPostDetail?: string;
}

export const initialPostDetailStatus: IPostDetailStatus = {
  isDoneReplies: false,
  isAddCommentPostDetail: [],
  idPostDetail: '',
};

export const postDetailStatusAtom = atom({
  ...initialPostDetailStatus,
});
