import { useRouter } from 'next/router';

import { ROUTE_PATH } from '@utils/common';

export const useRouteSetting = () => {
  const router = useRouter();

  const isRouteSetting = [
    ROUTE_PATH.REDIRECT,
    ROUTE_PATH.SETTING,
    ROUTE_PATH.SETTING_CHANGE_PASSWORD,
    ROUTE_PATH.SETTING_CHANGE_USERNAME,
    ROUTE_PATH.SETTING_CHANGE_PASSWORD_VERIFICATION,
    ROUTE_PATH.SETTING_CHANGE_USERNAME_VERIFICATION,
    ROUTE_PATH.PROFILE_VERIFICATION,
  ].includes(router?.pathname);

  return { isRouteSetting };
};
