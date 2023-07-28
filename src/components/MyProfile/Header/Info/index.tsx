import React, { useContext } from 'react';

import { profileUserContext } from '@components/MyProfile';

import EditDeskTop from './EditDeskTop';
import Follower from './Follower';
import Following from './Following';
import Joined from './Joined';
import Name from './Name';
import Position from './Position';
// import Post from './Post';

const Info = () => {
  const profileUser = useContext<any>(profileUserContext);
  return (
    <div className='relative px-[16px]  tablet:pl-[132px] xdesktop:pl-[172px]'>
      <EditDeskTop />
      <Name
        displayName={profileUser.displayName}
        isKol={profileUser.isKol}
        isFeatureProfile={profileUser.isFeatureProfile}
      />
      <Position position={profileUser?.position} />
      <div className='mb-[5px] flex gap-[8px] xdesktop:gap-[40px]'>
        {/* <Post /> */}
        <Follower totalFollower={profileUser?.totalFollower} />
        <span className='text-[#808A9D] tablet:hidden'>&bull;</span>
        <Following totalFollowing={profileUser?.totalFollowing} />
      </div>
      <Joined year={new Date(profileUser?.createdAt)?.getFullYear()} />
    </div>
  );
};
export default Info;
