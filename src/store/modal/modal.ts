import { atom } from 'jotai';

export interface IModalStatus {
  modalAuth: boolean;
  modalRegisterOtp: boolean;
  modalRegisterUsername: boolean;
}

export const initialModalStatus: IModalStatus = {
  modalAuth: false,
  modalRegisterOtp: false,
  modalRegisterUsername: false,
};

export const modalStatusAtom = atom({
  ...initialModalStatus,
});
