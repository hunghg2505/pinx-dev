import React, { createContext } from 'react';

import { useRouter } from 'next/router';

import AvatarDefault from '@components/UI/AvatarDefault';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

import Folow from './Follow';
import UnFollow from './UnFollow';

export const followContext = createContext<any>(undefined);
const UserFolow = (props: any) => {
  const route = useRouter();
  return (
    <followContext.Provider value={{ ...props }}>
      <div className='flex items-center justify-between rounded-[12px] bg-[#F7F6F8] px-[12px] py-[11px]'>
        <div className='flex items-center'>
          {props?.avatar ? (
            <img
              src={props?.avatar}
              alt=''
              className='mr-[8px] h-[44px] w-[44px] rounded-full'
              onClick={() => {
                route.push(ROUTE_PATH.PROFILE_DETAIL(props?.id));
              }}
            />
          ) : (
            <div
              className='mr-[8px] h-[44px] w-[44px] '
              onClick={() => {
                route.push(ROUTE_PATH.PROFILE_DETAIL(props?.id));
              }}
            >
              <AvatarDefault name={props?.displayName} />
            </div>
          )}

          <Text type='body-14-semibold' className='text-[#474D57]'>
            {props?.displayName}
          </Text>
        </div>
        {props?.isFollow ? <UnFollow /> : <Folow />}
      </div>
    </followContext.Provider>
  );
};
export default UserFolow;
