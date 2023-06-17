import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useLikePost, useUnlikePost } from '@components/Post/service';
import Text from '@components/UI/Text';

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

  const { likePost, loading: loadingLikePost, onLikePost } = useLikePost(String(router.query.id));

  const {
    unlikePost,
    loading: loadingUnlikePost,
    onUnlikePost,
  } = useUnlikePost(String(router.query.id));

  console.log(likePost, loadingLikePost, unlikePost, loadingUnlikePost);

  const handleLikeOrUnLikePost = () => {
    setIsLike(!isLike);
    if (isLike) {
      onUnlikePost();
    } else {
      onLikePost();
    }
    return () => props.onRefreshPostDetail();
  };
  console.log(postDetail);

  return (
    <div className='newsfeed mt-[10px] cursor-pointer border-b border-t border-solid border-[#D8EBFC] px-[16px] py-[24px]'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row items-center'>
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
              {dayjs(postDetail?.timeString).format('HH:mm')}
            </Text>
          </div>
        </div>
        <div className='flex'>
          <button className='mr-[5px] flex h-[36px] w-[89px] flex-row items-center justify-center rounded bg-[#1F6EAC]'>
            <Image
              src='/static/icons/iconPlus.svg'
              alt=''
              width='0'
              height='0'
              className='mr-[4px] w-[8px]'
            />
            <Text type='body-14-semibold' color='neutral-9'>
              Follow
            </Text>
          </button>
          <Image
            src='/static/icons/iconDot.svg'
            alt=''
            width='0'
            height='0'
            className='w-[33px] cursor-pointer'
          />
        </div>
      </div>
      <div className='desc mb-[15px] mt-[18px]'>{postDetail?.post?.message}</div>
      {postDetail?.post?.urlImages && (
        <div className='theme'>
          <Image src='/static/images/theme.jpg' alt='' width={326} height={185} />
        </div>
      )}
      <div className='action mt-[15px] flex flex-row items-center justify-between'>
        <div
          className='like z-10 flex cursor-pointer flex-row items-center justify-center'
          onClick={() => handleLikeOrUnLikePost()}
        >
          <Image
            src={isLike ? '/static/icons/iconLiked.svg' : '/static/icons/iconLike.svg'}
            color='#FFFFFF'
            alt=''
            width='0'
            height='0'
            className='mr-[8px] h-[14px] w-[18px]'
          />
          <Text type='body-12-medium' className={isLike ? 'text-[#589DC0]' : 'text-[#AACCDF]'}>
            {postDetail?.totalLikes} Likes
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
          <Text type='body-12-medium' className='text-[#AACCDF]'>
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
          <Text type='body-12-medium' className='text-[#AACCDF]'>
            <ModalReport>32 Shares</ModalReport>
          </Text>
        </div>
      </div>
    </div>
  );
};
export default NewFeedItem;
