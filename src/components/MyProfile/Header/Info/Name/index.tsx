import React from 'react';

import classNames from 'classnames';

import Text from '@components/UI/Text';

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
      <div className={classNames('flex flex-1 items-center gap-[8px] truncate')}>
        <Text type='body-20-semibold' className='truncate galaxy-max:text-[14px]'>
          {displayName}
        </Text>

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
