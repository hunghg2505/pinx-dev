import React from 'react';

import Img from './Img';
import Update from './Update';

const Avatar = () => {
  return (
    <div className='absolute bottom-[0%] left-[16px] z-10  translate-y-[50%]   tablet:left-[20px] '>
      <Img />
      <label className=''>
        <Update />
      </label>
    </div>
  );
};
export default Avatar;
