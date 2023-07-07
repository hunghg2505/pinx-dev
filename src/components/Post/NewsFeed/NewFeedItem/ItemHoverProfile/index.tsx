import React from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';

import { IPost } from '@components/Post/service';
import { useGetProfileOtherUser } from '@components/Profile/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import Text from '@components/UI/Text';

interface IProps {
  postDetail: IPost;
  name: string;
}
const ItemHoverProfile = (props: IProps) => {
  const { postDetail, name } = props;
  const { profileOtherUser } = useGetProfileOtherUser(postDetail?.customerId);
  if (!profileOtherUser) {
    return <></>;
  }
  return (
    <div
      className={classNames(
        'absolute left-[50px] top-[45px] z-20 w-[352px] rounded-[16px] bg-[#FFF] px-[25px] py-[20px] [box-shadow:0px_12px_42px_0px_rgba(24,_39,_75,_0.12),_0px_8px_18px_0px_rgba(24,_39,_75,_0.12)] mobile:hidden tablet:block',
      )}
    >
      <div className='flex'>
        {profileOtherUser?.avatar ? (
          <img
            src={profileOtherUser?.avatar}
            className='mr-[10px] h-[72px] w-[72px] rounded-full'
            alt=''
          />
        ) : (
          <div className='h-[72px] w-[72px]'>
            <AvatarDefault name={name} />
          </div>
        )}

        <div className='my-[4px] w-full'>
          <Text type='body-16-semibold' color='neutral-1'>
            {profileOtherUser?.displayName}
          </Text>
          <div className='flex'>
            <Text type='body-12-regular' color='primary-5' className='mr-[5px]'>
              Join date:
            </Text>
            <Text type='body-12-semibold' color='neutral-1'>
              {dayjs(profileOtherUser?.createdAt).format('MM/YYYY')}
            </Text>
          </div>
          <div className='my-[15px] block h-[1px] bg-[#ECECEC]'></div>
          <div className='flex flex-row'>
            {/* <div>
              <Text type='body-12-regular' color='primary-5'>
                Post:
              </Text>
              <Text type='body-12-semibold' color='neutral-1'>
                298
              </Text>
            </div> */}
            <div className='mr-[30px]'>
              <Text type='body-12-regular' color='primary-5'>
                Follower:
              </Text>
              <Text type='body-12-semibold' color='neutral-1'>
                {profileOtherUser?.totalFollower}
              </Text>
            </div>
            <div>
              <Text type='body-12-regular' color='primary-5'>
                Following:
              </Text>
              <Text type='body-12-semibold' color='neutral-1'>
                {profileOtherUser?.totalFollowing}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemHoverProfile;
