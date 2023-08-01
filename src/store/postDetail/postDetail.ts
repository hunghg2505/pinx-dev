import { atom } from 'jotai';

export interface IPostDetailStatus {
  isDoneReplies: boolean;
  idPostDetail?: string;
}

export const initialPostDetailStatus: IPostDetailStatus = {
  isDoneReplies: false,
  idPostDetail: '',
};

export const postDetailStatusAtom = atom({
  ...initialPostDetailStatus,
});
