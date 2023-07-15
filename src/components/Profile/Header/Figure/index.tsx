import React, { useContext } from 'react';

import { profileUserContext } from '@components/Profile';

import Back from './Back';

const Figure = () => {
  const profileUser = useContext<any>(profileUserContext);

  return (
    <div className='tablet:pt-[72px]'>
      <div className='relative mb-[72px] w-full pt-[41%] tablet:pt-[20%] '>
        <Back />
        {profileUser?.coverImage && (
          <img
            src={profileUser?.coverImage}
            alt='background cover'
            className='absolute h-full w-full object-cover tablet:rounded-[8px]'
          />
        )}
        {profileUser?.avatar && (
          <img
            src={profileUser?.avatar}
            alt='background cover'
            className='absolute bottom-[0%] left-[16px] z-10 h-[113px] w-[113px] translate-y-[50%] rounded-full bg-white p-[5px]  tablet:left-[50px] tablet:h-[100px] tablet:w-[100px] tablet:p-[8px]'
            width={113}
            height={113}
          />
        )}
      </div>
    </div>
  );
};
export default Figure;
