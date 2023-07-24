import React, { useContext } from 'react';

import { profileUserContext } from '@components/Profile';

import IsFeatureProfile from './IsFeatureProfile';
import IsKol from './IsKol';

const Name = () => {
  const profileUser = useContext<any>(profileUserContext);
  return (
    <>
      <div className='mb-[4px] flex gap-[12px] tablet:absolute  tablet:bottom-[calc(100%+32px)]'>
        <h3 className='text-[20px] font-[600]'>{profileUser?.displayName}</h3>
        {profileUser?.isFeatureProfile && <IsFeatureProfile />}
        {profileUser?.isKol && <IsKol />}
      </div>
    </>
  );
};
export default Name;
