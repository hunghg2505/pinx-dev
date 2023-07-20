import React, { useContext } from 'react';

import { profileUserContext } from '@components/ProfileEdit';

const Name = () => {
  const profileUser = useContext<any>(profileUserContext);
  return (
    <h1 className=' line-[700]   mb-[12px] text-[22px] font-[700] text-neutral_black'>
      {profileUser?.name}
    </h1>
  );
};
export default Name;
