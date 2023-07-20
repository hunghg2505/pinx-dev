import { forwardRef, memo, useImperativeHandle, useState } from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';

import { MainButton, SemiMainButton } from '@components/UI/Button';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH, isUserVerified } from '@utils/common';
import { AUTH_TAB_TYPE } from 'src/constant';

import Back from './Back';
import BasicInfo from './BasicInfo';
import Follow from './Follow';
import Options from './Options';
import UpdateAccount from './UpdateAccount';

const MenuProfile = forwardRef((_, ref) => {
  const { userLoginInfo } = useUserLoginInfo();
  const router = useRouter();
  const { isLogin } = useAuth();

  const goToLogin = () => {
    router.push(ROUTE_PATH.LOGIN);
  };

  const goToRegister = () => {
    router.push({
      pathname: ROUTE_PATH.LOGIN,
      query: {
        type: AUTH_TAB_TYPE.REGISTER,
      },
    });
  };
  const [state, setState] = useState({
    open: false,
  });
  const close = () => {
    setState((prev) => ({ ...prev, open: false }));
  };
  const open = () => {
    setState((prev) => ({ ...prev, open: true }));
  };
  useImperativeHandle(ref, () => ({ close, open }));

  return (
    <div
      className={classNames(
        'fixed left-0 top-0 z-50 h-screen w-full  bg-white duration-300 ease-out',
        {
          'translate-x-[-100%]': !state.open,
        },
      )}
    >
      <Back close={close} />
      <BasicInfo
        userName={userLoginInfo?.displayName || 'Anonymous User'}
        avatar={userLoginInfo?.avatar || '/static/images/guest_avatar.png'}
        status={isUserVerified(userLoginInfo.acntStat) ? 'Verified' : 'Unverified'}
      />
      {isLogin ? (
        <>
          <Follow
            follower={userLoginInfo?.totalFollower || 0}
            following={userLoginInfo?.totalFollowing || 0}
          />
          <UpdateAccount />
        </>
      ) : (
        <div className='mb-5 flex justify-between px-8'>
          <div className='w-[45%]'>
            <SemiMainButton
              className='w-full shadow-[0px_2px_4px_0px_rgba(53,157,217,0.30)]'
              onClick={goToLogin}
            >
              Log in
            </SemiMainButton>
          </div>
          <div className='w-[45%]'>
            <MainButton
              className='w-full shadow-[0px_2px_4px_0px_rgba(53,157,217,0.30)]'
              onClick={goToRegister}
            >
              Sign up
            </MainButton>
          </div>
        </div>
      )}

      <Options />
    </div>
  );
});

export default memo(MenuProfile);
