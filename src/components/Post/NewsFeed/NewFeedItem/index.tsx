import React, { useEffect, useState, useRef } from 'react';

import { useClickAway } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useLikePost, useUnlikePost } from '@components/Post/service';
import Text from '@components/UI/Text';
import { formatMessage } from '@utils/common';

import ModalReport from '../ModalReport';

// interface ICustomerProps {
//   avatar: string;
//   customerId: number;
//   displayName: string;
//   id: number;
//   isKol: boolean;
//   name: string;
//   numberFollowers: number;
// }

interface IProps {
  postDetail: any;
  totalComments: number;
  onNavigate?: () => void;
  onRefreshPostDetail: () => void;
}
const NewFeedItem = (props: IProps) => {
  const [showReport, setShowReport] = React.useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  useClickAway(() => {
    // showReport && setShowReport(false);
  }, ref);
  const router = useRouter();
  const { onNavigate } = props;
  const onComment = () => {
    onNavigate && onNavigate();
  };

  const { postDetail, totalComments } = props;

  const [isLike, setIsLike] = useState<boolean>(false);

  useEffect(() => {
    if (postDetail?.isLike) {
      setIsLike(postDetail?.isLike);
    }
  }, [postDetail?.isLike]);

  const { onLikePost } = useLikePost(String(router.query.id));

  const { onUnlikePost } = useUnlikePost(String(router.query.id));

  const handleLikeOrUnLikePost = () => {
    setIsLike(!isLike);
    if (isLike) {
      onUnlikePost();
    } else {
      onLikePost();
    }
    return () => props.onRefreshPostDetail();
  };
  const message =
    postDetail?.post?.message && formatMessage(postDetail?.post?.message, postDetail?.post);
  return (
    <div className='newsfeed border-b border-t border-solid border-[#D8EBFC] px-[16px] py-[24px]'>
      <div className='flex flex-row justify-between'>
        <div
          className='flex cursor-pointer flex-row items-center'
          onClick={() => console.log('go to profile')}
        >
          <Image
            src={postDetail?.post?.customerInfo?.avatar}
            alt='avatar'
            className='mr-2 w-[44px] rounded-full'
            width={36}
            height={36}
          />

          <div>
            <Text type='body-14-semibold' color='neutral-1'>
              {postDetail?.post?.customerInfo?.displayName}
            </Text>
            <Text type='body-12-regular' color='neutral-4' className='mt-[2px]'>
              {dayjs(postDetail?.timeString).fromNow()}
            </Text>
          </div>
        </div>
        <div className='flex'>
          <Image
            src='/static/icons/iconUserFollow.svg'
            alt=''
            width='0'
            height='0'
            className='mr-[22px] w-[20px] cursor-pointer'
            onClick={() => console.log('follow')}
          />
          <button className='relative' ref={ref}>
            <Image
              src='/static/icons/iconDot.svg'
              alt=''
              width='0'
              height='0'
              className='w-[33px] cursor-pointer'
              onClick={() => setShowReport(!showReport)}
            />
            {showReport && (
              <div className='popup absolute right-0 top-[29px] h-[88px] w-[118px] rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px] rounded-tr-[4px] bg-[#FFFFFF] px-[8px] [box-shadow:0px_3px_6px_-4px_rgba(0,_0,_0,_0.12),_0px_6px_16px_rgba(0,_0,_0,_0.08),_0px_9px_28px_8px_rgba(0,_0,_0,_0.05)]'>
                <div className='flex h-[44px] items-center justify-center [border-bottom:1px_solid_#EAF4FB]'>
                  <Image
                    src='/static/icons/iconUnHide.svg'
                    alt=''
                    width='0'
                    height='0'
                    sizes='100vw'
                    className='mr-[10px] w-[20px]'
                  />
                  <Text type='body-14-medium' color='neutral-2'>
                    Hide
                  </Text>
                </div>
                <div className='flex h-[44px] items-center justify-center'>
                  <Image
                    src='/static/icons/iconFlag.svg'
                    alt=''
                    width='0'
                    height='0'
                    sizes='100vw'
                    className='mr-[10px] w-[17px]'
                  />
                  <ModalReport>
                    <Text type='body-14-medium' color='neutral-2'>
                      Report
                    </Text>
                  </ModalReport>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
      <div className='cursor-pointer' onClick={onComment}>
        {/* <div className='desc mb-[15px] mt-[18px]' dangerouslySetInnerHTML={{ __html: message }}>
          </div> */}
        {message && (
          <div
            className='desc messageFormat mb-[15px] mt-[18px]'
            dangerouslySetInnerHTML={{ __html: message }}
          ></div>
        )}
        {postDetail?.post?.urlImages?.length > 0 && (
          <div className='theme'>
            <Image src='/static/images/theme.jpg' alt='' width={326} height={185} />
          </div>
        )}
      </div>

      <div className='action mt-[15px] flex flex-row items-center justify-between'>
        <div
          className='like z-10 flex cursor-pointer flex-row items-center justify-center'
          onClick={() => handleLikeOrUnLikePost()}
        >
          <Image
            src={isLike ? '/static/icons/iconLike.svg' : '/static/icons/iconUnLike.svg'}
            color='#FFFFFF'
            alt=''
            width='0'
            height='0'
            className='mr-[8px] h-[18px] w-[20px]'
          />
          <Text
            type='body-12-medium'
            color='primary-5'
            className={classNames({ '!text-[#589DC0]': isLike })}
          >
            {postDetail?.totalLikes || ''} Likes
          </Text>
        </div>
        <div
          className='comment flex cursor-pointer flex-row items-center justify-center'
          onClick={onComment}
        >
          <Image
            src='/static/icons/iconCommentPrimary.svg'
            alt=''
            width={14}
            height={14}
            className='mr-[9px] w-[14px]'
          />
          <Text type='body-12-medium' color='primary-5'>
            {totalComments} Comments
          </Text>
        </div>
        <div className='report flex flex-row items-center justify-center'>
          <Image
            src='/static/icons/iconSharePrimary.svg'
            alt=''
            width={13}
            height={14}
            className='mr-[10px] w-[13px]'
          />
          <Text type='body-12-medium' color='primary-5'>
            32 Shares
          </Text>
        </div>
      </div>
    </div>
  );
};
export default NewFeedItem;
