import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { getLocaleCookie, setLocaleCookie } from '@store/locale';

const Chunk5 = () => {
  const router = useRouter();

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
