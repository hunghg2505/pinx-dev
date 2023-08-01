import React, { createContext, useState } from 'react';

import classNames from 'classnames';

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
          <div className='box-shadow card-style rounded-[8px] bg-white mobile:pb-[20px]'>
            <Header />
            <MyStory />
            <div
              className={classNames('mt-[24px]', {
                'tablet:!mt-[32px]': !profileOtherUser?.caption,
              })}
            >
              <TabsContent />
            </div>
          </div>
        </div>
      </div>
    </profileUserContext.Provider>
  );
};
export default MyProfile;
