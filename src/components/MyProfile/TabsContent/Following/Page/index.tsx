import React, { useContext, useEffect } from 'react';

import UserFolowDesktop from '@components/common/UserFolowDesktop';
import { profileUserContext } from '@components/MyProfile';
import { useCustomerFollowing } from '@components/MyProfileFollow/service';

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
  const { run, refresh, data } = useCustomerFollowing(
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
  }, [page, fullName]);

  return (
    <>
      {data?.data?.map((item: any) => {
        return (
          <div key={item.id} className='duration-1000 ease-in-out'>
            <UserFolowDesktop
              {...item}
              onUnFollow={() => {
                profileUser.setState((prev: any) => ({
                  ...prev,
                  totalFollowing: prev.totalFollowing - 1,
                }));
                refresh();
              }}
            />
          </div>
        );
      })}
    </>
  );
};
export default Page;
