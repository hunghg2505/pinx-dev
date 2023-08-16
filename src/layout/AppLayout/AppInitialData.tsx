import { useEffect } from 'react';

import { useMount, useUpdateEffect } from 'ahooks';
import { useRouter } from 'next/router';
import Script from 'next/script';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

import { useHandlActionsPost } from '@hooks/useHandlActionsPost';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { getLocaleCookie, setLocaleCookie } from '@store/locale';
import { usePostHomePage } from '@store/postHomePage/postHomePage';
import { usePostThemeInitial } from '@store/postTheme/useGetPostTheme';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { useStockDesktopInitial } from '@store/stockDesktop/stockDesktop';
import { TOAST_LIMIT } from '@utils/constant';
import { ENV } from '@utils/env';

const AppInitialData = () => {
  const { toasts } = useToasterStore();
  const { run } = useProfileInitial();
  const router = useRouter();
  usePostThemeInitial();
  const { handleRemoveActionPost } = useHandlActionsPost();
  const { initialHomePostData } = usePostHomePage();
  const { userLoginInfo } = useUserLoginInfo();
  useStockDesktopInitial();

  useMount(() => {
    initialHomePostData();
    handleRemoveActionPost();

    run();
  });

  useUpdateEffect(() => {
    if (!userLoginInfo?.id) {
      initialHomePostData();
    }
  }, [userLoginInfo?.id]);

  useEffect(() => {
    const locale = getLocaleCookie() as string;

    if (!getLocaleCookie()) {
      setLocaleCookie('vi');
      router.push(router.asPath, router.asPath, { locale: 'vi' });
      return;
    }

    if (getLocaleCookie() && getLocaleCookie() !== router.locale) {
      router.push(router.asPath, router.asPath, { locale });
    }
  }, []);

  useEffect(() => {
    for (const t of toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT)) {
      toast.dismiss(t.id);
    } // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${ENV.RECAPTHCHA_SITE_KEY}`} />
      <Toaster />
    </>
  );
};

export default AppInitialData;
