import { useAtom, atom } from 'jotai';

interface InitUserRegisterInfo {
  phoneNumber?: string;
  password?: string;
  email?: string;
  recaptcha?: string;
  token?: string;
}

const initialUserRegisterInfo: InitUserRegisterInfo = {
  phoneNumber: '',
};

export const userRegisterInfoAtom = atom(initialUserRegisterInfo);

export const useUserRegisterInfo = () => {
  const [userRegisterInfo, setUserRegisterInfo] = useAtom(userRegisterInfoAtom);

  return { userRegisterInfo, setUserRegisterInfo };
};
