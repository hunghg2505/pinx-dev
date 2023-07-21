import React from 'react';

import { useRouter } from 'next/router';

import Search from '@components/common/Search';
import UserFolow from '@components/common/UserFolow';
import { useOtherCustomerFollowing } from '@components/ProfileFollow/service';

import NotFound from './NotFound';

const Following = () => {
  const router = useRouter();
  const { data } = useOtherCustomerFollowing(String(router?.query?.id));
  
  return (
    <>
      <Search />
      <div className='flex flex-col gap-[8px]'>
        {data?.data?.map((item: any) => (
          <UserFolow {...item} key={item.id} />
        ))}
      </div>
      {!data?.data?.length && <NotFound />}
    </>
  );
};
export default Following;
