import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { ProfileTabKey } from '@components/MyProfile/TabsContent/Desktop';
import { ROUTE_PATH } from '@utils/common';

interface FollowerProps {
  totalFollower: number | string;
  displayName: any;
  userId: any;
}

const Follower = ({ totalFollower, displayName, userId }: FollowerProps) => {
  const { t } = useTranslation('profile');
  const router = useRouter();

  const [state, setState] = useState({ mobile: false });
  useEffect(() => {
    return window.innerWidth >= 768 ? setState({ mobile: false }) : setState({ mobile: true });
  }, []);
  return (
    <p
      className=' flex cursor-pointer items-center text-[12px]'
      onClick={() => {
        if (state.mobile) {
          // router.push(
          //   `${router.route.replace('[profileSlug]', userId)}/follow?tab=${
          //     ProfileTabKey.FOLLOWERS
          //   }`,
          // );
          router.push(ROUTE_PATH.PROFILE_FOLLOW_V2(displayName, userId, ProfileTabKey.FOLLOWERS));
        } else {
          router.replace({ query: { ...router.query, tab: ProfileTabKey.FOLLOWERS } });
        }
      }}
    >
      <b className='mr-[8px] text-[14px] font-[600] leading-[18px] galaxy-max:mr-[2px] galaxy-max:text-[12px]'>
        {totalFollower}
      </b>
      <span className='text-[14px] leading-[16px] text-dark_grey galaxy-max:text-[10px] tablet:leading-[18px]'>
        {t('followers')}
      </span>
    </p>
  );
};
export default Follower;
