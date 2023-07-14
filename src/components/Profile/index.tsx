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
    <profileUserContext.Provider value={profileOtherUser}>
      <Header isMe={Number(props?.userId) === Number(router.query.id)} />
      <MyStory />
    </profileUserContext.Provider>
  );
};
export default Profile;
