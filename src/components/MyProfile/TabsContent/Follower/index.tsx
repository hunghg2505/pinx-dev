import React from 'react';

import { useRouter } from 'next/router';

import Search from '@components/common/Search';
import UserFolow from '@components/common/UserFolow';
import { useCustomerFollower } from '@components/MyProfileFollow/service';

import NotFound from './NotFound';

const Follower = () => {
  const router = useRouter();
  const { data } = useCustomerFollower(String(router?.query?.search), String(router?.query?.id));

  return (
    <>
      <Search />
      <div className='flex flex-col gap-[8px]'>
        {!!data?.data?.length && (
          <>
            {data?.data?.map((item: any) => (
              <UserFolow {...item} key={item.id} />
            ))}
          </>
        )}
      </div>
      {!data?.data?.length && <NotFound />}
    </>
  );
};
export default Follower;
