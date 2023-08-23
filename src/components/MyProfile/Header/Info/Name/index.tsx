import React, { useMemo } from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';

import { ROUTE_PATH } from '@utils/common';

const Name = ({
  displayName,
  isKol,
  isFeatureProfile,
}: {
  displayName: string;
  isKol: boolean;
  isFeatureProfile: boolean;
}) => {
  const router = useRouter();

  const { isMyProfilePath } = useMemo(() => {
    const isMyProfilePath = router.pathname === ROUTE_PATH.MY_PROFILE;

    return {
      isMyProfilePath,
    };
  }, [router]);

  return (
    <>
      <div className='flex items-center gap-[8px] '>
        <h3
          className={classNames(
            'truncate text-[20px] font-[600] galaxy-max:text-[14px] tablet:w-[300px]',
            {
              'mobile:w-[120px]': !isMyProfilePath,
              'mobile:w-[220px] galaxy-max:w-[160px]': isMyProfilePath,
            },
          )}
        >
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
