import React, { useEffect } from 'react';

import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { usePostHomePage } from '@store/postHomePage/postHomePage';
import { usePostThemeInitial } from '@store/postTheme/useGetPostTheme';

const Chunk8 = () => {
  usePostThemeInitial();
  const { initialHomePostData } = usePostHomePage();
  const { userLoginInfo } = useUserLoginInfo();

  useEffect(() => {
    if (!userLoginInfo?.id) {
      initialHomePostData();
    }
  }, [userLoginInfo?.id]);

  return <></>;
};

export default Chunk8;
