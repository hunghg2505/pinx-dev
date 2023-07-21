import { atom } from 'jotai';

export interface ILatestSubscribe {
  avatar: string;
  idCustomer: number;
}

export interface ITheme {
  code?: string;
  name?: string;
  url?: string;
  bgImage?: string;
  type?: string;
  description?: string;
  isSubsribed?: boolean;
  totalSubscribe?: number;
  stocks?: string[];
  latestSubscribe?: ILatestSubscribe[];
}

const initialThemeData: ITheme = {
  url: '',
  bgImage: '',
  name: '',
};

export const popupThemeDataAtom = atom(initialThemeData);

export const isUnubsribeThemeAtom = atom(false);
