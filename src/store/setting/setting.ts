import { atom } from 'jotai';

interface ISetting {
  curPassword: string;
  newPassword: string;
  newUsername: string;
}

export const initialSetting: ISetting = {
  curPassword: '',
  newPassword: '',
  newUsername: '',
};

export const settingAtom = atom({ ...initialSetting });
