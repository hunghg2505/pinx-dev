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
    <div className='relative flex w-full grid-flow-col items-center gap-2 pl-[16px] pr-[16px]  pt-[20px] tablet:pl-[132px] tablet:pr-0 xdesktop:mt-[0] xdesktop:pl-[168px] '>
      <div className='flex-auto'>
        <Name
          displayName={profileUser.displayName}
          isKol={profileUser.isKol}
          isFeatureProfile={profileUser.isFeatureProfile}
        />
        <Position position={profileUser?.position} />
        <div className='mb-[5px] flex gap-[15px] xdesktop:gap-[8px]'>
          {/* <Post /> */}
          <Follower totalFollower={profileUser?.totalFollower} />
          <span className='text-[#808A9D]'>&bull;</span>
          <Following totalFollowing={profileUser?.totalFollowing} />
        </div>
      </div>
      <div className='flex-none flex-col items-start justify-start'>
        <Subcrible />
        <Joined year={new Date(profileUser?.createdAt)?.getFullYear()} />
      </div>
    </div>
  );
};
export default Info;
