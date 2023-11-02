import { ACNT_STAT_ACTIVE, ACNT_STAT_VSD_PENDING } from 'src/constant';

export const calcUserStatusText = (acntStat: string) => {
  switch (acntStat) {
    case ACNT_STAT_ACTIVE: {
      return 'Verified';
    }
    case ACNT_STAT_VSD_PENDING: {
      return 'Pending';
    }
    default: {
      return 'Unverified';
    }
  }
};
