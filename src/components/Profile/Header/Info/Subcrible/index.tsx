import React, { useContext } from 'react';

import { profileUserContext } from '@components/Profile';

import Subscribing from './Subscribing';
import Unsubscribe from './Unsubscribe';

const Subcrible = () => {
  const profileUser = useContext<any>(profileUserContext);
  return (
    <>
      <div className=' absolute bottom-[calc(100%+19px)] right-[16px]  text-right tablet:bottom-0 tablet:right-0'>
        {profileUser?.isFollowed && <Unsubscribe />}
        {!profileUser?.isFollowed && <Subscribing />}
      </div>
    </>
  );
};
export default Subcrible;
