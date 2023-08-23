import React, { useContext } from 'react';

import { profileUserContext } from '@components/MyProfile';
import { formatNumber } from '@utils/common';

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
    <div className='relative flex w-full grid-flow-col items-center gap-2 pl-[16px] pr-[16px] pt-[20px] galaxy-max:pt-[14px] tablet:pl-[132px] tablet:pr-0 tablet:pt-[14px] xdesktop:mt-[0] xdesktop:pl-[168px]'>
      <div className='flex-auto'>
        <div className='mb-[8px] flex items-center justify-between tablet:mb-[4px]'>
          <Name
            displayName={profileUser.displayName}
            isKol={profileUser.isKol}
            isFeatureProfile={profileUser.isFeatureProfile}
          />
          <EditDeskTop />
        </div>

        <Position position={profileUser?.position} />

        <div className='mb-[5px] flex items-center justify-between'>
          <div>
            <div className='flex gap-[8px] xdesktop:gap-[8px]'>
              <Follower totalFollower={formatNumber(profileUser?.totalFollower)} />
              <span className='text-[#808A9D]'>&bull;</span>
              <Following totalFollowing={formatNumber(profileUser?.totalFollowing)} />
            </div>

            <div className='mt-[8px] flex justify-start tablet:hidden'>
              <Joined year={new Date(profileUser?.createdAt)?.getFullYear()} />
            </div>
          </div>

          <div className='hidden tablet:block'>
            <Joined year={new Date(profileUser?.createdAt)?.getFullYear()} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Info;
