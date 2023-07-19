import React, { useContext } from 'react';

import { useAtom } from 'jotai';

import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';

import useUnFollowUser from './useUnFollowUser';
import { followContext } from '..';

const UnFollow = () => {
  const context = useContext<any>(followContext);
  const { isLogin } = useUserType();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { run } = useUnFollowUser();

  const onUnFollow = () => {
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
          'flex h-[36px]  w-[36px] cursor-pointer flex-row items-center justify-center rounded-[5px] bg-[#DEE1E7] p-[6px]'
        }
        onClick={() => onUnFollow()}
      >
        <img
          src='/static/icons/iconFollowBlue.svg'
          alt=''
          width={0}
          height={0}
          className='w-[12px]'
        />
      </div>
    </>
  );
};
export default UnFollow;
