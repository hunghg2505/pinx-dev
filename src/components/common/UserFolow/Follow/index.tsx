import React, { useContext } from 'react';

import { useAtom } from 'jotai';

import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';

import useFollowUser from './useFollowUser';
import { followContext } from '..';

const Folow = () => {
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
        className={'cursor-pointer rounded-[5px]  bg-primary_bgblue_2  p-[6px] '}
        onClick={() => onFollow()}
      >
        <img src='/static/icons/iconAdd.svg' alt='' width={0} height={0} className='w-[24px]' />
      </div>
    </>
  );
};
export default Folow;
