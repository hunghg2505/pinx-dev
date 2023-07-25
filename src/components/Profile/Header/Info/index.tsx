import React from 'react';

import Follower from './Follower';
import Following from './Following';
import Joined from './Joined';
import Name from './Name';
import Position from './Position';
import Post from './Post';
import Subcrible from './Subcrible';

const Info = () => {
  return (
    <div className='relative px-[16px] tablet:pl-[132px] pt-[20px]'>
      <Subcrible />
      <Name />
      <Position />
      <div className='mb-[5px] flex gap-[15px] xdesktop:gap-[40px]'>
        <Post />
        <Follower />
        <span className='text-[#808A9D] tablet:hidden'>&bull;</span>
        <Following />
      </div>
      <Joined />
    </div>
  );
};
export default Info;
