import React, { useContext } from 'react';

import { followContext } from '../..';

const Caption = () => {
  const context = useContext(followContext);

  return (
    <div className='absolute bottom-0 left-0 z-10 w-full px-[12px] pb-[20px] text-white'>
      <div className='flex '>
        <h1 className=' line-clamp-1 text-[16px] font-[700]'>{context.displayName}</h1>
        {context.isFeatureProfile && (
          <img
            src='/static/icons/iconStarFollow.svg'
            width={16}
            height={16}
            alt='star'
            className='h-[16px] w-[16px]'
          />
        )}
      </div>
      <p className='mt-[6px] line-clamp-2 text-[14px]'>{context.position}</p>
    </div>
  );
};
export default Caption;
