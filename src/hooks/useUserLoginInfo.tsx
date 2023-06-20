import { useAtom, atom } from 'jotai';

const userLoginInfoAtom = atom({});

export const useUserLoginInfo = () => {
  const [userLoginInfo, setUserLoginInfo] = useAtom(userLoginInfoAtom);

  return { userLoginInfo, setUserLoginInfo };
};
