import React, { useMemo } from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import {
  ISuggestionPeople,
  requestFollowUser,
  requestUnFollowUser,
} from '@components/Home/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import CustomImage from '@components/UI/CustomImage';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { isUrlValid, toNonAccentVietnamese } from '@utils/common';
import { PROFILE_V2, SEARCH } from 'src/constant/route';

interface Iprops {
  data: ISuggestionPeople;
  reload?: () => void;
  refreshList?: () => void;
  onClosePopup?: () => void;
}
const PeopleItem = (props: Iprops) => {
  const { data, reload, refreshList, onClosePopup } = props;
  const { run: getUserProfile } = useProfileInitial();
  const router = useRouter();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { isLogin, userId } = useUserType();
  // const [isFollow, setIsFollow] = React.useState<boolean>(false);
  const isFollow = data?.isFollowed;
  const { isMobile } = useResponsive();
  const isSearchPage = router.pathname === SEARCH;

  const isMyAccount = useMemo(() => {
    const isMyAcc = data.id === userId;

    return isMyAcc;
  }, [data, userId]);

  const useFollowUser = useRequest(
    (id: number) => {
      return requestFollowUser(id);
    },
    {
      manual: true,
      onSuccess: () => {
        // setIsFollow(true);
        getUserProfile();
        reload && reload();
        refreshList && refreshList();
        // refreshList();
      },
      onError: (e: any) => {
        toast(() => <Notification type='error' message={e?.error} />);
      },
    },
  );
  const useUnFollowUser = useRequest(
    (id: number) => {
      return requestUnFollowUser(id);
    },
    {
      manual: true,
      onSuccess: () => {
        // setIsFollow(false);
        getUserProfile();
        reload && reload();
        refreshList && refreshList();
        // refreshList();
      },
      onError: (e: any) => {
        toast(() => <Notification type='error' message={e?.error} />);
      },
    },
  );
  const onFollow = (id: number) => {
    if (isLogin) {
      if (data.isFollowed) {
        useUnFollowUser.run(id);
      } else {
        useFollowUser.run(id);
      }
    } else {
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };
  const name =
    data?.displayName && toNonAccentVietnamese(data?.displayName)?.charAt(0)?.toUpperCase();

  const handleNavigateToUserDetail = () => {
    onClosePopup && onClosePopup();
    router.push(PROFILE_V2(data?.displayName, data?.id));
  };

  return (
    <div
      className={classNames(
        'relative flex items-center justify-between gap-x-[12px] rounded-[12px] bg-[#F7F6F8] px-[12px] py-[11px]',
        {
          '!bg-[transparent] py-[20px] after:absolute after:-left-0 after:bottom-0 after:h-[1px] after:w-full after:bg-[#EFF2F5] after:content-[""] [&:last-child]:after:h-0':
            !isMobile && isSearchPage,
        },
      )}
    >
      <div
        className='flex flex-1 cursor-pointer items-center overflow-hidden'
        onClick={handleNavigateToUserDetail}
      >
        {isUrlValid(data?.avatar) ? (
          <CustomImage
            width='0'
            height='0'
            sizes='100vw'
            src={data?.avatar}
            alt=''
            className='mr-[8px] h-[44px] w-[44px] rounded-full object-cover galaxy-max:h-[40px] galaxy-max:w-[40px]'
          />
        ) : (
          <div className='mr-[8px] h-[44px] w-[44px] galaxy-max:h-[40px] galaxy-max:w-[40px]'>
            <AvatarDefault name={name} />
          </div>
        )}

        <Text type='body-14-semibold' className='truncate text-[#474D57]'>
          {data?.displayName}
        </Text>

        {data?.isFeatureProfile && (
          <img
            src='/static/icons/iconKol.svg'
            alt=''
            width={0}
            height={0}
            sizes='100vw'
            className='h-[20px] w-[20px]'
          />
        )}
        {data?.isKol && (
          <img
            src='/static/icons/iconTickKolV2.svg'
            alt=''
            width={0}
            height={0}
            sizes='100vw'
            className='ml-[8px] h-[16px] w-[16px]'
          />
        )}
      </div>

      {!isMyAccount && (
        <div
          className={classNames('cursor-pointer rounded-[5px]  p-[6px]', {
            'flex h-[36px] w-[36px] flex-row items-center justify-center bg-[#DEE1E7] galaxy-max:h-[32px] galaxy-max:w-[32px]':
              isFollow,
            'bg-[#D8EBFC]': !isFollow,
          })}
          onClick={() => onFollow(data.id)}
        >
          {isFollow ? (
            <img
              src='/static/icons/iconFollowBlue.svg'
              alt=''
              width={0}
              height={0}
              className='w-[12px]'
            />
          ) : (
            <img
              loading='lazy'
              src='/static/icons/iconAdd.svg'
              alt=''
              width={0}
              height={0}
              className='w-[24px]'
            />
          )}
        </div>
      )}
    </div>
  );
};
export default PeopleItem;
