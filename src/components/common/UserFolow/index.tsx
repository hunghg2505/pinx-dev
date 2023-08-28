import React, { createContext } from 'react';

import { useRouter } from 'next/router';

import AvatarDefault from '@components/UI/AvatarDefault';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';

import Follow from './Follow';
import UnFollow from './UnFollow';

export const followContext = createContext<any>(undefined);
const UserFolow = (props: any) => {
  const { userLoginInfo } = useUserLoginInfo();
  const route = useRouter();
  const { isLogin } = useAuth();
  const isMyProfile = userLoginInfo?.id === props.id;
  return (
    <followContext.Provider value={{ ...props }}>
      <div className='flex items-center justify-between rounded-[12px] bg-[#F7F6F8] px-[12px] py-[11px]'>
        <div className='flex items-center'>
          {props?.avatar ? (
            <img
              src={props?.avatar}
              alt=''
              className='mr-[8px] h-[44px] w-[44px] rounded-full object-cover galaxy-max:mr-[6px] galaxy-max:h-[40px] galaxy-max:w-[40px]'
              onClick={() => {
                route.push(ROUTE_PATH.PROFILE_DETAIL(props?.id));
              }}
            />
          ) : (
            <div
              className='mr-[8px] h-[44px] w-[44px] galaxy-max:mr-[4px] galaxy-max:h-[40px] galaxy-max:w-[40px] '
              onClick={() => {
                route.push(ROUTE_PATH.PROFILE_DETAIL(props?.id));
              }}
            >
              <AvatarDefault name={props?.displayName} />
            </div>
          )}
          <Text
            type='body-14-semibold'
            className='line-clamp-1 max-w-[250px] text-[#474D57] galaxy-max:line-clamp-none galaxy-max:max-w-[120px] galaxy-max:truncate'
          >
            {props?.displayName}
          </Text>
          {props?.isFeatureProfile && (
            <img
              src='/static/icons/iconStarFollow.svg'
              alt=''
              width={0}
              height={0}
              className='ml-[6px] w-[16px] galaxy-max:ml-[4px]'
            />
          )}

          {props?.isKol && (
            <img
              src='/static/icons/iconTickKol.svg'
              alt=''
              className='ml-[6px] h-[14px] w-[14px] object-contain galaxy-max:ml-[4px]'
            />
          )}
        </div>
        {!isMyProfile && (
          <>{isLogin ? <>{props?.isFollowed ? <UnFollow /> : <Follow />}</> : <Follow />}</>
        )}
      </div>
    </followContext.Provider>
  );
};
export default UserFolow;
