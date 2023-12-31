import React from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';

import { IKOL, requestFollowUser, requestUnFollowUser } from '@components/Home/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import CustomImage from '@components/UI/CustomImage';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { isUrlValid } from '@utils/common';
import { PROFILE_V2 } from 'src/constant/route';

import styles from './index.module.scss';

interface IProps {
  data: IKOL;
  refresh: () => void;
  refreshList?: () => void;
  scrollPosition: any;
}
const ItemInfluence = (props: IProps) => {
  const router = useRouter();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { isLogin } = useUserType();
  const { data, refreshList, refresh } = props;
  const { run: getUserProfile } = useProfileInitial();
  const [isFollow, setIsFollow] = React.useState(data?.isFollowed);
  React.useEffect(() => {
    setIsFollow(data?.isFollowed);
  }, [data?.isFollowed]);
  const useFollowUser = useRequest(
    () => {
      return requestFollowUser(data.id);
    },
    {
      manual: true,
      onSuccess: () => {
        setIsFollow(!isFollow);
        refreshList && refreshList();
        refresh && refresh();
        getUserProfile();
      },
      onError: (e: any) => {
        toast(() => <Notification type='error' message={e?.error} />);
      },
    },
  );
  const useUnFollow = useRequest(
    () => {
      return requestUnFollowUser(data?.id);
    },
    {
      manual: true,
      onSuccess: () => {
        // refresh();
        setIsFollow(!isFollow);
        refreshList && refreshList();
        refresh && refresh();
        getUserProfile();
      },
    },
  );
  const onFollow = () => {
    if (isLogin) {
      if (isFollow) {
        useUnFollow.run();
      } else {
        useFollowUser.run();
      }
    } else {
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };
  const isFeatureProfile = data?.isFeatureProfile;
  const isKol = data?.isKol;
  return (
    <div className='cursor-pointer '>
      <div className='relative h-[252px] w-[100%] rounded-[15px]'>
        <div
          onClick={() => router.push(PROFILE_V2(data?.displayName, data?.id))}
          className='relative left-0 top-0 z-10 h-full w-full'
        >
          <div className='absolute bottom-[20px] left-[12px] right-[12px] z-10'>
            <div className='flex items-center'>
              <Text
                type='body-16-bold'
                color='cbwhite'
                className='overflow-hidden text-ellipsis whitespace-nowrap'
              >
                {data?.displayName}
              </Text>
              {isFeatureProfile && (
                <LazyLoadImage
                  src='/static/icons/iconKol.svg'
                  alt=''
                  className='h-[20px] w-[20px]'
                />
              )}
              {isKol && (
                <LazyLoadImage
                  src='/static/icons/iconTickKolV2.svg'
                  alt=''
                  className='ml-[8px] h-[16px] w-[16px]'
                />
              )}
            </div>

            <Text
              type='body-14-regular'
              color='cbwhite'
              className={classNames('mt-[6px]', styles.limitLine2)}
            >
              {data.position}
            </Text>
          </div>
          {isUrlValid(data.avatar) ? (
            <CustomImage
              src={data.avatar}
              alt=''
              width='0'
              height='0'
              sizes='161px'
              className='absolute left-0 top-0 h-full w-full rounded-[15px] object-cover'
            />
          ) : (
            <div className='absolute left-0 top-0 h-full w-full overflow-hidden object-cover'>
              <AvatarDefault
                nameClassName='text-[110px]'
                className='!rounded-[15px]'
                name={data.displayName}
              />
            </div>
          )}
          <div className='bg pointer-events-none absolute bottom-0 left-0 h-full w-full rounded-[15px] bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.0001)_59.32%,_rgba(0,_0,_0,_0.868253)_91.04%)]'></div>
        </div>
        <div
          className='absolute right-[13px] top-[13px] z-20 flex h-[24px] w-[32px] cursor-pointer flex-row items-center justify-center rounded-[100px] bg-[#589DC0]'
          onClick={onFollow}
        >
          <LazyLoadImage
            src={isFollow ? '/static/icons/iconTickFollow.svg' : '/static/icons/iconPlus.svg'}
            alt=''
            className='w-[10px]'
          />
        </div>
      </div>
    </div>
  );
};
export default trackWindowScroll(ItemInfluence);
