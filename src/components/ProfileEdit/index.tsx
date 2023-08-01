import React, { createContext, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { useGetProfileOtherUser } from '@components/MenuProfile/service';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useProfileInitial } from '@store/profile/useProfileInitial';

export const profileUserContext = createContext<any>(undefined);
const FormEdit = dynamic(() => import('./FormEdit'));
const FormDesktop = dynamic(() => import('./FormDesktop'));
const Profile = () => {
  const { userLoginInfo } = useUserLoginInfo();
  // warning, do not delete this line, if not data will not refresh after user update profile
  const { profileOtherUser } = useGetProfileOtherUser(Number(userLoginInfo?.id));
  const { run } = useProfileInitial();
  const [state, setState] = useState({ mobile: false });
  useEffect(() => {
    return window.innerWidth >= 768 ? setState({ mobile: false }) : setState({ mobile: true });
  }, []);
  return (
    <profileUserContext.Provider
      value={{
        ...userLoginInfo,
        ...profileOtherUser,
        reload: run,
      }}
    >
      <div className='p-[10px] desktop:p-0'>
        <div className='box-shadow card-style w-full overflow-hidden rounded-[8px] bg-white'>
          {state.mobile ? <FormEdit /> : <FormDesktop />}
        </div>
      </div>
    </profileUserContext.Provider>
  );
};
export default Profile;
