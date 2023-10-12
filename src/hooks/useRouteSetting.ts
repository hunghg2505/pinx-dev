import { useMemo } from 'react';

import { useRouter } from 'next/router';

import { ROUTE_PATH } from '@utils/common';

import { useUserLoginInfo } from './useUserLoginInfo';

export const useRouteSetting = () => {
  const router = useRouter();
  const { userLoginInfo } = useUserLoginInfo();
  const { profileSlug } = router.query;
  const isProfileVerificationPath = useMemo(() => {
    const userId = (profileSlug as string)?.split('-')?.pop();

    return (
      router.pathname === '/[profileSlug]/profile-verification' &&
      Number(userId) === Number(userLoginInfo?.id)
    );
  }, [router, userLoginInfo?.id]);

  const isRouteSetting =
    [
      ROUTE_PATH.REDIRECT,
      ROUTE_PATH.SETTING,
      ROUTE_PATH.SETTING_CHANGE_PASSWORD,
      ROUTE_PATH.SETTING_CHANGE_USERNAME,
      ROUTE_PATH.SETTING_CHANGE_PASSWORD_VERIFICATION,
      ROUTE_PATH.SETTING_CHANGE_USERNAME_VERIFICATION,
    ].includes(router?.pathname) || isProfileVerificationPath;

  return { isRouteSetting };
};
