import { forwardRef, memo, useEffect, useImperativeHandle } from 'react';

import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';

import { MainButton, SemiMainButton } from '@components/UI/Button';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useAuth } from '@store/auth/useAuth';
import { openProfileAtom } from '@store/profile/profile';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { ROUTE_PATH } from '@utils/common';
import { AUTH_TAB_TYPE } from 'src/constant';

import Back from './Back';
import BasicInfo from './BasicInfo';
import Follow from './Follow';
import Options from './Options';
import UpdateAccount from './UpdateAccount';

const MenuProfile = forwardRef((_, ref) => {
  const { userLoginInfo } = useUserLoginInfo();
  const { run: requestUserProfile } = useProfileInitial();
  const router = useRouter();
  const { isLogin } = useAuth();
  const [openProfileMenu, setOpenProfileMenu] = useAtom(openProfileAtom);

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

  const close = () => {
    setOpenProfileMenu(false);
  };

  const open = () => {
    setOpenProfileMenu(true);
  };

  useImperativeHandle(ref, () => ({ close, open }));

  useEffect(() => {
    if (openProfileMenu) {
      requestUserProfile();
    }
  }, [openProfileMenu]);
  return (
    <div
      className={classNames(
        'fixed left-0 top-0 z-[9999] h-screen  w-full overflow-scroll bg-white duration-300 ease-out laptop:hidden',
        {
          'translate-x-[100%]': !openProfileMenu,
        },
      )}
    >
      <Back close={close} />
      <BasicInfo
        userName={userLoginInfo?.displayName || 'Anonymous User'}
        avatar={userLoginInfo?.avatar || '/static/images/guest_avatar.png'}
        status={
          userLoginInfo.acntStat === 'ACTIVE'
            ? 'Verified'
            : String(userLoginInfo.acntStat === 'VSD_PENDING' ? 'Pendding' : 'Unverified')
        }
        close={close}
      />
      {isLogin ? (
        <>
          <Follow
            follower={userLoginInfo?.totalFollower || 0}
            following={userLoginInfo?.totalFollowing || 0}
            close={close}
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
