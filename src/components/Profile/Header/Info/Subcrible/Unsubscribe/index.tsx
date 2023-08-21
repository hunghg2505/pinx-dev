import React, { useContext } from 'react';

import { useRequest } from 'ahooks';
import { useTranslation } from 'next-i18next';

import { requestUnFollowUser } from '@components/Home/service';
import { profileUserContext } from '@components/Profile';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';

const Unsubscribe = () => {
  const profileUser = useContext<any>(profileUserContext);
  const { t } = useTranslation('profile');
  const { setUserLoginInfo } = useUserLoginInfo();

  // un follow user
  const onUnFollowUser = useRequest(
    () => {
      return requestUnFollowUser(profileUser?.id);
    },
    {
      manual: true,
      onSuccess: () => {
        profileUser?.refresh();
        setUserLoginInfo(prev => ({
          ...prev,
          totalFollowing: prev.totalFollowing && prev.totalFollowing - 1
        }));
      },
    },
  );
  return (
    <>
      <div className=' flex h-[36px] cursor-pointer items-center justify-center rounded-[5px] bg-neutral_08 px-[10px]  galaxy-max:h-[32px] galaxy-max:px-[6px] tablet:flex'>
        <span
          className='ml-1 text-[12px] font-[700] text-neutral_05 galaxy-max:ml-0 galaxy-max:text-[8px]'
          onClick={() => {
            onUnFollowUser.run();
          }}
        >
          {t('following')}
        </span>
      </div>
    </>
  );
};
export default Unsubscribe;
