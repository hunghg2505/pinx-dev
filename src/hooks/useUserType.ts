import { getAccessToken } from '@store/auth';
import { useProfileInitial } from '@store/profile/useProfileInitial';

export const enum USERTYPE {
  NEW = 'NEW',
  PRO = 'PRO',
  VSD_PENDING = 'VSD_PENDING',
  VSD_REJECTED = 'VSD_REJECTED',
  EKYC = 'EKYC',
  VSD = 'VSD',
  LOGIN = 'LOGIN',
  NOTLOGIN = 'NOTLOGIN',
}
export const useUserType: any = () => {
  const isLogin = !!getAccessToken();
  const { requestGetProfile } = useProfileInitial();
  console.log('🚀 ~ file: useUserType.ts:17 ~ requestGetProfile:', requestGetProfile);
  const custStat = requestGetProfile?.custStat;
  const acntStat = requestGetProfile?.acntStat;
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

  return { isLogin, statusUser };
};
