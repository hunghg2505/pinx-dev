import React, { useEffect, useState } from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import { getTotalSharePost, likePost, unlikePost } from '@components/Post/service';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { USERTYPE, useUserType } from '@hooks/useUserType';
import { ROUTE_PATH } from '@utils/common';
import PopupComponent from '@utils/PopupComponent';

const ModalShare = dynamic(() => import('../ModalShare'));

interface IPostActionProps {
  isLike: boolean;
  idPost: string;
  onRefreshPostDetail: () => void;
  onNavigate?: () => void;
  totalLikes: number;
  totalComments: number;
  urlPost: string;
}

const PostAction = (props: IPostActionProps) => {
  const { isLike, idPost, onRefreshPostDetail, onNavigate, totalLikes, totalComments, urlPost } =
    props;

  const [showModalShare, setShowModalShare] = useState(false);
  const { statusUser, isLogin } = useUserType();
  const router = useRouter();

  const isPostDetailPath = router.pathname.startsWith(ROUTE_PATH.POST_DETAIL_PATH);

  useEffect(() => {
    if (!showModalShare) {
      requestGetTotalShare.run(urlPost);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModalShare]);

  const requestGetTotalShare = useRequest(getTotalSharePost, {
    manual: true,
  });

  const useUnLike = useRequest(
    () => {
      return unlikePost(String(idPost));
    },
    {
      manual: true,
      onSuccess: () => {
        onRefreshPostDetail();
      },
      onError: (err: any) => {
        if (err?.error === 'VSD account is required') {
          toast(() => (
            <Notification
              type='error'
              message='User VSD Pending to close khi like, comment, reply, report hiển thị snackbar báo lỗi “Your account has been pending to close. You cannot perform this action'
            />
          ));
        }
      },
    },
  );

  const useLikePost = useRequest(
    () => {
      return likePost(String(idPost));
    },
    {
      manual: true,
      onSuccess: () => {
        onRefreshPostDetail();
      },
      onError: (err: any) => {
        if (err?.error === 'VSD account is required') {
          toast(() => (
            <Notification
              type='error'
              message='User VSD Pending to close khi like, comment, reply, report hiển thị snackbar báo lỗi “Your account has been pending to close. You cannot perform this action'
            />
          ));
        }
      },
    },
  );

  const handleLikeOrUnLikePost = () => {
    if (isLogin) {
      if (statusUser !== USERTYPE.VSD) {
        PopupComponent.openEKYC();
      } else if (isLike) {
        useUnLike.run();
      } else {
        useLikePost.run();
      }
    } else {
      PopupComponent.open();
    }
  };

  const handleComment = () => {
    if (isLogin) {
      if (statusUser !== USERTYPE.VSD && isPostDetailPath) {
        PopupComponent.openEKYC();
      } else {
        onNavigate && onNavigate();
      }
    } else {
      PopupComponent.open();
    }
  };

  return (
    <>
      <div className='action flex flex-row items-center justify-between desktop:justify-start'>
        <div
          className='like z-10 flex cursor-pointer flex-row items-center justify-center desktop:mr-[40px]'
          onClick={() => handleLikeOrUnLikePost()}
        >
          <img
            src={isLike ? '/static/icons/iconLike.svg' : '/static/icons/iconUnLike.svg'}
            color='#FFFFFF'
            alt=''
            width={16}
            height={14}
            sizes='100vw'
            className='mr-[8px] h-[14px] w-[18px] object-contain'
          />
          <Text
            type='body-12-medium'
            color='primary-5'
            className={classNames({ '!text-[#589DC0]': isLike })}
          >
            {totalLikes || ''} Like
          </Text>
        </div>
        <div
          className='comment flex cursor-pointer flex-row items-center justify-center desktop:mr-[40px]'
          onClick={handleComment}
        >
          <img
            src='/static/icons/iconComment.svg'
            alt=''
            width={14}
            height={14}
            className='mr-[8px] h-[14px] w-[14px] object-contain'
          />
          <Text type='body-12-medium' color='primary-5'>
            {totalComments || ''} Comment
          </Text>
        </div>
        <div
          className='report flex cursor-pointer flex-row items-center justify-center'
          onClick={() => setShowModalShare(true)}
        >
          <img
            src='/static/icons/iconShare.svg'
            alt=''
            width={14}
            height={14}
            className='mr-[8px] h-[14px] w-[14px] object-contain'
          />
          <Text type='body-12-medium' color='primary-5'>
            {requestGetTotalShare?.data?.shares?.all || ''} Share
          </Text>
        </div>
      </div>

      <ModalShare
        url={urlPost}
        visible={showModalShare}
        handleClose={() => {
          setShowModalShare(false);
        }}
      />
    </>
  );
};

export default PostAction;
