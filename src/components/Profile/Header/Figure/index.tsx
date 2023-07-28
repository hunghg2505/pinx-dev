import React from 'react';

import Avatar from './Avatar';
import Back from './Back';
import Cover from './Cover';

const Figure = () => {
  return (
    <div className='tablet:pt-[0px]'>
      <div className='relative mb-[72px] w-full pt-[41%] tablet:pt-[280px] '>
        <Back />
        <Cover />
        <Avatar />
      </div>
    </div>
  );
};
export default Figure;
