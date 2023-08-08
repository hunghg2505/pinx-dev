import React, { useContext } from 'react';

import { useAtom } from 'jotai';

import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { useProfileInitial } from '@store/profile/useProfileInitial';

import useUnFollowUser from './useUnFollowUser';
import { followContext } from '..';

const UnFollow = () => {
  const context = useContext<any>(followContext);
  const { isLogin } = useUserType();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { run } = useUnFollowUser();
  const { run: getUserProfile } = useProfileInitial();
  const onUnFollow = () => {
    if (isLogin) {
      run(context?.id);
      getUserProfile();
    } else {
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };
  return (
    <>
      <div
        className={
          'absolute right-[8px] top-[8px] z-10 flex h-[24px] w-[32px]  cursor-pointer items-center rounded-full bg-primary_light_blue'
        }
        onClick={() => onUnFollow()}
      >
        <svg
          width='33'
          height='24'
          viewBox='0 0 33 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect x='0.5' width='32' height='24' rx='12' fill='#589DC0' />
          <path
            d='M16.7054 15.8721C16.4691 16.2457 16.1011 16.4753 15.7032 16.4981C15.3053 16.5211 14.9199 16.3344 14.6533 15.9895L12.2641 12.9016C11.8844 12.4111 11.9181 11.655 12.3393 11.2128C12.7608 10.7705 13.4095 10.8101 13.7893 11.3008L15.4796 13.4856C15.5047 13.5181 15.541 13.5355 15.5784 13.5334C15.616 13.5313 15.6503 13.5094 15.6727 13.4746L19.1471 7.98628C19.4834 7.45465 20.1261 7.3415 20.5828 7.7334C21.0391 8.12531 21.136 8.87383 20.7995 9.40523L16.7054 15.8721Z'
            fill='white'
          />
        </svg>
      </div>
    </>
  );
};
export default UnFollow;
