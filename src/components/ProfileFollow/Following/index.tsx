import React from 'react';

import { useRouter } from 'next/router';

import UserFolow from '@components/common/UserFolow';

import NotFound from './NotFound';
import { useOtherCustomerFollowing } from '../service';

const Following = () => {
  const router = useRouter();
  const { data } = useOtherCustomerFollowing(
    String(router?.query?.search),
    String(router?.query?.id),
  );
  console.log(data);

  return (
    <>
      {!!data?.data?.length && (
        <div className='mb-[20px] flex flex-col gap-[8px]'>
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
