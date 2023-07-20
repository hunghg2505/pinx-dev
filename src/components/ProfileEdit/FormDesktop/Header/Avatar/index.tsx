import React from 'react';

import Img from './Img';
import Update from './Update';

const Avatar = () => {
  return (
    <div className='absolute bottom-[0%] left-[16px] z-10  translate-y-[50%]   tablet:left-[50px] '>
      <Img />
      <label className=' absolute bottom-0 '>
        <Update />
      </label>
    </div>
  );
};
export default Avatar;
