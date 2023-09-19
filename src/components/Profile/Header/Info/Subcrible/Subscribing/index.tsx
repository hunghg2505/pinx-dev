import React, { useContext } from 'react';

import { useRequest } from 'ahooks';
import { useTranslation } from 'next-i18next';

import { requestFollowUser } from '@components/Home/service';
import { profileUserContext } from '@components/Profile';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useLogin } from '@store/auth/hydrateAuth';

const Subscribing = ({ access }: { access: () => void }) => {
  const profileUser = useContext<any>(profileUserContext);
  const { isLogin } = useLogin();
  const { t } = useTranslation('profile');
  const { setUserLoginInfo } = useUserLoginInfo();

  const onFollowUser = useRequest(
    () => {
      return requestFollowUser(profileUser?.id);
    },
    {
      manual: true,
      onSuccess: () => {
        profileUser?.refresh();
        setUserLoginInfo((prev) => ({
          ...prev,
          totalFollowing: prev.totalFollowing && prev.totalFollowing + 1,
        }));
      },
    },
  );
  return (
    <>
      <div
        className='flex h-[36px] cursor-pointer flex-row items-center justify-center whitespace-nowrap  rounded-[8px] bg-blue_light px-[12px] galaxy-max:h-[32px] galaxy-max:px-[8px] tablet:flex'
        onClick={() => {
          if (isLogin) {
            onFollowUser.run();
          } else {
            access();
          }
        }}
      >
        <svg
          className='h-[8px] w-[8px]'
          width='10'
          height='10'
          viewBox='0 0 10 10'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M5.00501 10C5.49649 10 5.81745 9.6432 5.81745 9.17068V5.78592H9.13741C9.62889 5.78592 10 5.47734 10 5.00482C10 4.5323 9.62889 4.22372 9.13741 4.22372H5.81745V0.829315C5.81745 0.356798 5.49649 0 5.00501 0C4.51354 0 4.19258 0.356798 4.19258 0.829315V4.22372H0.862588C0.371113 4.22372 0 4.5323 0 5.00482C0 5.47734 0.371113 5.78592 0.862588 5.78592H4.19258V9.17068C4.19258 9.6432 4.51354 10 5.00501 10Z'
            fill='#1F6EAC'
          />
        </svg>
        <span className='ml-1 text-[12px] font-[700] text-primary_blue galaxy-max:text-[8px]'>
          {t('follow')}
        </span>
      </div>
    </>
  );
};
export default Subscribing;
