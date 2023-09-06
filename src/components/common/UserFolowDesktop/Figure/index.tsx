import React, { useContext } from 'react';

import { useAtom } from 'jotai';
import { useRouter } from 'next/router';

import AvatarDefault from '@components/UI/AvatarDefault';
import { userLoginInfoAtom } from '@hooks/useUserLoginInfo';
import { ROUTE_PATH, isUrlValid } from '@utils/common';

import { followContext } from '..';

const Figure = () => {
  const context = useContext(followContext);
  const route = useRouter();
  const [userLoginInfo] = useAtom(userLoginInfoAtom);
  const url =
    Number(userLoginInfo?.id) === Number(context?.id)
      ? ROUTE_PATH.MY_PROFILE
      : ROUTE_PATH.PROFILE_DETAIL(context?.id);
  return (
    <div
      className='absolute left-0 top-0 h-full w-full cursor-pointer'
      onClick={() => {
        route.push(url);
      }}
    >
      {isUrlValid(context?.avatar) ? (
        <img
          loading='lazy'
          src={context?.avatar}
          alt=''
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
