import React from 'react';

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
        <h3 className='max-w-[300px] truncate text-[20px] font-[600] galaxy-max:max-w-[180px]  galaxy-max:text-[14px]'>
          {displayName}
        </h3>

        {isKol && (
          <img
            src='/static/icons/iconTick.svg'
            alt=''
            width={0}
            height={0}
            sizes='100vw'
            className='-ml-[2px] h-[18px] w-[18px] object-contain galaxy-max:h-[14px] galaxy-max:w-[14px]'
          />
        )}

        {isFeatureProfile && (
          <img
            loading='lazy'
            src='/static/icons/iconStarFollow.svg'
            alt='star'
            className='h-[20px] w-[20px] galaxy-max:h-[14px]  galaxy-max:w-[14px] '
          />
        )}
      </div>
    </>
  );
};
export default Name;
