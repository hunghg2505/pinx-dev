import React, { createContext } from 'react';

import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useProfileInitial } from '@store/profile/useProfileInitial';

import FormEdit from './FormEdit';

export const profileUserContext = createContext<any>(undefined);

const Profile = () => {
  const { userLoginInfo } = useUserLoginInfo();
  const { run } = useProfileInitial();
  return (
    <profileUserContext.Provider
      value={{
        ...userLoginInfo,
        reload: run,
      }}
    >
      <div className='w-full  bg-neutral_08'>
        <FormEdit />
      </div>
    </profileUserContext.Provider>
  );
};
export default Profile;
