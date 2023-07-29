import React from 'react';

import IsFeatureProfile from './IsFeatureProfile';

const Name = ({
  displayName,
  isKol,
  isFeatureProfile,
}: {
  displayName: string;
  isKol: boolean;
  isFeatureProfile: boolean;
}) => {
  return (
    <>
      <div className='flex items-center gap-[8px] '>
        <h3 className='max-w-[300px] truncate text-[20px] font-[600]'>{displayName}</h3>

        {isKol && (
          <img
            src='/static/icons/iconTick.svg'
            alt=''
            width={0}
            height={0}
            sizes='100vw'
            className='-ml-[2px] h-[18px] w-[18px] object-contain'
          />
        )}

        {isFeatureProfile && <IsFeatureProfile />}
      </div>
    </>
  );
};
export default Name;
