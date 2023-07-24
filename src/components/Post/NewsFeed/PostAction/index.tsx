import React, { useEffect, useState } from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import { getTotalSharePost, likePost, unlikePost } from '@components/Post/service';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { ROUTE_PATH } from '@utils/common';
import { USERTYPE } from '@utils/constant';
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
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const router = useRouter();
  const [like, setLike] = React.useState(isLike);
  const [totalLike, setTotalLike] = React.useState(totalLikes);
  React.useEffect(() => {
    setLike(isLike);
    setTotalLike(totalLikes);
  }, [isLike, totalLikes]);
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

  const useLikePost = useRequest(
    () => {
      return likePost(String(idPost));
    },
    {
      manual: true,
      onSuccess: () => {
        onRefreshPostDetail && onRefreshPostDetail();
        setLike(true);
        setTotalLike(totalLikes + 1);
      },
      onError: (err: any) => {
        if (err?.error === 'VSD account is required') {
          toast(() => (
            <Notification
              type='error'
              message='Your account has been pending to close. You cannot perform this action'
            />
          ));
        }
      },
    },
  );
  const useUnLike = useRequest(
    () => {
      return unlikePost(String(idPost));
    },
    {
      manual: true,
      onSuccess: () => {
        onRefreshPostDetail && onRefreshPostDetail();
        setLike(false);
        setTotalLike(totalLikes - 1);
      },
      onError: (err: any) => {
        if (err?.error === 'VSD account is required') {
          toast(() => (
            <Notification
              type='error'
              message='Your account has been pending to close. You cannot perform this action'
            />
          ));
        }
      },
    },
  );
  const handleLikeOrUnLikePost = () => {
    if (isLogin) {
      if (statusUser === USERTYPE.PENDING_TO_CLOSE) {
        toast(() => (
          <Notification
            type='error'
            message='Your account has been pending to close. You cannot perform this action'
          />
        ));
      } else if (statusUser !== USERTYPE.VSD) {
        PopupComponent.openEKYC();
      } else if (like) {
        useUnLike.run();
      } else {
        useLikePost.run();
      }
    } else {
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };

  const handleComment = () => {
    if (isPostDetailPath) {
      if (isLogin) {
        if (statusUser === USERTYPE.PENDING_TO_CLOSE) {
          toast(() => (
            <Notification
              type='error'
              message='Your account has been pending to close. You cannot perform this action'
            />
          ));
        } else if (statusUser !== USERTYPE.VSD) {
          PopupComponent.openEKYC();
        }
      } else {
        setPopupStatus({
          ...popupStatus,
          popupAccessLinmit: true,
        });
      }
    } else {
      onNavigate && onNavigate();
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
            src={like && isLogin ? '/static/icons/iconLike.svg' : '/static/icons/iconUnLike.svg'}
            color='#FFFFFF'
            alt=''
            sizes='100vw'
            className='mr-[8px] h-[20px] w-[22px] object-contain'
          />
          <Text
            type='body-14-medium'
            color='primary-5'
            className={classNames({ '!text-[#589DC0]': like && isLogin })}
          >
            {totalLike > 0 ? totalLike : ''} Like
          </Text>
        </div>
        <div
          className='comment flex cursor-pointer flex-row items-center justify-center desktop:mr-[40px]'
          onClick={handleComment}
        >
          <img
            src='/static/icons/iconComment.svg'
            alt=''
            className='mr-[8px] h-[20px] w-[20px] object-contain'
          />
          <Text type='body-14-medium' color='primary-5'>
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
            className='mr-[8px] h-[20px] w-[20px] object-contain'
          />
          <Text type='body-14-medium' color='primary-5'>
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
