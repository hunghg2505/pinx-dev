import React, { useContext } from 'react';

import classNames from 'classnames';

import { followContext } from '../..';

const Caption = () => {
  const context = useContext(followContext);

  return (
    <div className='absolute bottom-0 left-0 z-10 flex w-full flex-col px-[12px] pb-[20px] text-white'>
      <div className='flex gap-x-[8px] truncate'>
        <h1 className={classNames('truncate text-[16px] font-[700]')}>{context.displayName}</h1>

        {(context.isFeatureProfile || context.isKol) && (
          <div className='flex min-w-[20px] items-center'>
            {context.isFeatureProfile && (
              <img
                src='/static/icons/iconStarFollow.svg'
                width={16}
                height={16}
                alt='star'
                className='h-[16px] w-[16px]'
              />
            )}
            {context.isKol && (
              <img
                src='/static/icons/iconTick.svg'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='ml-[8px] h-[16px] w-[16px]'
              />
            )}
          </div>
        )}
      </div>
      <p className='mt-[6px] line-clamp-2 text-[14px]'>{context.position}</p>
    </div>
  );
};
export default Caption;
