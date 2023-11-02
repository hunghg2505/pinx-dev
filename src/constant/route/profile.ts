import { ProfileTabKey } from '@components/MyProfile/TabsContent/Desktop/type';
import { slugify } from '@utils/common';

// MY PROFILE
export const WATCHLIST = '/danh-muc-theo-doi';
export const PROFILE_PATH = '/[profileSlug]';

export const PROFILE_FOLLOW_V2 = (displayName: any, userId: any, tab: ProfileTabKey) => {
  const profilePath = PROFILE_V2(displayName, userId);
  return profilePath + `/follow?tab=${tab}`;
};
export const PROFILE_V2 = (displayName: any, userId: any) => {
  let path = String(userId);
  const displayNameFormat = slugify(displayName);
  if (displayNameFormat.length > 0) {
    path = `${displayNameFormat}-${userId}`;
  }

  return `/${path}`;
};
export const PROFILE_VERIFICATION_V2 = (displayName: any, userId: any) => {
  const profilePath = PROFILE_V2(displayName, userId);

  return profilePath + '/profile-verification';
};
export const DEACTIVATE_ACCOUNT_V2 = (displayName: any, userId: any) => {
  const profileVerificationPath = PROFILE_VERIFICATION_V2(displayName, userId);

  return profileVerificationPath + '/deactivate-account';
};
export const ASSETS_V2 = (displayName: any, userId: any, tab: ProfileTabKey) => {
  const profilePath = PROFILE_V2(displayName, userId);

  return profilePath + `?tab=${tab}`;
};
export const EDIT_MY_PROFILE_V2 = (displayName: any, userId: any) => {
  const profilePath = PROFILE_V2(displayName, userId);
  return profilePath + '/edit';
};
