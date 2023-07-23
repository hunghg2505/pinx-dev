import React, { useContext } from 'react';

import { useRouter } from 'next/router';

import UserFolow from '@components/common/UserFolow';
import { profileUserContext } from '@components/MyProfile';
import { useOtherCustomerFollower } from '@components/ProfileFollow/service';

const Page = ({
  page = 1,
  setState = () => {},
}: {
  page?: number;
  setState?: (totalPages: any) => void;
}) => {
  const profileUser = useContext<any>(profileUserContext);
  const router = useRouter();
  const { data, refresh } = useOtherCustomerFollower(String(router?.query?.id), page, {
    onSuccess: (res: any) => {
      setState((prev: any) => ({
        ...prev,
        totalPages: res?.totalPages,
        notFound: page === 1 && !res?.data?.length,
      }));
      profileUser.reload();
    },
  });
  return (
    <>
      {data?.data?.map((item: any) => {
        return (
          <div key={item.id}>
            <UserFolow {...item} refresh={refresh} />
          </div>
        );
      })}
    </>
  );
};
export default Page;
