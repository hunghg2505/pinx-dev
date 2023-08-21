import React from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import {
  ISuggestionPeople,
  requestFollowUser,
  requestUnFollowUser,
} from '@components/Home/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { ROUTE_PATH, toNonAccentVietnamese } from '@utils/common';

interface IProps {
  data: ISuggestionPeople;
  refreshList?: () => void;
}
const ItemPeople = (props: IProps) => {
  const { t } = useTranslation('common');
  const { data, refreshList } = props;
  const isFollow = data?.isFollowed;
  const router = useRouter();
  const { run: getUserProfile } = useProfileInitial();
  // const [isFollow, setIsFollow] = React.useState(false);
  const useFollowUser = useRequest(
    (id: number) => {
      return requestFollowUser(id);
    },
    {
      manual: true,
      onSuccess: () => {
        // setIsFollow(true);
        getUserProfile();
        refreshList && refreshList();
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
        refreshList && refreshList();
      },
      onError: (e: any) => {
        toast(() => <Notification type='error' message={e?.error} />);
      },
    },
  );
  const onFollow = (id: number) => {
    if (isFollow) {
      useUnFollowUser.run(id);
    } else {
      useFollowUser.run(id);
    }
  };
  const name =
    data?.displayName && toNonAccentVietnamese(data?.displayName)?.charAt(0)?.toUpperCase();

  return (
    <div className='item mb-[26px] flex items-center justify-between pb-[10px] [border-bottom:1px_solid_#ECECEC] last:border-none '>
      <div
        className='flex cursor-pointer'
        onClick={() => router.push(ROUTE_PATH.PROFILE_DETAIL(data?.customerId))}
      >
        {data?.avatar ? (
          <img
            src={data?.avatar}
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='mr-[10px] h-[48px] w-[48px] rounded-full object-cover'
          />
        ) : (
          <div className='mr-[10px] h-[48px] w-[48px]'>
            <AvatarDefault name={name} />
          </div>
        )}
        <div>
          <div className='flex items-center'>
            <Text type='body-14-semibold' color='cbblack' className='truncate'>
              {data.displayName}
            </Text>
            {data.isFeatureProfile && (
              <img
                src='/static/icons/iconStarFollow.svg'
                alt=''
                width={0}
                height={0}
                className='ml-[6px] w-[16px]'
              />
            )}

            {data?.isKol && (
              <img
                src='/static/icons/iconTickKol.svg'
                alt=''
                className='ml-[6px] h-[14px] w-[14px] object-contain'
              />
            )}
          </div>

          <Text type='body-12-regular' className='mt-[4px] text-[#666666]'>
            {data.numberFollowers} {t('followers')}
          </Text>
        </div>
      </div>
      <div
        className={classNames('cursor-pointer rounded-[5px] p-[6px]', {
          'flex h-[36px] w-[36px] flex-row items-center justify-center bg-[#DEE1E7]': isFollow,
          'bg-[#F0F7FC]': !isFollow,
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
    </div>
  );
};
export default ItemPeople;
