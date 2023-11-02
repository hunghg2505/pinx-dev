import React, { createContext } from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';

import { useGetProfileOtherUser } from '@components/MenuProfile/service';
import Loading from '@components/UI/Loading';
import { NOT_FOUND } from 'src/constant/route';

import Header from './Header';
import MyStory from './MyStory';
import TabsContent from './TabsContent';

export const profileUserContext = createContext(undefined);

interface ProfileProps {
  userId: number;
}

const Profile = ({ userId }: ProfileProps) => {
  const router = useRouter();
  const {
    profileOtherUser,
    run: runPrivate,
    refresh: RefreshPrivate,
  } = useGetProfileOtherUser(Number(userId), {
    onError: () => {
      router.replace(NOT_FOUND);
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
        {profileOtherUser ? (
          <div className='flex '>
            <div className='w-full '>
              <div className='box-shadow rounded-[8px] border-[1px] border-solid border-[#EBEBEB] bg-[white] p-[12px] mobile:pb-[20px] desktop:p-[16px]'>
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
        ) : (
          <div className='flex items-center justify-center'>
            <Loading />
          </div>
        )}
      </>
    </profileUserContext.Provider>
  );
};
export default Profile;
