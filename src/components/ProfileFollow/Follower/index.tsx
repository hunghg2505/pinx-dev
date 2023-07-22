import React from 'react';

import { useRouter } from 'next/router';

import UserFolow from '@components/common/UserFolow';

import NotFound from './NotFound';
import { useOtherCustomerFollower } from '../service';

const Follower = () => {
  const router = useRouter();
  const { data } = useOtherCustomerFollower(
    String(router?.query?.search),
    String(router?.query?.id),
  );

  return (
    <div className='flex flex-col gap-[8px]'>
      {!!data?.data?.length && (
        <>
          {data?.data?.map((item: any) => (
            <UserFolow {...item} key={item.id} />
          ))}
        </>
      )}
      {!data?.data?.length && <NotFound />}
    </div>
  );
};
export default Follower;
