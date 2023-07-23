import React, { useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { profileUserContext } from '@components/MyProfile';

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
      className=' cursor-pointer text-[12px] tablet:flex tablet:flex-col-reverse'
      onClick={() => {
        if (state.mobile) {
          router.push(
            `${router.route.replace('[id]', String(router?.query?.id))}/follow?tab=following`,
          );
        } else {
          router.replace({ query: { ...router.query, tab: 'following' } });
        }
      }}
    >
      <b className='mr-[8px] text-[14px] font-[600] leading-[18px] text-neutral_black '>
        {profileUser?.totalFollowing || 0}
      </b>
      <span className='text-[14px] leading-[16px] text-dark_grey tablet:leading-[18px]'>
        {t('following')}
        <span className='hidden tablet:inline'>:</span>
      </span>
    </p>
  );
};
export default Following;
