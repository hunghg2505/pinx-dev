import { atom } from 'jotai';

export interface IModalStatus {
  popupAuth: boolean;
  popupRegisterOtp: boolean;
  popupRegisterUsername: boolean;
  popupLoginTerms: boolean;
  popupAccessLinmit: boolean;
  popupAddNewStock: boolean;
  popupDeactivateAccount: boolean;
  popupConfirmDeactivateAccount: boolean;
}

export const initialPopupStatus: IModalStatus = {
  popupAuth: false,
  popupRegisterOtp: false,
  popupRegisterUsername: false,
  popupLoginTerms: false,
  popupAccessLinmit: false,
  popupAddNewStock: false,
  popupDeactivateAccount: false,
  popupConfirmDeactivateAccount: false,
};

export const popupStatusAtom = atom({
  ...initialPopupStatus,
});
