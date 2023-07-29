import React from 'react';

import classNames from 'classnames';
// import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

import { useGetProfileOtherUser } from '@components/MenuProfile/service';
import { IPost } from '@components/Post/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import Text from '@components/UI/Text';

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
        'absolute left-[50px] top-[45px] z-20 w-[352px] max-w-[500px] rounded-[8px] bg-[#FFF] p-[16px] [box-shadow:0px_12px_42px_0px_rgba(24,_39,_75,_0.12),_0px_8px_18px_0px_rgba(24,_39,_75,_0.12)] mobile:hidden tablet:block',
      )}
    >
      <div className='flex items-center'>
        {profileOtherUser?.avatar ? (
          <img
            src={profileOtherUser?.avatar}
            className='mr-[10px] h-[72px] w-[72px] rounded-full object-cover'
            alt=''
          />
        ) : (
          <div className='h-[72px] w-[72px]'>
            <AvatarDefault name={name} />
          </div>
        )}
        <div className='my-[4px] w-full flex-1'>
          <Text type='body-16-semibold' color='neutral-1' className='mb-[6px]'>
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
              <Text type='body-12-semibold'>{profileOtherUser?.totalFollower}</Text>
              <Text type='body-12-regular' className='text-[#474D57]'>
                {t('follower')}
              </Text>
            </div>

            <Text type='body-14-regular' className='text-[#808A9D]'>
              •
            </Text>

            <div className='flex gap-[4px]'>
              <Text type='body-12-semibold'>{profileOtherUser?.totalFollowing}</Text>
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
