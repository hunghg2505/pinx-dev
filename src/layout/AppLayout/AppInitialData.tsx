import { useEffect } from 'react';

import { useMount } from 'ahooks';
import { useAtom } from 'jotai';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

import { useAuth } from '@store/auth/useAuth';
import { openProfileAtom } from '@store/profile/profile';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { disableScroll, enableScroll } from '@utils/common';
import { TOAST_LIMIT } from '@utils/constant';

const AppInitialData = () => {
  const { toasts } = useToasterStore();
  const { run } = useProfileInitial();
  const { isLogin } = useAuth();
  const [openProfileMenu] = useAtom(openProfileAtom);

  useMount(() => {
    if (isLogin) {
      run();
    }
  });

  useEffect(() => {
    for (const t of toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT)) {
      toast.dismiss(t.id);
    } // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  useEffect(() => {
    if (openProfileMenu) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [openProfileMenu]);

  return (
    <>
      <Toaster />
    </>
  );
};

export default AppInitialData;
