import React from 'react';

import { useRouter } from 'next/router';

import Search from '@components/common/Search';
import UserFolow from '@components/common/UserFolow';
import { useCustomerFollowing } from '@components/ProfileFollow/service';

import NotFound from './NotFound';

const Following = () => {
  const router = useRouter();
  const { data } = useCustomerFollowing(String(router?.query?.search), String(router?.query?.id));

  return (
    <>
      <Search />
      {!!data?.data?.length && (
        <>
          {!!data?.data?.length && (
            <>
              {data?.data?.map((item: any) => (
                <UserFolow {...item} key={item.id} />
              ))}
            </>
          )}
        </>
      )}
      {!data?.data?.length && <NotFound />}
    </>
  );
};
export default Following;