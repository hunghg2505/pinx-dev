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
  popupEkyc: boolean;
  popupSubsribeTheme: boolean;
  popupSubsribeStock: boolean;
  popupSubsribeThemeHome: boolean;
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
  popupEkyc: false,
  popupSubsribeTheme: false,
  popupSubsribeStock: false,
  popupSubsribeThemeHome: false,
};

export const popupStatusAtom = atom({
  ...initialPopupStatus,
});
