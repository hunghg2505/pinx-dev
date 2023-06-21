import React, { useEffect, useState, useRef } from 'react';

import { useClickAway, useRequest } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Image from 'next/image';
// import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  IPost,
  TYPEPOST,
  requestHidePost,
  useLikePost,
  useUnlikePost,
} from '@components/Post/service';
import Text from '@components/UI/Text';
// import { formatMessage } from '@utils/common';

import ContentPostTypeDetail from './ContentPostTypeDetail';
import ContentPostTypeHome from './ContentPostTypeHome';
import ModalReport from '../ModalReport';

interface IProps {
  postDetail: IPost;
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
  const id = router.query?.id;
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

  // hide post
  const onHidePost = useRequest(
    () => {
      return requestHidePost(postDetail?.id);
    },
    {
      manual: true,
      onSuccess: () => {
        console.log('thanh cong');
      },
      onError: (err: any) => {
        console.log('err', err);
      },
    },
  );

  const renderLogo = () => {
    let logo = '';
    if (
      [
        TYPEPOST.PinetreeDailyNews,
        TYPEPOST.PinetreeMarketBrief,
        TYPEPOST.PinetreeMorningBrief,
        TYPEPOST.PinetreePost,
        TYPEPOST.PinetreeWeeklyNews,
      ].includes(postDetail?.post.postType)
    ) {
      logo = '/static/logo/logoPintree.svg';
    }
    if (
      [
        TYPEPOST.POST,
        TYPEPOST.ActivityTheme,
        TYPEPOST.ActivityWatchlist,
        TYPEPOST.ActivityMatchOrder,
      ].includes(postDetail?.post.postType)
    ) {
      logo = postDetail?.post?.customerInfo?.avatar;
    }
    if (
      [TYPEPOST.VietstockLatestNews, TYPEPOST.VietstockNews, TYPEPOST.VietstockStockNews].includes(
        postDetail?.post.postType,
      )
    ) {
      logo = 'https://static.pinetree.com.vn/upload/vendor_vietstock_logo.png';
    }
    return logo;
  };
  const renderDisplayName = () => {
    let name = '';
    if (
      [
        TYPEPOST.PinetreeDailyNews,
        TYPEPOST.PinetreeMarketBrief,
        TYPEPOST.PinetreeMorningBrief,
        TYPEPOST.PinetreePost,
        TYPEPOST.PinetreeWeeklyNews,
      ].includes(postDetail?.post.postType)
    ) {
      name = 'Pinetree';
    }
    if (
      [
        TYPEPOST.POST,
        TYPEPOST.ActivityTheme,
        TYPEPOST.ActivityWatchlist,
        TYPEPOST.ActivityMatchOrder,
      ].includes(postDetail?.post.postType)
    ) {
      name = postDetail?.post?.customerInfo?.displayName;
    }
    if (
      [TYPEPOST.VietstockLatestNews, TYPEPOST.VietstockNews, TYPEPOST.VietstockStockNews].includes(
        postDetail?.post.postType,
      )
    ) {
      name = 'Vietstock';
    }
    return name;
  };
  const renderContentPost = () => {
    if (id) {
      return <ContentPostTypeDetail onNavigate={onNavigate} postDetail={postDetail} />;
    }
    return <ContentPostTypeHome onNavigate={onNavigate} postDetail={postDetail} />;
  };
  return (
    <div className='newsfeed border-b border-t border-solid border-[#D8EBFC] px-[16px] py-[24px]'>
      <div className='flex flex-row justify-between'>
        <div
          className='flex cursor-pointer flex-row items-center'
          onClick={() => console.log('go to profile')}
        >
          <Image
            src={renderLogo()}
            alt='avatar'
            className='mr-2 w-[44px] rounded-full'
            width={36}
            height={36}
          />

          <div>
            <Text type='body-14-semibold' color='neutral-1'>
              {renderDisplayName()}
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
                <div
                  className='flex h-[44px] items-center justify-center [border-bottom:1px_solid_#EAF4FB]'
                  onClick={() => onHidePost.run()}
                >
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
                  <ModalReport postID={postDetail?.id}>
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
      {renderContentPost()}
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
