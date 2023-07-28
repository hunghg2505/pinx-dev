import { useEffect } from 'react';

import { useMount } from 'ahooks';
import { useRouter } from 'next/router';
import Script from 'next/script';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

import { useHandlActionsPost } from '@hooks/useHandlActionsPost';
import { useAuth } from '@store/auth/useAuth';
import { getLocaleCookie, setLocaleCookie } from '@store/locale';
import { usePostThemeInitial } from '@store/postTheme/useGetPostTheme';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { TOAST_LIMIT } from '@utils/constant';
import { ENV } from '@utils/env';

const AppInitialData = () => {
  const { toasts } = useToasterStore();
  const { run } = useProfileInitial();
  const { isLogin } = useAuth();
  const router = useRouter();
  usePostThemeInitial();
  const { handleRemoveActionPost } = useHandlActionsPost();

  useMount(() => {
    handleRemoveActionPost();

    if (isLogin) {
      run();
    }
  });

  useEffect(() => {
    const locale = getLocaleCookie() as string;

    if (!getLocaleCookie()) {
      setLocaleCookie('vi');
      router.push(router.asPath, router.asPath, { locale: 'vi' });
      return;
    }

    router.push(router.asPath, router.asPath, { locale });
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
