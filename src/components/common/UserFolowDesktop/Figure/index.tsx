import React, { useContext } from 'react';

import { useRouter } from 'next/router';

import AvatarDefault from '@components/UI/AvatarDefault';
import CustomImage from '@components/UI/CustomImage';
import { isUrlValid } from '@utils/common';
import { PROFILE_V2 } from 'src/constant/route';

import { followContext } from '..';

const Figure = () => {
  const context = useContext(followContext);
  const route = useRouter();
  const url = PROFILE_V2(context?.displayName, context?.id);
  return (
    <div
      className='absolute left-0 top-0 h-full w-full cursor-pointer'
      onClick={() => {
        route.push(url);
      }}
    >
      {isUrlValid(context?.avatar) ? (
        <CustomImage
          loading='lazy'
          src={context?.avatar}
          alt=''
          width='0'
          height='0'
          sizes='100vw'
          className='z-[-1] h-full w-full object-cover'
        />
      ) : (
        <div className='z-[-1] h-full w-full object-cover'>
          <AvatarDefault
            nameClassName='text-[110px]'
            className='rounded-none'
            name={context?.displayName}
          />
        </div>
      )}
      <div className='to-transparent absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-t from-[black]'></div>
    </div>
  );
};
export default Figure;
