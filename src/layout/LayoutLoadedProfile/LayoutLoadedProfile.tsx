import React from 'react';

import Loading from '@components/UI/Loading';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';

interface IPropsLayoutLoadedProfile {
  children: React.ReactNode;
}

const LayoutLoadedProfile = ({ children }: IPropsLayoutLoadedProfile) => {
  const { userLoginInfo } = useUserLoginInfo();

  if (!userLoginInfo?.id) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default LayoutLoadedProfile;
