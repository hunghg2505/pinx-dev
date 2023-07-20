import { atom } from 'jotai';

export interface IProfile {
  accountNo?: string;
  acntStat?: string;
  address?: string;
  authDef?: string;
  avatar?: string;
  caption?: string;
  cif?: string;
  contactAddress?: string;
  coverImage?: string;
  custStat?: string;
  deviceType?: string;
  displayName?: string;
  dob?: string;
  email?: string;
  fcmToken?: string;
  firstLogin?: boolean;
  fullDes?: string;
  gender?: string;
  guid?: string;
  hasProAccount?: boolean;
  hasSyncContact?: boolean;
  id?: number;
  identityCardNo?: string;
  isFeatureProfile?: boolean;
  isKol?: boolean;
  kolPoint?: number;
  name?: string;
  openDate?: string;
  phone?: string;
  position?: string;
  subAccount?: string;
  totalFollower?: number;
  totalFollowing?: number;
  username?: string;
  vsd?: string;
}

export const initialProfile: IProfile = {
  username: '',
  phone: '',
  email: '',
  id: 0,
};

export const profileAtom = atom({
  ...initialProfile,
});

export const openProfileAtom = atom(false);
