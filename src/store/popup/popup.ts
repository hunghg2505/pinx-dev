import { atom } from 'jotai';

export interface IModalStatus {
  popupAuth: boolean;
  popupRegisterOtp: boolean;
  popupRegisterUsername: boolean;
  popupLoginTerms: boolean;
  popupAccessLinmit: boolean;
}

export const initialPopupStatus: IModalStatus = {
  popupAuth: false,
  popupRegisterOtp: false,
  popupRegisterUsername: false,
  popupLoginTerms: false,
  popupAccessLinmit: false,
};

export const popupStatusAtom = atom({
  ...initialPopupStatus,
});