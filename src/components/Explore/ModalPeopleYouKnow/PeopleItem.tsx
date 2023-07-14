import React from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { toast } from 'react-hot-toast';

import {
  ISuggestionPeople,
  requestFollowUser,
  requestUnFollowUser,
} from '@components/Home/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { toNonAccentVietnamese } from '@utils/common';

interface Iprops {
  data: ISuggestionPeople;
}
const PeopleItem = (props: Iprops) => {
  const { data } = props;
  const [isFollow, setIsFollow] = React.useState(false);
  const useFollowUser = useRequest(
    (id: number) => {
      return requestFollowUser(id);
    },
    {
      manual: true,
      onSuccess: () => {
        setIsFollow(true);
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
        setIsFollow(false);
        // refreshList();
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
    <div className='flex items-center justify-between rounded-[12px] bg-[#F7F6F8] px-[12px] py-[11px]'>
      <div className='flex items-center'>
        {data?.avatar ? (
          <img src={data?.avatar} alt='' className='mr-[8px] h-[44px] w-[44px] rounded-full' />
        ) : (
          <div className='mr-[8px] h-[44px] w-[44px]'>
            <AvatarDefault name={name} />
          </div>
        )}

        <Text type='body-14-semibold' className='text-[#474D57]'>
          {data?.displayName}
        </Text>
      </div>
      <div
        className={classNames('cursor-pointer rounded-[5px]  p-[6px]', {
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
          <img src='/static/icons/iconAdd.svg' alt='' width={0} height={0} className='w-[24px]' />
        )}
      </div>
    </div>
  );
};
export default PeopleItem;
