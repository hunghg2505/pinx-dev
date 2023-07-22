import React from 'react';

import { useRouter } from 'next/router';

import UserFolowDesktop from '@components/common/UserFolowDesktop';
import { useOtherCustomerFollower } from '@components/ProfileFollow/service';

const Page = ({
  page = 1,
  setState = () => {},
}: {
  page?: number;
  setState?: (totalPages: any) => void;
}) => {
  const router = useRouter();
  const { data, refresh } = useOtherCustomerFollower(String(router?.query?.id), page, {
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
