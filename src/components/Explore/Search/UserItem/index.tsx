import React from 'react';

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
import styles from '@components/Post/NewsFeed/NewFeedItem/index.module.scss';
import AvatarDefault from '@components/UI/AvatarDefault';
import CustomImage from '@components/UI/CustomImage';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { userLoginInfoAtom } from '@hooks/useUserLoginInfo';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { searchSeoAtom } from '@store/searchSeo/searchSeo';
import { ROUTE_PATH, isUrlValid, toNonAccentVietnamese } from '@utils/common';

interface Iprops {
  data: ISuggestionPeople;
  reload?: () => void;
  refreshSearch?: () => void;
}
const UserItem = (props: Iprops) => {
  const { data, reload, refreshSearch } = props;
  const router = useRouter();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const [postDetailStatus, setPostDetailStatus] = useAtom(postDetailStatusAtom);
  const [, setSearchSeo] = useAtom(searchSeoAtom);
  const { isLogin } = useUserType();
  const [isFollow, setIsFollow] = React.useState<boolean>(false);
  const { isMobile } = useResponsive();
  const { run: getUserProfile } = useProfileInitial();
  const [userLoginInfo] = useAtom(userLoginInfoAtom);
  const isMyProfile = userLoginInfo?.id === Number(data?.id);
  const urlProfile = ROUTE_PATH.PROFILE_V2(data?.displayName, data?.customerId);
  const isSearchPage = router.pathname === ROUTE_PATH.SEARCH;
  React.useEffect(() => {
    setIsFollow(data?.isFollowed);
  }, [data?.isFollowed]);

  const useFollowUser = useRequest(
    (id: number) => {
      return requestFollowUser(id);
    },
    {
      manual: true,
      onSuccess: () => {
        getUserProfile();
        setIsFollow(true);
        reload && reload();
        refreshSearch && refreshSearch();
        setPostDetailStatus({ ...postDetailStatus, idCustomerFollow: data?.id });
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
        getUserProfile();
        setIsFollow(false);
        reload && reload();
        refreshSearch && refreshSearch();
        setPostDetailStatus({ ...postDetailStatus, idCustomerFollow: data?.id });
        // refreshList();
      },
      onError: (e: any) => {
        toast(() => <Notification type='error' message={e?.error} />);
      },
    },
  );
  const onFollow = (id: number) => {
    if (isLogin) {
      if (isFollow) {
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
  return (
    <div
      className={classNames(
        'relative flex items-center justify-between rounded-[12px] bg-[#F7F6F8] px-[12px] py-[11px] galaxy-max:px-[8px] galaxy-max:py-[7px]',
        {
          '!bg-[transparent] py-[20px] after:absolute after:-left-0 after:bottom-0 after:h-[1px] after:w-full after:bg-[#EFF2F5] after:content-[""] [&:last-child]:after:h-0':
            !isMobile && isSearchPage,
        },
        styles.boxFollow,
      )}
    >
      <div
        className='flex cursor-pointer items-center'
        onClick={() => {
          router.push(urlProfile);
          setSearchSeo(false);
        }}
      >
        {isUrlValid(data?.avatar) ? (
          <CustomImage
            width='0'
            height='0'
            sizes='100vw'
            src={data?.avatar}
            alt=''
            className='mr-[8px] h-[44px] w-[44px] min-w-[44px] rounded-full object-cover galaxy-max:h-[36px] galaxy-max:w-[36px] galaxy-max:min-w-[36px]'
          />
        ) : (
          <div className='mr-[8px] h-[44px] w-[44px] min-w-[36px] galaxy-max:h-[36px] galaxy-max:w-[36px]'>
            <AvatarDefault name={name} />
          </div>
        )}
        <div className='flex mobile:max-w-[130px]  galaxy-max:w-[120px] desktop:max-w-[300px]'>
          <Text
            type='body-14-semibold'
            className='flex  overflow-hidden text-[#474D57] galaxy-max:text-[12px]'
          >
            <span className='truncate'>{data?.displayName}</span>
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
      </div>
      {!isMyProfile && (
        <div
          className={classNames(
            'box flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-[5px] ',
            {
              'follow bg-[#DEE1E7] galaxy-max:h-[32px] galaxy-max:w-[32px]': isFollow,
              'unfollow bg-[#D8EBFC]': !isFollow,
            },
          )}
          onClick={() => onFollow(data.id)}
        ></div>
      )}
    </div>
  );
};
export default UserItem;
