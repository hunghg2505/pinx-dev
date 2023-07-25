import React, { createContext } from 'react';

import { useRouter } from 'next/router';

import Header from './Header';
import MyStory from './MyStory';
import { useGePrivatetProfileOtherUser } from './service';
import TabsContent from './TabsContent';

export const profileUserContext = createContext(undefined);

const Profile = (props: any) => {
  const router = useRouter();
  const {
    privateProfileOtherUser,
    run: runPrivate,
    refresh: RefreshPrivate,
  } = useGePrivatetProfileOtherUser(Number(router.query.id));
  return (
    <profileUserContext.Provider
      value={{
        ...props.data.data,
        ...privateProfileOtherUser,
        reload: runPrivate,
        refresh: RefreshPrivate,
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
export default Profile;
