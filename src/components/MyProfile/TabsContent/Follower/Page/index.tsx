import React, { useContext, useEffect } from 'react';

import UserFolowDesktop from '@components/common/UserFolowDesktop';
import { profileUserContext } from '@components/MyProfile';
import { useCustomerFollower } from '@components/MyProfileFollow/service';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';

const Page = ({
  page,
  fullName,
  setState = () => {},
}: {
  page?: number;
  fullName?: string;
  setState?: (totalPages: any) => void;
}) => {
  const profileUser = useContext<any>(profileUserContext);
  const { setUserLoginInfo } = useUserLoginInfo();
  const { data, run } = useCustomerFollower(
    {
      page,
      fullName,
    },
    {
      manual: true,
      onSuccess: (res: any) => {
        setState((prev: any) => ({
          ...prev,
          totalPages: res?.totalPages,
        }));
      },
    },
  );

  useEffect(() => {
    run();
  }, [fullName]);

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
                setUserLoginInfo((prev: any) => ({
                  ...prev,
                  totalFollowing: prev.totalFollowing + 1,
                }));
              }}
              onUnFollow={() => {
                profileUser.setState((prev: any) => ({
                  ...prev,
                  totalFollowing: prev.totalFollowing - 1,
                }));
                setUserLoginInfo((prev: any) => ({
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
