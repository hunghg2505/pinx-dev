import { useAtom, atom } from 'jotai';

const userRegisterInfoAtom = atom({});

export const useUserRegisterInfo = () => {
  const [userRegisterInfo, setUserRegisterInfo] = useAtom(userRegisterInfoAtom);

  return { userRegisterInfo, setUserRegisterInfo };
};
