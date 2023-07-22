import React, { useContext } from 'react';

import { useRouter } from 'next/router';

import AvatarDefault from '@components/UI/AvatarDefault';
import { ROUTE_PATH } from '@utils/common';

import { followContext } from '..';

const Figure = () => {
  const context = useContext(followContext);
  const route = useRouter();
  return (
    <div
      className='absolute left-0 top-0 h-full w-full'
      onClick={() => {
        route.push(ROUTE_PATH.PROFILE_DETAIL(context?.id));
      }}
    >
      {context?.avatar ? (
        <img src={context?.avatar} alt='' className='z-[-1] h-full w-full object-cover' />
      ) : (
        <div className='z-[-1] h-full w-full object-cover'>
          <AvatarDefault name={context?.displayName} />
        </div>
      )}
      <div className='to-transparent absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-t from-[black]'></div>
    </div>
  );
};
export default Figure;
