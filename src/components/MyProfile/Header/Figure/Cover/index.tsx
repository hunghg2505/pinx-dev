import React, { useContext } from 'react';

import { profileUserContext } from '@components/MyProfile';

import Img from './Image';
import UpLoadCover from './UpLoadCover';

const Cover = () => {
  const profileUser = useContext<any>(profileUserContext);

  return (
    <>
      {profileUser?.coverImage && (
        <>
          <Img coverImage={profileUser?.coverImage} />
          <UpLoadCover />
        </>
      )}
    </>
  );
};
export default Cover;
