import React, { useContext } from 'react';

import { profileUserContext } from '@components/MyProfile';

import IconAvartaEdit from './IconAvartaEdit';

const Avatar = () => {
  const profileUser = useContext<any>(profileUserContext);

  return (
    <div className='absolute bottom-[0%] left-[16px] z-10  translate-y-[50%]   tablet:left-[10px]  tablet:p-[0px]'>
      {profileUser?.avatar && (
        <img
          src={profileUser?.avatar}
          alt='background cover'
          width={113}
          height={113}
          className='h-[113px] w-[113px] rounded-full bg-white p-[5px] tablet:h-[100px] tablet:w-[100px] object-cover'
        />
      )}
      <IconAvartaEdit />
    </div>
  );
};
export default Avatar;
