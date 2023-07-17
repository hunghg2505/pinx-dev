import React, { createContext } from 'react';

import { useRouter } from 'next/router';

import { useGetProfileOtherUser } from '@components/MenuProfile/service';

import Header from './Header';
import MyStory from './MyStory';
import RightBar from './RightBar';

export const profileUserContext = createContext(undefined);

const Profile = (props: any) => {
  const router = useRouter();
  const { profileOtherUser } = useGetProfileOtherUser(Number(router.query.id));
  return (
    <profileUserContext.Provider
      value={{
        ...profileOtherUser,
        isMe: Number(props?.userId) === Number(router.query.id),
      }}
    >
      <div className=' flex '>
        <div className='w-full '>
          <div className='rounded-[8px] bg-white shadow-[0_1px_2px_0px_rgba(88,102,126,0.12)] tablet:px-[24px] tablet:py-[20px]'>
            <Header />
            <MyStory />
            <RightBar />
          </div>
        </div>
      </div>
    </profileUserContext.Provider>
  );
};
export default Profile;
