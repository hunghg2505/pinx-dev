import React, { useContext } from 'react';

import { useAtom } from 'jotai';

import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';

import useFollowUser from './useFollowUser';
import { followContext } from '..';

const Follow = () => {
  const context = useContext<any>(followContext);
  const { isLogin } = useUserType();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { run } = useFollowUser();

  const onFollow = () => {
    if (isLogin) {
      run(context?.id);
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
        onClick={() => onFollow()}
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
            d='M16.505 17C16.9965 17 17.3175 16.6432 17.3175 16.1707V12.7859H20.6374C21.1289 12.7859 21.5 12.4773 21.5 12.0048C21.5 11.5323 21.1289 11.2237 20.6374 11.2237H17.3175V7.82932C17.3175 7.3568 16.9965 7 16.505 7C16.0135 7 15.6926 7.3568 15.6926 7.82932V11.2237H12.3626C11.8711 11.2237 11.5 11.5323 11.5 12.0048C11.5 12.4773 11.8711 12.7859 12.3626 12.7859H15.6926V16.1707C15.6926 16.6432 16.0135 17 16.505 17Z'
            fill='white'
          />
        </svg>
      </div>
    </>
  );
};
export default Follow;
