import { useAtom, atom } from 'jotai';

interface InitUserLoginInfo {
  token?: string;
  authorities?: string[];
  expiredAt?: string;
  userId?: number;
  username?: string;
  firstLogin?: boolean;
  authDef?: string;
  cif?: string;
  vsd?: string;
  name?: string;
  phone?: string;
  session?: string;
  email?: string;
  custStat?: string;
  acntStat?: string;
  accountNo?: string;
  subAccountNo?: string;
  needVSDFile?: string;
  isCFContract?: string;
  isSign?: string;
  isIdCard?: string;
  openType?: string;
  bankAccountInfoList?: any[];
  isReadTerms?: string;
  forceAllow?: boolean;
}

const initialUserLoginInfo: InitUserLoginInfo = {
  isReadTerms: 'false'
};


const userLoginInfoAtom = atom({ ...initialUserLoginInfo });

export const useUserLoginInfo = () => {
  const [userLoginInfo, setUserLoginInfo] = useAtom(userLoginInfoAtom);

  return { userLoginInfo, setUserLoginInfo };
};
