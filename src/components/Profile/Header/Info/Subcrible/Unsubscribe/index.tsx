import React, { useContext } from 'react';

import { useRequest } from 'ahooks';
import { useTranslation } from 'next-i18next';

import { requestUnFollowUser } from '@components/Home/service';
import { profileUserContext } from '@components/Profile';

const Unsubscribe = () => {
  const profileUser = useContext<any>(profileUserContext);
  const { t } = useTranslation('profile');
  // un follow user
  const onUnFollowUser = useRequest(
    () => {
      return requestUnFollowUser(profileUser?.id);
    },
    {
      manual: true,
      onSuccess: () => {
        profileUser?.reload();
      },
    },
  );
  return (
    <>
      <div className='mr-[10px] flex h-[36px] w-[89px] flex-row items-center justify-center rounded-[5px]  bg-neutral_08 tablet:flex cursor-pointer'>
        <span
          className='ml-1 text-[12px] font-[700] text-neutral_05'
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
