import React, { useContext } from 'react';

import { useRequest } from 'ahooks';
import { useAtom } from 'jotai';
import { toast } from 'react-hot-toast';

import { requestUnFollowUser } from '@components/Home/service';
import Notification from '@components/UI/Notification';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { useProfileInitial } from '@store/profile/useProfileInitial';

// import useUnFollowUser from './useUnFollowUser';
import { followContext } from '..';

const UnFollow = () => {
  const context = useContext<any>(followContext);
  const { isLogin } = useUserType();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  // const { run } = useUnFollowUser();

  // const onUnFollow = () => {
  //   if (isLogin) {
  //     run(context?.id);
  //   } else {
  //     setPopupStatus({
  //       ...popupStatus,
  //       popupAccessLinmit: true,
  //     });
  //   }
  // };

  const { run: getUserProfile } = useProfileInitial();
  const useUnFollowUser = useRequest(
    () => {
      return requestUnFollowUser(context?.id);
    },
    {
      manual: true,
      onSuccess: () => {
        getUserProfile();
        context.refresh && context.refresh();
        // setIsFollow(true);
      },
      onError: (e: any) => {
        toast(() => <Notification type='error' message={e?.error} />);
      },
    },
  );

  const onUnFollow = () => {
    if (isLogin) {
      useUnFollowUser.run();
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
