import { atom } from 'jotai';

export interface IPostTheme {
  id: string;
  code: string;
  name: string;
  bgImage: string;
  icon: string;
  color?: {
    id: string;
    code: string;
    name: string;
    description: string;
  };
  description: string;
  verticalAlign: string;
  fontWeight: string;
  fontSize: number;
  lineHeight: number;
  textAlign: string;
  textPosition: string;
}

export const initialPostTheme: IPostTheme = {
  id: '',
  name: '',
  code: '',
  bgImage: '',
  icon: '',
  description: '',
  verticalAlign: '',
  fontWeight: '',
  fontSize: 0,
  lineHeight: 0,
  textAlign: '',
  textPosition: '',
};

export const postThemeAtom = atom([{ ...initialPostTheme }]);
