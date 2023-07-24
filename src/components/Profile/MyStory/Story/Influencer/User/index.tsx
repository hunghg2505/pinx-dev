import React, { useContext } from 'react';

import Image from 'next/image';

import { profileUserContext } from '@components/Profile';

const User = () => {
  const profileUser = useContext<any>(profileUserContext);
  return (
    <>
      <div className='flex justify-center '>
        <h3 className='font-600 mb-[4px] text-[24px]'>{profileUser?.displayName}</h3>
        {profileUser?.isFeatureProfile && (
          <Image
            src='/static/icons/iconStarFollow.svg'
            width={16}
            height={16}
            alt='star'
            className='h-[16px] w-[16px]'
          />
        )}
      </div>
      <p className='text-[14px]'>{profileUser?.position}</p>
    </>
  );
};
export default User;
