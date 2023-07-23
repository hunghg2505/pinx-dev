import React, { useContext } from 'react';

import { useRouter } from 'next/router';

import UserFolowDesktop from '@components/common/UserFolowDesktop';
import { profileUserContext } from '@components/Profile';
import { useOtherCustomerFollowing } from '@components/ProfileFollow/service';

const Page = ({
  page = 1,
  setState = () => {},
}: {
  page?: number;
  setState?: (state: any) => void;
}) => {
  const router = useRouter();
  const profileUser = useContext<any>(profileUserContext);
  const { data, refresh } = useOtherCustomerFollowing(String(router?.query?.id), page, {
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
            <UserFolowDesktop {...item} refresh={refresh} />
          </div>
        );
      })}
    </>
  );
};
export default Page;
