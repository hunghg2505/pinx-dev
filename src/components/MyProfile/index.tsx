import React, { createContext } from 'react';

import { useGetProfileOtherUser } from '@components/MenuProfile/service';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';

import Header from './Header';
import MyStory from './MyStory';
import TabsContent from './TabsContent';

export const profileUserContext = createContext<any>(undefined);

const MyProfile = () => {
  const { userLoginInfo } = useUserLoginInfo();
  const { profileOtherUser, run } = useGetProfileOtherUser(Number(userLoginInfo?.id));
  return (
    <profileUserContext.Provider
      value={{
        ...userLoginInfo,
        ...profileOtherUser,
        isKol: profileOtherUser?.isFeatureProfile,
        reload: run,
      }}
    >
      <div className=' flex '>
        <div className='w-full '>
          <div className='rounded-[8px] bg-white shadow-[0_1px_2px_0px_rgba(88,102,126,0.12)] mobile:pb-[20px] tablet:px-[24px] tablet:py-[20px]'>
            <Header />
            <MyStory />
            <TabsContent />
          </div>
        </div>
      </div>
    </profileUserContext.Provider>
  );
};
export default MyProfile;
