import React, { useContext } from 'react';

// import { useAtom } from 'jotai';

import { useRequest } from 'ahooks';
import { toast } from 'react-hot-toast';

import { requestFollowUser } from '@components/Home/service';
import Notification from '@components/UI/Notification';
// import { useUserType } from '@hooks/useUserType';
// import { popupStatusAtom } from '@store/popup/popup';
import { useProfileInitial } from '@store/profile/useProfileInitial';

// import useFollowUser from './useFollowUser';
import { followContext } from '..';

const Folow = () => {
  const context = useContext<any>(followContext);
  // const { isLogin } = useUserType();
  // const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  // // const { run } = useFollowUser();

  // const onFollow = () => {
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

  const useFollowUser = useRequest(
    () => {
      return requestFollowUser(context?.id);
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
  const onFollow = () => {
    useFollowUser.run();
  };
  return (
    <>
      <div
        className={'cursor-pointer rounded-[5px]  bg-primary_bgblue_2  p-[6px] '}
        onClick={onFollow}
      >
        <img
          loading='lazy'
          src='/static/icons/iconAdd.svg'
          alt=''
          width={0}
          height={0}
          className='w-[24px]'
        />
      </div>
    </>
  );
};
export default Folow;
