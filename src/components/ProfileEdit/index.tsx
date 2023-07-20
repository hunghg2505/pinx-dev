import React, { createContext, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useProfileInitial } from '@store/profile/useProfileInitial';

export const profileUserContext = createContext<any>(undefined);
const FormEdit = dynamic(() => import('./FormEdit'));
const FormDesktop = dynamic(() => import('./FormDesktop'));
const Profile = () => {
  const { userLoginInfo } = useUserLoginInfo();
  const { run } = useProfileInitial();
  const [state, setState] = useState({ mobile: false });
  useEffect(() => {
    return window.innerWidth >= 768 ? setState({ mobile: false }) : setState({ mobile: true });
  }, []);
  return (
    <profileUserContext.Provider
      value={{
        ...userLoginInfo,
        reload: run,
      }}
    >
      <div className='w-full  overflow-hidden  rounded-[8px] bg-neutral_08 [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)]'>
        {state.mobile ? <FormEdit /> : <FormDesktop />}
      </div>
    </profileUserContext.Provider>
  );
};
export default Profile;
