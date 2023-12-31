import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { INewFeed } from '@components/Home/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import CustomImage from '@components/UI/CustomImage';
import Text from '@components/UI/Text';
import { isUrlValid, toNonAccentVietnamese } from '@utils/common';
import { PROFILE_V2 } from 'src/constant/route';
import { viewTickerInfoTracking } from 'src/mixpanel/mixpanel';

import ActivitiesAction from '../ActivitiesAction';

// tracking event view ticker info
const handleTrackingViewTicker = (stockCode: string) => {
  viewTickerInfoTracking(stockCode, 'Modal comment theme activities', 'Comment', 'Stock');
};

dayjs.extend(relativeTime);
export enum ActionPostEnum {
  UNSUBSCRIBE = 'UNSUBSCRIBE',
  SUBSCRIBE = 'SUBSCRIBE',
}
const ItemActivities = ({ data, refresh }: { data: INewFeed; refresh: () => void }) => {
  const { t, i18n } = useTranslation('theme');
  const urlProfile = PROFILE_V2(data?.post?.customerInfo?.displayName, data?.customerId);
  const messageBody =
    data?.post?.action === ActionPostEnum.SUBSCRIBE ? t('desc.subscribe') : t('desc.unsubscribe');
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
      <div onClick={() => router.push(urlProfile)} className='cursor-pointer'>
        {isUrlValid(avatar) ? (
          <CustomImage
            width='0'
            height='0'
            sizes='100vw'
            loading='lazy'
            src={avatar}
            alt=''
            className='mr-[12px] h-[28px] w-[28px] rounded-full border border-solid border-[#ebebeb]'
          />
        ) : (
          <div className='mr-[12px] h-[28px] w-[28px]'>
            <AvatarDefault nameClassName='text-[12px]' name={nameAvatar} />
          </div>
        )}
      </div>
      <div className='w-[calc(100%_-_40px)]'>
        <div
          className='relative w-full cursor-pointer rounded-[12px] bg-[#EEF5F9] px-[16px] py-[12px] galaxy-max:px-[14px] galaxy-max:py-[10px]'
          onClick={() => router.push(urlProfile)}
        >
          <div className='flex items-center justify-between'>
            <Text
              type='body-14-semibold'
              className='max-w-[150px] truncate galaxy-max:max-w-[120px] laptop:max-w-[300px]'
              color='neutral-black'
            >
              {data?.post?.customerInfo?.displayName}
            </Text>
            <Text type='body-12-regular' color='neutral-gray'>
              {dayjs(data?.timeString)?.locale(i18n.language).fromNow(true)}
            </Text>
          </div>
          <div className='mt-[15px] flex items-center galaxy-max:mt-[12px]'>
            <img
              src={
                isSubsribed ? '/static/icons/iconHeartActive.svg' : '/static/icons/iconHeart.svg'
              }
              alt=''
              className='mr-[10px] h-[24px] w-[24px]'
            />
            <Text type='body-14-regular' className='galaxy-max:text-[12px]' color='neutral-black'>
              {messageBody}
            </Text>
          </div>
          {data?.totalLikes > 0 && (
            <div className='like absolute -bottom-[12px] right-0 flex  h-[24px] w-[54px] items-center justify-center rounded-[100px] bg-[#F0F7FC] [box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
              <img
                loading='lazy'
                src='/static/icons/iconLike.svg'
                alt=''
                className='mr-[4px] w-[16px]'
              />
              <Text type='body-12-regular' color='primary-1'>
                {data?.totalLikes}
              </Text>
            </div>
          )}
        </div>
        <div className='mt-[8px]'>
          <ActivitiesAction
            onTrackingViewTickerInfo={handleTrackingViewTicker}
            isLike={isLike}
            idPost={idPost}
            refresh={refresh}
          />
        </div>
      </div>
    </div>
  );
};
export default ItemActivities;
