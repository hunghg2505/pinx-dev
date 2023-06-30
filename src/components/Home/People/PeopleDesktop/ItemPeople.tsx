import React from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

import {
  ISuggestionPeople,
  requestFollowUser,
  requestUnFollowUser,
} from '@components/Home/service';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';

interface IProps {
  data: ISuggestionPeople;
}
const ItemPeople = (props: IProps) => {
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
        toast(() => <Notification type='error' message={e.error} />);
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
        toast(() => <Notification type='error' message={e.error} />);
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
  const { data } = props;
  return (
    <div className='item mb-[26px] flex items-center justify-between pb-[10px] [border-bottom:1px_solid_#ECECEC] last:border-none '>
      <div className='flex'>
        <img
          src={
            data
              ? data?.avatar
              : 'https://static.pinetree.com.vn/upload/images/pist/profile/Tran_Doan_Tien.jpg'
          }
          alt=''
          width='0'
          height='0'
          sizes='100vw'
          className='mr-[10px] h-[48px] w-[48px] rounded-full'
        />
        <div>
          <div className='flex items-center'>
            <Text type='body-14-semibold' color='cbblack'>
              {data.displayName}
            </Text>
            {data.isKol && (
              <Image
                src='/static/icons/iconStarFollow.svg'
                alt=''
                width={0}
                height={0}
                className='ml-[6px] w-[16px]'
              />
            )}
          </div>
          <Text type='body-12-regular' className='mt-[4px] text-[#666666]'>
            {data.numberFollowers} Followers
          </Text>
        </div>
      </div>
      <div
        className={classNames('cursor-pointer rounded-[5px] bg-[#F0F7FC] p-[6px]', {
          'flex h-[36px] w-[36px] flex-row items-center justify-center bg-[#DEE1E7]': isFollow,
        })}
        onClick={() => onFollow(data.id)}
      >
        {isFollow ? (
          <Image
            src='/static/icons/iconFollowBlue.svg'
            alt=''
            width={0}
            height={0}
            className='w-[12px]'
          />
        ) : (
          <Image src='/static/icons/iconAdd.svg' alt='' width={0} height={0} className='w-[24px]' />
        )}
      </div>
    </div>
  );
};
export default ItemPeople;
