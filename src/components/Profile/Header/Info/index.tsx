import React, { useContext } from 'react';

import Follower from '@components/MyProfile/Header/Info/Follower';
import Following from '@components/MyProfile/Header/Info/Following';
import Joined from '@components/MyProfile/Header/Info/Joined';
import Name from '@components/MyProfile/Header/Info/Name';
import Position from '@components/MyProfile/Header/Info/Position';
import { profileUserContext } from '@components/Profile';

// import Post from './Post';

import Subcrible from './Subcrible';

const Info = () => {
  const profileUser = useContext<any>(profileUserContext);
  return (
    <div className='relative px-[16px] pt-[20px] tablet:pl-[132px] xdesktop:pl-[172px]'>
      <Subcrible />
      <Name
        displayName={profileUser.displayName}
        isKol={profileUser.isKol}
        isFeatureProfile={profileUser.isFeatureProfile}
      />
      <Position position={profileUser?.position} />
      <div className='mb-[5px] flex gap-[15px] xdesktop:gap-[40px]'>
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
