import { useTranslation } from 'next-i18next';

import { ICustomerInfo } from '@components/Post/service';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

interface ISubscriberItemProps {
  data: ICustomerInfo;
}

const SubscriberItem = ({ data }: ISubscriberItemProps) => {
  const { t } = useTranslation(['stock', 'commmon']);

  return (
    <div className='flex items-center rounded-[16px] border border-solid border-[#EBEBEB] p-[16px]'>
      <CustomLink href={ROUTE_PATH.PROFILE_DETAIL(data.customerId)}>
        <img
          src={data.avatar}
          alt='User avatar'
          className='h-[36px] w-[36px] rounded-full object-cover'
        />
      </CustomLink>

      <div className='ml-[8px]'>
        <CustomLink href={ROUTE_PATH.PROFILE_DETAIL(data.customerId)}>
          <div className='flex items-center'>
            <Text type='body-14-semibold' className='text-[#474D57]'>
              {data.displayName}
            </Text>

            {data?.isFeatureProfile && (
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
        </CustomLink>
        <Text type='body-12-regular' color='neutral-5' className='mt-[2px]'>
          {data.totalFollowers} {t('common:followers')}
        </Text>
      </div>

      <div className='ml-auto flex h-[36px] w-[36px] items-center justify-center rounded-full border border-solid border-[#EBEBEB]'>
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
