import { USERTYPE } from 'src/constant';

export const checkUserType = (custStat?: string, acntStat?: string) => {
  if (custStat === USERTYPE.NEW) {
    return USERTYPE.NEW;
  }
  if (custStat === USERTYPE.PRO && acntStat === USERTYPE.VSD_REJECTED) {
    return USERTYPE.EKYC;
  }
  return USERTYPE.VSD;
};
