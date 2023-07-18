import React, { useContext } from 'react';

import { profileUserContext } from '@components/Profile';

import UpLoadCover from './UpLoadCover';

const Cover = () => {
  const profileUser = useContext<any>(profileUserContext);
  return (
    <>
      {profileUser?.coverImage && (
        <>
          <img
            src={profileUser?.coverImage}
            alt='background cover'
            className='absolute left-0 top-0 h-full w-full object-cover tablet:rounded-[8px]'
          />
          {profileUser?.isMe && <UpLoadCover />}
        </>
      )}
    </>
  );
};
export default Cover;
