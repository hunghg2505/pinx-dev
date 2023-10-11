import React, { useContext, useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';

import UserFolow from '@components/common/UserFolow';
import { profileUserContext } from '@components/MyProfile';
import { useOtherCustomerFollower } from '@components/ProfileFollow/service';

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
  const { profileSlug }: any = router.query;
  const userId = useMemo(() => {
    return profileSlug.split('-').pop();
  }, [profileSlug]);

  const { data, refresh, run } = useOtherCustomerFollower(
    String(userId),
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
