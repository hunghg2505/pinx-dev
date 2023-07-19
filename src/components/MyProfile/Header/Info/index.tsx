import React from 'react';

import EditDeskTop from './EditDeskTop';
import Follower from './Follower';
import Following from './Following';
import Joined from './Joined';
import Name from './Name';
import Position from './Position';
import Post from './Post';

const Info = () => {
  return (
    <div className='relative px-[16px] tablet:pl-[172px] '>
      <EditDeskTop />
      <Name />
      <Position />
      <div className='mb-[5px] flex gap-[8px] tablet:gap-[40px]'>
        <Post />
        <Follower />
        <span className='tablet:hidden'>&bull;</span>
        <Following />
      </div>
      <Joined />
    </div>
  );
};
export default Info;
