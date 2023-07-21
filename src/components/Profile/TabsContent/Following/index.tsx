import React from 'react';

import { useRouter } from 'next/router';

import Search from '@components/common/Search';
import UserFolowDesktop from '@components/common/UserFolowDesktop';
import { useOtherCustomerFollowing } from '@components/ProfileFollow/service';

import NotFound from './NotFound';

const Following = () => {
  const router = useRouter();
  const { data } = useOtherCustomerFollowing(String(router?.query?.id));

  return (
    <>
      <Search />
      <div className='grid grid-cols-4 gap-[14px]'>
        {data?.data?.map((item: any) => (
          <UserFolowDesktop {...item} key={item.id} />
        ))}
      </div>
      {!data?.data?.length && <NotFound />}
    </>
  );
};
export default Following;
