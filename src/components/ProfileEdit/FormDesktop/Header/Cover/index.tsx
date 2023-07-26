import React from 'react';

import Img from './Img';
import UpLoadCover from './UpLoadCover';

const Cover = () => {
  return (
    <>
      <div className='absolute left-0 top-0 h-full w-full'>
        <Img />
        <UpLoadCover />
      </div>
    </>
  );
};
export default Cover;
