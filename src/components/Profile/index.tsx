import React, { createContext } from 'react';

import { useRouter } from 'next/router';

import { useGetProfileOtherUser } from '@components/MenuProfile/service';
import Loading from '@components/UI/Loading';
import { ROUTE_PATH } from '@utils/common';

import Header from './Header';
import MyStory from './MyStory';
import TabsContent from './TabsContent';

export const profileUserContext = createContext(undefined);

const Profile = () => {
  const router = useRouter();
  const {
    profileOtherUser,
    run: runPrivate,
    refresh: RefreshPrivate,
    loading,
  } = useGetProfileOtherUser(Number(router.query.id), {
    onError: () => {
      router.replace(ROUTE_PATH.NOT_FOUND);
    },
  });

  return (
    <profileUserContext.Provider
      value={{
        ...profileOtherUser,
        reload: runPrivate,
        refresh: RefreshPrivate,
      }}
    >
      <>
        <div className=' flex '>
          <div className='w-full '>
            <div className='rounded-[8px] bg-white shadow-[0_1px_2px_0px_rgba(88,102,126,0.12)] mobile:pb-[20px] tablet:px-[20px] tablet:py-[20px]'>
              <Header />
              <MyStory />
              <TabsContent />
            </div>
          </div>
        </div>
        {loading && <Loading />}
      </>
    </profileUserContext.Provider>
  );
};
export default Profile;
