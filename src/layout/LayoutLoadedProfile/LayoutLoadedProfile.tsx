import React from 'react';

import Loading from '@components/UI/Loading';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';

interface IPropsLayoutLoadedProfile {
  children: React.ReactNode;
}

const LayoutLoadedProfile = ({ children }: IPropsLayoutLoadedProfile) => {
  const { userLoginInfo } = useUserLoginInfo();

  if (!userLoginInfo?.id) {
    return (
      <div className='flex items-center justify-center'>
        <Loading />
      </div>
    );
  }

  return <>{children}</>;
};

export default LayoutLoadedProfile;
