import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useTranslation } from 'next-i18next';

import { IPost } from '@components/Post/service';
import { ACTIVITIES_TYPE } from '@components/Stock/const';
import { ActivityIconType } from '@components/Stock/type';
import ActivitiesAction from '@components/Themes/ThemeDetail/Activities/ActivitiesAction';
import AvatarDefault from '@components/UI/AvatarDefault';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { ROUTE_PATH, isUrlValid } from '@utils/common';
import { ViewTickerInfo } from '@utils/dataLayer';

// tracking event view ticker info
const handleTrackingViewTicker = (stockCode: string) => {
  ViewTickerInfo(stockCode, 'Modal comment stock activities', 'Comment', 'Stock');
};

interface IActivityItemProps {
  data: IPost;
  refreshStockActivities: () => void;
}

dayjs.extend(relativeTime);

const ActivityItem = ({ data, refreshStockActivities }: IActivityItemProps) => {
  const { t, i18n } = useTranslation(['stock', 'common']);
  let icon;
  let content;
  const isSellUp =
    data.post.type && data.post.type === ActivityIconType.SOLD && data.post.pnlRate > 0;
  const isSellDown =
    data.post.type && data.post.type === ActivityIconType.SOLD && data.post.pnlRate < 0;

  const activityFound = data.post.action
    ? ACTIVITIES_TYPE.find((item) => item.type === data.post.action)
    : ACTIVITIES_TYPE.find((item) => item.type === data.post.type);

  if (activityFound) {
    icon = activityFound.icon;
    content = t(activityFound.label);
  }
  const { userLoginInfo } = useUserLoginInfo();
  const href =
    userLoginInfo?.id === data.customerId
      ? ROUTE_PATH.MY_PROFILE
      : ROUTE_PATH.PROFILE_DETAIL(data.customerId);

  return (
    <div className='flex'>
      <CustomLink href={href}>
        {isUrlValid(data.post.customerInfo.avatar) ? (
          <img
            src={data.post.customerInfo.avatar}
            alt={data.post.customerInfo.displayName}
            className='h-[28px] w-[28px] rounded-full object-cover'
          />
        ) : (
          <div className='h-[28px] w-[28px] rounded-full object-cover'>
            <AvatarDefault nameClassName='text-[14px]' name={data.post.customerInfo.displayName} />
          </div>
        )}
      </CustomLink>

      <div className='ml-[12px] flex-1'>
        <CustomLink href={ROUTE_PATH.PROFILE_DETAIL(data.customerId)}>
          <div
            className={classNames(
              'relative rounded-[12px] bg-[#F7F6F8] px-[16px] pb-[16px] pt-[12px]',
              {
                '!bg-[#FBF4F5]': isSellDown,
                '!bg-[#E3F6E2]': isSellUp,
              },
            )}
          >
            <div className='flex items-center justify-between'>
              <Text
                type='body-14-semibold'
                className='max-w-[150px] truncate galaxy-max:max-w-[80px] laptop:max-w-[300px]'
              >
                {data.post.customerInfo.displayName}
              </Text>

              <Text type='body-12-regular' className='text-[#999999]'>
                {dayjs(data.timeString)?.locale(i18n.language)?.fromNow(true)}
              </Text>
            </div>

            <div className='mt-[12px] flex items-center'>
              <div className='flex h-[24px] w-[24px] items-center justify-center'>
                <img
                  src={`/static/icons/${icon}`}
                  alt='Icon'
                  className='h-[16px] w-[16px] object-contain'
                />
              </div>
              <Text type='body-14-regular' className='ml-[8px]'>
                {content} {''}
                <Text type='body-14-semibold' className='inline-block'>
                  {data.post.stockCode}
                </Text>
              </Text>

              {(isSellDown || isSellUp) && (
                <div
                  className={classNames(
                    'ml-auto flex h-[25px] items-center justify-center rounded-full px-[8px]',
                    {
                      'bg-[#F5E4E7]': isSellDown,
                      'bg-[#B9E18E]': isSellUp,
                    },
                  )}
                >
                  {isSellUp && (
                    <img
                      src='/static/icons/iconTradingUp.svg'
                      alt='Icon up'
                      className='h-[20px] w-[20px] object-contain'
                    />
                  )}

                  {isSellDown && (
                    <img
                      src='/static/icons/iconTradingDown.svg'
                      alt='Icon up'
                      className='h-[20px] w-[20px] object-contain'
                    />
                  )}

                  <Text
                    type='body-16-regular'
                    className={classNames('ml-[4px]', {
                      'text-[#DA314F]': isSellDown,
                      'semantic-2-1': isSellUp,
                    })}
                  >
                    {data.post.pnlRate.toFixed(2)}%
                  </Text>
                </div>
              )}
            </div>

            {data.totalLikes > 0 && (
              <div className='absolute bottom-0 right-[6px] flex h-[24px] translate-y-1/2 items-center justify-center rounded-full bg-[#F0F7FC] px-[10px] shadow-[0px_1px_2px_0px_rgba(88,102,126,0.12),0px_4px_24px_0px_rgba(88,102,126,0.08)]'>
                <img
                  src='/static/icons/iconLike.svg'
                  alt='Icon like active'
                  className='h-[14px] w-[16px] object-contain'
                />
                <Text type='body-12-regular' className='ml-[4px]' color='primary-1'>
                  {data.totalLikes}
                </Text>
              </div>
            )}
          </div>
        </CustomLink>

        <div className='mt-[8px] flex gap-x-[38px]'>
          <ActivitiesAction
            isLike={data.isLike}
            idPost={data.id}
            refresh={refreshStockActivities}
            onTrackingViewTickerInfo={handleTrackingViewTicker}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
