import React, { createContext } from 'react';

import { useRouter } from 'next/router';

import { useGetProfileOtherUser } from '@components/MenuProfile/service';

import Header from './Header';
import MyStory from './MyStory';

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
      <div className='mx-[-7.5px] mt-[-68px] flex desktop:mx-0 desktop:mt-0 '>
        <div className='mobile:mr-0 mobile:w-full tablet:mr-[15px] tablet:w-[calc(100%_-_265px)] laptop:w-[calc(100%_-_365px)] desktop:mr-[24px] desktop:w-[calc(100%_-_350px)] xdesktop:w-[750px]'>
          <div className='rounded-[8px] bg-white shadow-[0_1px_2px_0px_rgba(88,102,126,0.12)] tablet:px-[24px] tablet:py-[20px]'>
            <Header />
            <MyStory />
          </div>
        </div>
      </div>
    </profileUserContext.Provider>
  );
};
export default Profile;
