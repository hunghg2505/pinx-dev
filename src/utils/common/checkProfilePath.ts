/* eslint-disable unicorn/prefer-add-event-listener */
// import imageCompression from 'browser-image-compression';
import jwtDecode from 'jwt-decode';

import { all } from '@utils/cookies';

/**
 * Check user view my profile page or profile of other
 */
export const checkProfilePath = (params: any, req: any) => {
  let isMyProfile = false;
  const { profileSlug }: any = params;
  let userId = profileSlug.split('-').pop() || '';
  userId = Number.isNaN(Number(userId)) ? '' : userId;

  const accessToken = all(req?.headers?.cookie)?.accessToken;
  if (accessToken && userId) {
    const decoded: any = jwtDecode(String(accessToken));
    isMyProfile = +userId === +decoded?.userId;
  }

  return {
    isMyProfile,
    userId,
  };
};
