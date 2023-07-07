import { getAccessToken } from '@store/auth';
import { USERTYPE } from '@utils/constant';

import { useUserLoginInfo } from './useUserLoginInfo';

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
    } else if (custStat === USERTYPE.PRO && acntStat === USERTYPE.PENDING_TO_CLOSE) {
      statusUser = USERTYPE.PENDING_TO_CLOSE;
    } else {
      statusUser = USERTYPE.VSD;
    }
  }

  return { isLogin, statusUser, userId };
};
