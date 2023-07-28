import React, { createContext, useState } from 'react';

import { useAuth } from '@store/auth/useAuth';

import Figure from './Figure';
import Caption from './Figure/Caption';
import Follow from './Follow';
import UnFollow from './UnFollow';

export const followContext = createContext<any>(undefined);

const UserFolowDesktop = (props: any) => {
  const { isLogin } = useAuth();
  const [state, setState] = useState(props);
  return (
    <followContext.Provider
      value={{
        onFollow: () => {},
        onUnFollow: () => {},
        ...state,
        setState,
      }}
    >
      <div className='shadow-[0px_4px_13px_0px_rgba(88, 157, 192, 0.30)] relative overflow-hidden rounded-[12px] pt-[156%] ease-in-out duration-300'>
        <Figure />
        <Caption />
        {!isLogin && <UnFollow />}
        {isLogin && state?.isFollowed ? <UnFollow /> : <Follow />}
      </div>
    </followContext.Provider>
  );
};
export default UserFolowDesktop;
