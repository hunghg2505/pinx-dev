import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { ProfileTabKey } from '@components/MyProfile/TabsContent/Desktop/type';
import { PROFILE_FOLLOW_V2 } from 'src/constant/route';

interface FollowingProps {
  totalFollowing: number | string;
  displayName: any;
  userId: any;
}

const Following = ({ totalFollowing, displayName, userId }: FollowingProps) => {
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
          //   `${router.route.replace('[id]', String(router?.query?.id))}/follow?tab=${
          //     ProfileTabKey.FOLLOWING
          //   }`,
          // );
          router.push(PROFILE_FOLLOW_V2(displayName, userId, ProfileTabKey.FOLLOWING));
        } else {
          router.replace({ query: { ...router.query, tab: ProfileTabKey.FOLLOWING } });
        }
      }}
    >
      <b className='mr-[8px] text-[14px] font-[600] leading-[18px] text-neutral_black galaxy-max:mr-[4px] galaxy-max:text-[12px] '>
        {totalFollowing || 0}
      </b>
      <span className='text-[14px] leading-[16px] text-dark_grey galaxy-max:text-[10px] tablet:leading-[18px]'>
        {t('following')}
      </span>
    </p>
  );
};
export default Following;
