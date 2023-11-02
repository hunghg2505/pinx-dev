import { useMemo } from 'react';

import { useRouter } from 'next/router';

import {
  REDIRECT,
  SETTING,
  SETTING_CHANGE_PASSWORD,
  SETTING_CHANGE_PASSWORD_VERIFICATION,
  SETTING_CHANGE_USERNAME,
  SETTING_CHANGE_USERNAME_VERIFICATION,
} from 'src/constant/route';

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
      REDIRECT,
      SETTING,
      SETTING_CHANGE_PASSWORD,
      SETTING_CHANGE_USERNAME,
      SETTING_CHANGE_PASSWORD_VERIFICATION,
      SETTING_CHANGE_USERNAME_VERIFICATION,
    ].includes(router?.pathname) || isProfileVerificationPath;

  return { isRouteSetting };
};
