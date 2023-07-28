import React, { useContext } from 'react';

import { profileUserContext } from '@components/MyProfile';

import IsFeatureProfile from './IsFeatureProfile';

const Name = () => {
  const profileUser = useContext<any>(profileUserContext);
  return (
    <>
      <div className='mb-[4px] flex w-full max-w-[max(calc(100%-300px),370px)] items-center gap-[8px] tablet:absolute tablet:bottom-[calc(100%+32px)]'>
        <h3 className='max-w-[300px] truncate text-[20px] font-[600]'>
          {profileUser?.displayName}
        </h3>

        {profileUser?.isKol && (
          <img
            src='/static/icons/iconTick.svg'
            alt=''
            width={0}
            height={0}
            sizes='100vw'
            className='-ml-[2px] h-[16px] w-[16px] object-contain'
          />
        )}

        {profileUser?.isFeatureProfile && <IsFeatureProfile />}
      </div>
    </>
  );
};
export default Name;
