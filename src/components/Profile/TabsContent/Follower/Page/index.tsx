import React, { useContext, useEffect } from 'react';

import { useRouter } from 'next/router';

import UserFolowDesktop from '@components/common/UserFolowDesktop';
import { profileUserContext } from '@components/Profile';
import { useOtherCustomerFollower } from '@components/ProfileFollow/service';
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
  const router = useRouter();
  const profileUser = useContext<any>(profileUserContext);
  const { setUserLoginInfo } = useUserLoginInfo();
  const { data, refresh, run } = useOtherCustomerFollower(
    String(router?.query?.id),
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
          notFound: !res?.totalElements,
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
          <div key={item.id}>
            <UserFolowDesktop
              {...item}
              refresh={() => {
                refresh();
                profileUser.reload();
              }}
              onUnFollow={() => {
                setUserLoginInfo((prev: any) => ({
                  ...prev,
                  totalFollowing: prev.totalFollowing - 1,
                }));
              }}
              onFollow={() => {
                setUserLoginInfo((prev: any) => ({
                  ...prev,
                  totalFollowing: prev.totalFollowing + 1,
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
