import { getAccessToken } from '@store/auth';

import { useUserLoginInfo } from './useUserLoginInfo';

export const enum USERTYPE {
  NEW = 'NEW',
  PRO = 'PRO',
  VSD_PENDING = 'VSD_PENDING',
  VSD_REJECTED = 'VSD_REJECTED',
  EKYC = 'EKYC',
  VSD = 'VSD',
  LOGIN = 'LOGIN',
  NOTLOGIN = 'NOTLOGIN',
  ACTIVE = 'ACTIVE',
}
export const useUserType: any = () => {
  const isLogin = !!getAccessToken();
  const { userLoginInfo } = useUserLoginInfo();
  const custStat = userLoginInfo?.custStat;
  const acntStat = userLoginInfo?.acntStat;
  const userId = userLoginInfo?.id;

  let statusUser;

  if (isLogin) {
    if (custStat === USERTYPE.NEW) {
      statusUser = USERTYPE.NEW;
    } else if (
      (custStat === USERTYPE.PRO && acntStat === USERTYPE.VSD_PENDING) ||
      (custStat === USERTYPE.PRO && acntStat === USERTYPE.VSD_REJECTED)
    ) {
      statusUser = USERTYPE.EKYC;
    } else {
      statusUser = USERTYPE.VSD;
    }
  }

  return { isLogin, statusUser, userId };
};
