import React from 'react';

import UserFolowDesktop from '@components/common/UserFolowDesktop';
import { useCustomerFollowing } from '@components/MyProfileFollow/service';

const Page = ({
  page = 1,
  setState = () => {},
}: {
  page?: number;
  setState?: (totalPages: any) => void;
}) => {
  const { data, refresh } = useCustomerFollowing(page, {
    onSuccess: (res: any) => {
      setState((prev: any) => ({
        ...prev,
        totalPages: res.totalPages,
        notFound: res.page===1 && res.data.length === 0,
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
