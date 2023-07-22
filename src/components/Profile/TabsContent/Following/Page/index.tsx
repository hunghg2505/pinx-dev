import React from 'react';

import { useRouter } from 'next/router';

import UserFolowDesktop from '@components/common/UserFolowDesktop';
import { useOtherCustomerFollowing } from '@components/ProfileFollow/service';

const Page = ({
  page = 1,
  setState = () => {},
}: {
  page?: number;
  setState?: (state: any) => void;
}) => {
  const router = useRouter();
  const { data, refresh } = useOtherCustomerFollowing(String(router?.query?.id), page, {
    onSuccess: (res: any) => {
      setState((prev: any) => ({
        ...prev,
        totalPages: res?.totalPages,
        notFound: res?.data?.length < 1,
      }));
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
