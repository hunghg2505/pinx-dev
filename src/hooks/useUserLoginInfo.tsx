import { useAtom, atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

interface InitUserLoginInfo {
  id?: string | number;
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
  avatar?: string;
  displayName?: string;
  totalFollower?: number;
  totalFollowing?: number;
  gender?: string;
  dob?: string;
  identityCardNo?: string;
  address?: string;
  openDate?: string;
  isKol?: boolean;
  isFeatureProfile?: boolean;
}

const initialUserLoginInfo: InitUserLoginInfo = {
  isReadTerms: 'false',
};

const isReadTermsAtom = atomWithStorage('isReadTerms', false);
const isForceAllowTermAtom = atomWithStorage('forceAllowTerm', false);
const userTypeAtom = atomWithStorage('userType', '');
export const userLoginInfoAtom = atom({ ...initialUserLoginInfo });

export const useUserLoginInfo = () => {
  const [userLoginInfo, setUserLoginInfo] = useAtom(userLoginInfoAtom);
  const [isReadTerms, setIsReadTerms] = useAtom(isReadTermsAtom);
  const [userType, setUserType] = useAtom(userTypeAtom);
  const [forceAllowTerm, setForceAllowTerm] = useAtom(isForceAllowTermAtom);

  return {
    userLoginInfo,
    isReadTerms,
    userType,
    forceAllowTerm,
    setUserLoginInfo,
    setIsReadTerms,
    setUserType,
    setForceAllowTerm,
  };
};
