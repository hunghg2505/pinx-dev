import { memo } from 'react';

import { useRouter } from 'next/router';

import { MainButton, SemiMainButton } from '@components/UI/Button';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';
import { AUTH_TAB_TYPE } from 'src/constant';

import BasicInfo from './BasicInfo';
import Follow from './Follow';
import Options from './Options';
import UpdateAccount from './UpdateAccount';

const MenuProfile = () => {
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

  return (
    <>
      <BasicInfo
        userName={userLoginInfo?.username || 'Anonymous User'}
        avatar={userLoginInfo?.avatar || '/static/images/guest_avatar.png'}
        status={isLogin ? (userLoginInfo.acntStat === 'ACTIVE' ? 'Verified' : 'Unverified') : ''}
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
        <div className='flex px-8 justify-between mb-5'>
          <div className='w-[45%]'>
            <SemiMainButton className='w-full shadow-[0px_2px_4px_0px_rgba(53,157,217,0.30)]' onClick={goToLogin}>Log in</SemiMainButton>
          </div>
          <div className='w-[45%]'>
            <MainButton className='w-full shadow-[0px_2px_4px_0px_rgba(53,157,217,0.30)]' onClick={goToRegister}>Sign up</MainButton>
          </div>
        </div >
      )}

      <Options />
    </>
  );
};

export default memo(MenuProfile);
