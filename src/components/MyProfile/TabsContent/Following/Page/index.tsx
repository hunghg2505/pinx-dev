import React, { useContext } from 'react';

import UserFolowDesktop from '@components/common/UserFolowDesktop';
import { profileUserContext } from '@components/MyProfile';
import { useCustomerFollowing } from '@components/MyProfileFollow/service';

const Page = ({
  page = 1,
  setState = () => {},
}: {
  page?: number;
  setState?: (totalPages: any) => void;
}) => {
  const profileUser = useContext<any>(profileUserContext);
  const { data, refresh } = useCustomerFollowing(page, {
    onSuccess: (res: any) => {
      console.log('profileUser', profileUser);
      profileUser.refresh();
      setState((prev: any) => ({
        ...prev,
        totalPages: res?.totalPages,
        notFound: res?.page === 1 && !!res?.data?.length,
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
