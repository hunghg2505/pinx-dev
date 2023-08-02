import React, { useContext, useEffect } from 'react';

import { useRouter } from 'next/router';

import UserFolow from '@components/common/UserFolow';
import { profileUserContext } from '@components/MyProfile';
import { useOtherCustomerFollowing } from '@components/ProfileFollow/service';

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
  const router = useRouter();
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
        profileUser.reload();
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
            <UserFolow {...item} refresh={refresh} />
          </div>
        );
      })}
    </>
  );
};
export default Page;
