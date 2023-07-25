import React from 'react';

import Avatar from './Avatar';
import Back from './Back';
import Cover from './Cover';

const Figure = () => {
  return (
    <div className='tablet:pt-[42px]'>
      <div className='relative mb-[72px] w-full pt-[41%] tablet:pt-[200px] '>
        <Back />
        <Cover />
        <Avatar />
      </div>
    </div>
  );
};
export default Figure;
