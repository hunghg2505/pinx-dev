import { useEffect } from 'react';

import { useUpdateEffect } from 'ahooks';
import { useRouter } from 'next/router';

import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { getLocaleCookie, setLocaleCookie } from '@store/locale';
import { usePostHomePage } from '@store/postHomePage/postHomePage';
import { usePostThemeInitial } from '@store/postTheme/useGetPostTheme';

const Chunk5 = () => {
  const router = useRouter();
  usePostThemeInitial();
  const { initialHomePostData } = usePostHomePage();
  const { userLoginInfo } = useUserLoginInfo();

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

  return <></>;
};

export default Chunk5;
