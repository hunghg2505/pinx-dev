import { atom } from 'jotai';

export interface IPostDetailStatus {
  isDoneReplies: boolean;
}

export const initialPostDetailStatus: IPostDetailStatus = {
  isDoneReplies: false,
};

export const postDetailStatusAtom = atom({
  ...initialPostDetailStatus,
});
