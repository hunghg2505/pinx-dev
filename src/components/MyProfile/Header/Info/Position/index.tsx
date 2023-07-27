import React, { useContext } from 'react';

import { profileUserContext } from '@components/MyProfile';

const Position = () => {
  const profileUser = useContext<any>(profileUserContext);

  return (
    <p className='w-[max(calc(100%-188px),300px) mb-[21px] truncate text-[14px] font-[400] text-dark_grey tablet:absolute tablet:bottom-[calc(100%+8px)] tablet:mb-0 tablet:text-[14px]'>
      {profileUser?.position}
    </p>
  );
};
export default Position;
