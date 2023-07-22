import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import PopupAccessLimit from '@components/UI/Popup/PopupAccessLimit';
import { useAuth } from '@store/auth/useAuth';

import ComponentWatchList from './ComponentWatchList';

const WatchList = () => {
  const { isLogin } = useAuth();
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!isLogin && router?.query?.tab === 'watchlist') {
      setVisible(true);
    }
  }, [router.query]);
  return (
    <>
      {isLogin && <ComponentWatchList isEdit={false} />}
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
export default WatchList;
