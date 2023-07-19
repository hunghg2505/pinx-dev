import React, { useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { profileUserContext } from '@components/Profile';

const Following = () => {
  const { t } = useTranslation('profile');
  const profileUser = useContext<any>(profileUserContext);
  const router = useRouter();
  const [state, setState] = useState({ mobile: false });
  useEffect(() => {
    return window.innerWidth >= 768 ? setState({ mobile: false }) : setState({ mobile: true });
  }, []);
  return (
    <p
      className=' text-[12px] tablet:flex tablet:flex-col-reverse cursor-pointer'
      onClick={() => {
        if (state.mobile) {
          router.push(
            `${router.route.replace('[id]', String(router?.query?.id))}/follow?tab=following`,
          );
        } else {
          router.push({ query: { ...router.query, tab: 'following' } });
        }
      }}
    >
      <b className='mr-[8px] font-[600] leading-[18px] text-neutral_black tablet:text-primary_blue'>
        {profileUser?.totalFollowing || 0}
      </b>
      <span className='leading-[16px] text-dark_grey tablet:leading-[18px]'>
        {t('following')}
        <span className='hidden tablet:inline'>:</span>
      </span>
    </p>
  );
};
export default Following;
