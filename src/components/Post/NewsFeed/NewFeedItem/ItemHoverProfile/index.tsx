import React from 'react';

import classNames from 'classnames';
// import dayjs from 'dayjs';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { useGetProfileOtherUser } from '@components/MenuProfile/service';
import { IPost } from '@components/Post/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import Text from '@components/UI/Text';
import { formatStringToNumber, isUrlValid, replaceImageError } from '@utils/common';

interface IProps {
  postDetail: IPost;
  name: string;
}
const ItemHoverProfile = (props: IProps) => {
  const { t } = useTranslation();
  const { postDetail, name } = props;
  const { profileOtherUser } = useGetProfileOtherUser(postDetail?.customerId);
  if (!profileOtherUser) {
    return <></>;
  }
  return (
    <div
      className={classNames(
        'absolute left-[50px] top-[45px] z-30 w-[352px] max-w-[500px] rounded-[8px] bg-[#FFF] p-[16px] [box-shadow:0px_12px_42px_0px_rgba(24,_39,_75,_0.12),_0px_8px_18px_0px_rgba(24,_39,_75,_0.12)] mobile:hidden tablet:block',
      )}
    >
      <div className='flex items-center'>
        {isUrlValid(profileOtherUser?.avatar) ? (
          <Image
            width='0'
            height='0'
            sizes='100vw'
            src={profileOtherUser?.avatar}
            className='mr-[10px] h-[72px] w-[72px] min-w-[72px] rounded-full border border-solid border-[#ebebeb] object-cover'
            alt=''
            onError={replaceImageError}
          />
        ) : (
          <div className='mr-[10px] h-[72px] w-[72px] min-w-[72px] rounded-full object-cover'>
            <AvatarDefault name={name} />
          </div>
        )}
        <div className='my-[4px] w-full flex-1 overflow-hidden'>
          <Text type='body-16-semibold' color='neutral-1' className='mb-[6px] truncate'>
            {profileOtherUser?.displayName}
          </Text>
          {/* <div className='flex'>
            <Text type='body-12-regular' color='primary-5' className='mr-[5px]'>
              {t('join_date')}:
            </Text>
            <Text type='body-12-semibold' color='neutral-1'>
              {dayjs(profileOtherUser?.createdAt).format('MM/YYYY')}
            </Text>
          </div> */}

          {/* <div className='my-[15px] block h-[1px] bg-[#ECECEC]'></div> */}

          <div className='flex items-center justify-between gap-[8px]'>
            <div className='flex gap-[4px]'>
              <Text type='body-12-semibold'>
                {formatStringToNumber(profileOtherUser?.totalFollower) || 0}
              </Text>
              <Text type='body-12-regular' className='text-[#474D57]'>
                {t('follower')}
              </Text>
            </div>

            <Text type='body-14-regular' className='text-[#808A9D]'>
              •
            </Text>

            <div className='flex gap-[4px]'>
              <Text type='body-12-semibold'>
                {formatStringToNumber(profileOtherUser?.totalFollowing) || 0}
              </Text>
              <Text type='body-12-regular' className='text-[#474D57]'>
                {t('following')}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemHoverProfile;
