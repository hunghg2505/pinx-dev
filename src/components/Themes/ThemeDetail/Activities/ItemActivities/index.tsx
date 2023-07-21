import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';

import { INewFeed } from '@components/Home/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import Text from '@components/UI/Text';
import { ROUTE_PATH, toNonAccentVietnamese } from '@utils/common';

import ActivitiesAction from '../ActivitiesAction';

dayjs.extend(relativeTime);
export enum ActionPostEnum {
  UNSUBSCRIBE = 'UNSUBSCRIBE',
  SUBSCRIBE = 'SUBSCRIBE',
}
const ItemActivities = ({ data, refresh }: { data: INewFeed; refresh: () => void }) => {
  const router = useRouter();
  const isSubsribed = data?.post?.action === ActionPostEnum.SUBSCRIBE;
  const idPost = data?.id;
  const isLike = data?.isLike;
  const avatar = data?.post?.customerInfo?.avatar;
  const nameAvatar =
    data?.post?.customerInfo?.displayName &&
    toNonAccentVietnamese(data?.post?.customerInfo?.displayName)?.charAt(0)?.toUpperCase();
  return (
    <div className='flex'>
      <div
        onClick={() => router.push(ROUTE_PATH.PROFILE_DETAIL(data?.customerId))}
        className='cursor-pointer'
      >
        {avatar ? (
          <img src={avatar} alt='' className='mr-[12px] h-[28px] w-[28px] rounded-full' />
        ) : (
          <div className='mr-[12px] h-[28px] w-[28px]'>
            <AvatarDefault name={nameAvatar} />
          </div>
        )}
      </div>

      <div className='w-[calc(100%_-_40px)]'>
        <div className='relative w-full rounded-[12px] bg-[#EEF5F9] px-[16px] py-[12px] cursor-pointer' onClick={() => router.push(ROUTE_PATH.PROFILE_DETAIL(data?.customerId))}>
          <div className='flex items-center justify-between'>
            <Text type='body-14-semibold' color='neutral-black'>
              {data?.post?.customerInfo?.displayName}
            </Text>
            <Text type='body-12-regular' color='neutral-gray'>
              {dayjs(data?.timeString).fromNow(true)}
            </Text>
          </div>
          <div className='mt-[15px] flex items-center'>
            <img
              src={
                isSubsribed ? '/static/icons/iconHeartActive.svg' : '/static/icons/iconHeart.svg'
              }
              alt=''
              className='mr-[10px] h-[24px] w-[24px]'
            />
            <Text type='body-14-regular' color='neutral-black'>
              {data?.post?.message}
            </Text>
          </div>
          {data?.totalLikes > 0 && (
            <div className='like absolute -bottom-[12px] right-0 flex  h-[24px] w-[54px] items-center justify-center rounded-[100px] bg-[#F0F7FC] [box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
              <img src='/static/icons/iconLike.svg' alt='' className='mr-[4px] w-[16px]' />
              <Text type='body-12-regular' color='primary-1'>
                {data?.totalLikes}
              </Text>
            </div>
          )}
        </div>
        <div className='mt-[8px]'>
          <ActivitiesAction isLike={isLike} idPost={idPost} refresh={refresh} />
        </div>
      </div>
    </div>
  );
};
export default ItemActivities;
