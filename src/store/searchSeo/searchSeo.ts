import { atom } from 'jotai';

export interface ISearchSeoStatus {
  isShowPopup: boolean;
}

export const initialSearchSeoStatus: ISearchSeoStatus = {
  isShowPopup: false,
};

export const searchSeoAtom = atom(false);
