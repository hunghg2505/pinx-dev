import React, { useContext, useEffect } from 'react';

import { useRouter } from 'next/router';

import UserFolowDesktop from '@components/common/UserFolowDesktop';
import { profileUserContext } from '@components/Profile';
import { useOtherCustomerFollowing } from '@components/ProfileFollow/service';

const Page = ({
  page,
  fullName,
  setState = () => {},
}: {
  page?: number;
  fullName?: string;
  setState?: (state: any) => void;
}) => {
  const router = useRouter();
  const profileUser = useContext<any>(profileUserContext);
  const { data, refresh, run } = useOtherCustomerFollowing(
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
                profileUser.reload();
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
