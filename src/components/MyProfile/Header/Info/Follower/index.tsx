import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Follower = ({ totalFollower }: { totalFollower: number }) => {
  const { t } = useTranslation('profile');
  const router = useRouter();
  const [state, setState] = useState({ mobile: false });
  useEffect(() => {
    return window.innerWidth >= 768 ? setState({ mobile: false }) : setState({ mobile: true });
  }, []);
  return (
    <p
      className=' cursor-pointer text-[12px] flex'
      onClick={() => {
        if (state.mobile) {
          router.push(
            `${router.route.replace('[id]', String(router?.query?.id))}/follow?tab=followers`,
          );
        } else {
          router.replace({ query: { ...router.query, tab: 'followers' } });
        }
      }}
    >
      <b className='mr-[8px] text-[14px] font-[600] leading-[18px]'>{totalFollower}</b>
      <span className='text-[14px] leading-[16px] text-dark_grey tablet:leading-[18px]'>
        {t('followers')}        
      </span>
    </p>
  );
};
export default Follower;
