import React from 'react';

import { useRouter } from 'next/router';

import Search from '@components/common/Search';
import UserFolowDesktop from '@components/common/UserFolowDesktop';
import { useCustomerFollowing } from '@components/MyProfileFollow/service';
import useLoadMore from '@utils/useLoadmore';

import NotFound from './NotFound';

const Following = () => {
  const router = useRouter();
  const { data, run } = useCustomerFollowing(
    String(router?.query?.search),
    String(router?.query?.id),
  );
  const { lastElementRef } = useLoadMore(run);
  return (
    <>
      <Search />
      <div className='grid grid-cols-4 gap-[14px]'>
        {data?.data?.map((item: any, index: number) => {
          return index + 1 === data?.data.length ? (
            <UserFolowDesktop {...item} key={item.id} ref={lastElementRef} />
          ) : (
            <UserFolowDesktop {...item} key={item.id} />
          );
        })}
      </div>
      {!data?.data?.length && <NotFound />}
    </>
  );
};
export default Following;
