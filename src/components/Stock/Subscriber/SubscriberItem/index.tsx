import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';

import { ICustomerInfo } from '@components/Post/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { userLoginInfoAtom } from '@hooks/useUserLoginInfo';
import { ROUTE_PATH, formatStringToNumber } from '@utils/common';

interface ISubscriberItemProps {
  data: ICustomerInfo;
}

const SubscriberItem = ({ data }: ISubscriberItemProps) => {
  const { t } = useTranslation(['stock', 'commmon']);
  const [userLoginInfo] = useAtom(userLoginInfoAtom);
  const url =
    data?.customerId === userLoginInfo?.id
      ? ROUTE_PATH.MY_PROFILE
      : ROUTE_PATH.PROFILE_DETAIL(data.customerId);
  return (
    <div className='flex items-center rounded-[16px] border border-solid border-[#EBEBEB] p-[16px]'>
      <CustomLink className='galaxy-max:flex-none' href={url}>
        {data.avatar ? (
          <img
            src={data.avatar}
            alt='User avatar'
            className='h-[36px] w-[36px] rounded-full object-cover'
          />
        ) : (
          <div className='h-[36px] w-[36px] rounded-full object-cover'>
            <AvatarDefault nameClassName='text-[16px]' name={data.displayName} />
          </div>
        )}
      </CustomLink>

      <div className='ml-[8px]'>
        <CustomLink href={url}>
          <div className='flex items-center'>
            <Text
              type='body-14-semibold'
              className='max-w-[100px] truncate text-[#474D57] galaxy-max:text-[12px] laptop:max-w-[150px]'
            >
              {data.displayName}
            </Text>

            {data?.isFeatureProfile && (
              <img
                src='/static/icons/iconStarFollow.svg'
                alt=''
                width={0}
                height={0}
                className='ml-[6px] w-[16px] galaxy-max:ml-[2px] galaxy-max:h-[10px] galaxy-max:w-[10px]'
              />
            )}

            {data?.isKol && (
              <img
                src='/static/icons/iconTickKol.svg'
                alt=''
                className='ml-[6px] h-[14px] w-[14px] object-contain galaxy-max:ml-[2px] galaxy-max:h-[10px] galaxy-max:w-[10px]'
              />
            )}
          </div>
        </CustomLink>
        <Text type='body-12-regular' color='neutral-5' className='mt-[2px] galaxy-max:text-[10px]'>
          {formatStringToNumber(data.totalFollowers)} {t('common:followers')}
        </Text>
      </div>

      <div className='ml-auto flex h-[36px] w-[36px] items-center justify-center rounded-full border border-solid border-[#EBEBEB] galaxy-max:h-[32px] galaxy-max:w-[32px]'>
        {data.isInvesting ? (
          <img
            src='/static/icons/iconTreeNoShadow.svg'
            alt='Tree icon'
            className='h-[14px] w-[16px] object-contain'
          />
        ) : (
          <img
            src='/static/icons/iconHeartActiveNoShadow.svg'
            alt='Heart icon'
            className='h-[17px] w-[17px] object-contain'
          />
        )}
      </div>
    </div>
  );
};

export default SubscriberItem;
