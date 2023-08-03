import React, { useContext, useEffect } from 'react';

import UserFolow from '@components/common/UserFolow';
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
  const { data, refresh, run } = useCustomerFollowing(
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
