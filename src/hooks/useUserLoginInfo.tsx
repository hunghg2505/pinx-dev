import { useAtom, atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils'

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

const isReadTermsAtom = atomWithStorage('isReadTerms', false);
const userTypeAtom = atomWithStorage('userType', '');
const userLoginInfoAtom = atom({ ...initialUserLoginInfo });

export const useUserLoginInfo = () => {
  const [userLoginInfo, setUserLoginInfo] = useAtom(userLoginInfoAtom);
  const [isReadTerms, setIsReadTerms] = useAtom(isReadTermsAtom)
  const [userType, setUserType] = useAtom(userTypeAtom)

  return { userLoginInfo, setUserLoginInfo, isReadTerms, setIsReadTerms, userType, setUserType };
};
