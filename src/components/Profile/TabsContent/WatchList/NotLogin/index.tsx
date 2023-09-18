import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import PopupAccessLimit from '@components/UI/Popup/PopupAccessLimit';
import { useLogin } from '@store/auth/hydrateAuth';

const NotLogin = () => {
  const router = useRouter();
  const { isLogin } = useLogin();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!isLogin && router?.query?.tab === 'watchlist') {
      setVisible(true);
    }
  }, [router.query]);

  return (
    <>
      {!isLogin && (
        <PopupAccessLimit
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
        />
      )}
    </>
  );
};
export default NotLogin;
