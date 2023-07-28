import React, { useContext } from 'react';

import UserFolowDesktop from '@components/common/UserFolowDesktop';
import { profileUserContext } from '@components/MyProfile';
import { useCustomerFollower } from '@components/MyProfileFollow/service';

const Page = ({
  page = 1,
  setState = () => {},
}: {
  page?: number;
  setState?: (totalPages: any) => void;
}) => {
  const profileUser = useContext<any>(profileUserContext);
  const { data } = useCustomerFollower(page, {
    onSuccess: (res: any) => {
      setState((prev: any) => ({
        ...prev,
        totalPages: res?.totalPages,
      }));
    },
  });
  return (
    <>
      {data?.data?.map((item: any) => {
        return (
          <div key={item.id}>
            <UserFolowDesktop
              {...item}
              onFollow={() => {
                profileUser.setState((prev: any) => ({
                  ...prev,
                  totalFollowing: prev.totalFollowing + 1,
                }));
              }}
              onUnFollow={() => {
                profileUser.setState((prev: any) => ({
                  ...prev,
                  totalFollowing: prev.totalFollowing - 1,
                }));
              }}
            />
          </div>
        );
      })}
    </>
  );
};
export default Page;
