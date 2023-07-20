import React, { useContext } from 'react';

import { profileUserContext } from '@components/ProfileEdit';

const Phone = () => {
  const profileUser = useContext<any>(profileUserContext);

  return (
    <h1 className='line-[18px] absolute  bottom-[-72px]  left-[96px] translate-x-[-50%] text-[14px] text-neutral_black'>
      {profileUser?.phone}
    </h1>
  );
};
export default Phone;
