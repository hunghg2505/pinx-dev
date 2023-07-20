import React, { useContext } from 'react';

import { profileUserContext } from '@components/ProfileEdit';

import UpLoadCover from './UpLoadCover';

const Cover = () => {
  const profileUser = useContext<any>(profileUserContext);

  return (
    <>
      {profileUser?.coverImage && (
        <div className='absolute left-0 top-0 h-full w-full'>
          <img
            src={profileUser?.coverImage}
            alt='background cover'
            className=' left-0 top-0 h-full w-full object-cover tablet:rounded-[8px]'
          />
          <UpLoadCover />
        </div>
      )}
    </>
  );
};
export default Cover;
