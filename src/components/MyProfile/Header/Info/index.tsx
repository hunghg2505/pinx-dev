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
    <div className='relative  flex w-full grid-flow-col gap-2  px-[16px] pt-[20px] tablet:pl-[132px] xdesktop:mt-[0] xdesktop:pl-[168px] '>
      <div className='flex-auto'>
        <Name
          displayName={profileUser.displayName}
          isKol={profileUser.isKol}
          isFeatureProfile={profileUser.isFeatureProfile}
        />
        <Position position={profileUser?.position} />
        <div className='mb-[5px] flex gap-[8px] xdesktop:gap-[8px]'>
          <Follower totalFollower={profileUser?.totalFollower} />
          <span className='text-[#808A9D]'>&bull;</span>
          <Following totalFollowing={profileUser?.totalFollowing} />
        </div>
      </div>
      <div className='flex-none flex-col justify-start items-start'>
        <EditDeskTop />
        <Joined year={new Date(profileUser?.createdAt)?.getFullYear()} />
      </div>
    </div>
  );
};
export default Info;
