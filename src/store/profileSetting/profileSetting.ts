import { atom } from 'jotai';

export interface IProfileSetting {
  ignore_vsd_validator: any;
}

export const initialProfileSetting: IProfileSetting = {
  ignore_vsd_validator: [''],
};

export const profileSettingAtom = atom({ ...initialProfileSetting });
