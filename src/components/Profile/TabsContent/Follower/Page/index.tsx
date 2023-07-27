import React, { useContext } from 'react';

import { useRouter } from 'next/router';

import UserFolowDesktop from '@components/common/UserFolowDesktop';
import { profileUserContext } from '@components/Profile';
import { useOtherCustomerFollower } from '@components/ProfileFollow/service';

const Page = ({
  page = 1,
  setState = () => {},
}: {
  page?: number;
  setState?: (totalPages: any) => void;
}) => {
  const router = useRouter();
  const profileUser = useContext<any>(profileUserContext);
  const { data, refresh } = useOtherCustomerFollower(String(router?.query?.id), page, {
    onSuccess: (res: any) => {
      setState((prev: any) => ({
        ...prev,
        totalPages: res?.totalPages,
        notFound: page === 1 && !res?.data?.length,
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
              refresh={() => {
                refresh();
                profileUser.reload();
              }}
            />
          </div>
        );
      })}
    </>
  );
};
export default Page;
