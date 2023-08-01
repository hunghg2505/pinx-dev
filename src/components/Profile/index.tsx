import React, { createContext } from 'react';

import classNames from 'classnames';
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
            <div className='box-shadow border-[1px] border-solid border-[#EBEBEB] bg-[white] p-[12px] mobile:pb-[20px] desktop:p-[16px]'>
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
        {loading && <Loading />}
      </>
    </profileUserContext.Provider>
  );
};
export default Profile;
