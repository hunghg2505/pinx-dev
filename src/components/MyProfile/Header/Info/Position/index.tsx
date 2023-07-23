import React, { useContext } from 'react';

import { profileUserContext } from '@components/MyProfile';

const Position = () => {
  const profileUser = useContext<any>(profileUserContext);

  return (
    <p className='mb-[21px] text-[14px] font-[400] text-dark_grey tablet:absolute tablet:bottom-[calc(100%+12px)] tablet:mb-0 tablet:text-[14px]'>
      {profileUser?.position}
    </p>
  );
};
export default Position;
