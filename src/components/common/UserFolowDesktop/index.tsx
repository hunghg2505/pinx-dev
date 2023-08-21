import React, { createContext, useState } from 'react';

import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useAuth } from '@store/auth/useAuth';

import Figure from './Figure';
import Caption from './Figure/Caption';
import Follow from './Follow';
import UnFollow from './UnFollow';

export const followContext = createContext<any>(undefined);

const UserFolowDesktop = (props: any) => {
  const { isLogin } = useAuth();
  const { userLoginInfo } = useUserLoginInfo();
  const [state, setState] = useState(props);
  const isMyProfile = userLoginInfo?.id === state.id;
  return (
    <followContext.Provider
      value={{
        onFollow: () => {},
        onUnFollow: () => {},
        ...state,
        setState,
      }}
    >
      <div className='shadow-[0px_4px_13px_0px_rgba(88, 157, 192, 0.30)] relative overflow-hidden rounded-[12px] pt-[156%] duration-300 ease-in-out'>
        <Figure />
        <Caption />
        {!isMyProfile && (
          <>
            {!isLogin && <UnFollow />}
            {isLogin && state?.isFollowed ? <UnFollow /> : <Follow />}
          </>
        )}
      </div>
    </followContext.Provider>
  );
};
export default UserFolowDesktop;
