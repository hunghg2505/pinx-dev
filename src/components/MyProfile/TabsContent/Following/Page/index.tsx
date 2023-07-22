import React from 'react';

import UserFolowDesktop from '@components/common/UserFolowDesktop';
import { useCustomerFollowing } from '@components/MyProfileFollow/service';

import NotFound from './NotFound';

const Page = ({
  page = 1,
  setTotalPages = () => {},
}: {
  page?: number;
  setTotalPages?: (totalPages: number) => void;
}) => {
  const { data, refresh } = useCustomerFollowing(page, {
    onSuccess: (res: any) => {
      setTotalPages(res.totalPages);
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
      {data?.data?.page === 1 && !data?.data?.length && <NotFound />}
    </>
  );
};
export default Page;
