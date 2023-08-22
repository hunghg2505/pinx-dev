import { useAtom } from 'jotai';

import { useAuth } from '@store/auth/useAuth';
import { profileSettingAtom } from '@store/profileSetting/profileSetting';
import { USERTYPE } from '@utils/constant';

import { userLoginInfoAtom } from './useUserLoginInfo';

export const useUserType: any = () => {
  const { isLogin } = useAuth();
  // const { userLoginInfo } = useUserLoginInfo();
  const [userLoginInfo] = useAtom(userLoginInfoAtom);
  const [profileSetting] = useAtom(profileSettingAtom);
  const isCanCompose = profileSetting?.ignore_vsd_validator?.includes(userLoginInfo.cif);
  const custStat = userLoginInfo?.custStat;
  const acntStat = userLoginInfo?.acntStat;
  const userId = userLoginInfo?.id;

  let statusUser;

  if (isLogin) {
    if (custStat === USERTYPE.NEW && !isCanCompose) {
      statusUser = USERTYPE.NEW;
    } else if (custStat === USERTYPE.PRO && acntStat === USERTYPE.VSD_REJECTED && !isCanCompose) {
      statusUser = USERTYPE.EKYC;
    } else if (
      custStat === USERTYPE.PRO &&
      acntStat === USERTYPE.PENDING_TO_CLOSE &&
      !isCanCompose
    ) {
      statusUser = USERTYPE.PENDING_TO_CLOSE;
    } else {
      statusUser = USERTYPE.VSD;
    }
  }

  return { isLogin, statusUser, userId };
};
