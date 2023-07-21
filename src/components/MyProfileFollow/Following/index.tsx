import React from 'react';

import { useRouter } from 'next/router';

import UserFolow from '@components/common/UserFolow';

import NotFound from './NotFound';
import { useCustomerFollowing } from '../service';

const Following = () => {
  const router = useRouter();
  const { data } = useCustomerFollowing(String(router?.query?.search), String(router?.query?.id));

  return (
    <>
      {!!data?.data?.length && (
        <div className='flex flex-col gap-[8px]'>
          {data?.data?.map((item: any) => (
            <UserFolow {...item} key={item.id} />
          ))}
        </div>
      )}

      {!data?.data?.length && <NotFound />}
    </>
  );
};
export default Following;
