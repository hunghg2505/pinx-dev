import React, { createContext } from 'react';

import { useRouter } from 'next/router';

import AvatarDefault from '@components/UI/AvatarDefault';
import CustomImage from '@components/UI/CustomImage';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useLogin } from '@store/auth/hydrateAuth';
import { isUrlValid } from '@utils/common';
import { PROFILE_V2 } from 'src/constant/route';

import Follow from './Follow';
import UnFollow from './UnFollow';

export const followContext = createContext<any>(undefined);
const UserFolow = (props: any) => {
  const { userLoginInfo } = useUserLoginInfo();
  const route = useRouter();
  const { isLogin } = useLogin();
  const isMyProfile = userLoginInfo?.id === props.id;
  return (
    <followContext.Provider value={{ ...props }}>
      <div className='flex items-center justify-between gap-x-[12px] rounded-[12px] bg-[#F7F6F8] px-[12px] py-[11px]'>
        <div className='flex flex-1 items-center overflow-hidden'>
          {isUrlValid(props?.avatar) ? (
            <CustomImage
              src={props?.avatar}
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='mr-[8px] h-[44px] w-[44px] rounded-full object-cover galaxy-max:mr-[6px] galaxy-max:h-[40px] galaxy-max:w-[40px]'
              onClick={() => {
                route.push(PROFILE_V2(props?.displayName, props?.id));
              }}
            />
          ) : (
            <div
              className='mr-[8px] h-[44px] w-[44px] rounded-full object-cover galaxy-max:mr-[6px] galaxy-max:h-[40px] galaxy-max:w-[40px]'
              onClick={() => {
                route.push(PROFILE_V2(props?.displayName, props?.id));
              }}
            >
              <AvatarDefault name={props?.displayName} />
            </div>
          )}
          <div className='flex flex-1 items-center overflow-hidden'>
            <Text type='body-14-semibold' className='truncate text-[#474D57]'>
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
                src='/static/icons/iconTickKolV2.svg'
                alt=''
                className='ml-[6px] h-[14px] w-[14px] object-contain galaxy-max:ml-[4px]'
              />
            )}
          </div>
        </div>

        <div>
          {!isMyProfile && (
            <>{isLogin ? <>{props?.isFollowed ? <UnFollow /> : <Follow />}</> : <Follow />}</>
          )}
        </div>
      </div>
    </followContext.Provider>
  );
};
export default UserFolow;
