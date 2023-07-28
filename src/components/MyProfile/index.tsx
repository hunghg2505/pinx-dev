import React, { createContext, useState } from 'react';

import { useGetProfileOtherUser } from '@components/MenuProfile/service';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';

import Header from './Header';
import MyStory from './MyStory';
import TabsContent from './TabsContent';

export const profileUserContext = createContext<any>(undefined);

const MyProfile = () => {
  const { userLoginInfo } = useUserLoginInfo();
  const { profileOtherUser, run } = useGetProfileOtherUser(Number(userLoginInfo?.id), {
    onSuccess: (res: any) => {
      setState({
        ...res.data,
        followingKey: Date.now(),
        followerKey: Date.now(),
      });
    },
  });
  const [state, setState] = useState({
    ...userLoginInfo,
    ...profileOtherUser,
    followingKey: Date.now(),
    followerKey: Date.now(),
  });
  return (
    <profileUserContext.Provider
      value={{
        ...state,
        reload: async () => {
          await run();
        },
        setState,
      }}
    >
      <div className=' flex min-h-screen'>
        <div className='w-full '>
          <div className='rounded-[8px] bg-white shadow-[0_1px_2px_0px_rgba(88,102,126,0.12)] mobile:pb-[20px] tablet:px-[20px] tablet:py-[20px]'>
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
