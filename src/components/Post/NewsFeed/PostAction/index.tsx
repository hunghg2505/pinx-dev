import React, { useEffect, useState } from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import { likePost, unlikePost, useGetTotalSharePost } from '@components/Post/service';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { ROUTE_PATH } from '@utils/common';
import { USERTYPE } from '@utils/constant';

const ModalShare = dynamic(() => import('../ModalShare'), {
  ssr: false,
});

interface IPostActionProps {
  isLike: boolean;
  idPost: string;
  onNavigate?: () => void;
  totalLikes: number;
  totalComments: number;
  urlPost: string;
  className?: string;
  isForceNavigate?: boolean;
  postDetail?: any;
}

const PostAction = (props: IPostActionProps) => {
  const { t } = useTranslation('common');
  const {
    isLike,
    idPost,
    onNavigate,
    totalLikes,
    totalComments,
    urlPost,
    className,
    isForceNavigate,
    postDetail
  } = props;

  const { statusUser, isLogin } = useUserType();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const [postDetailStatus, setPostDetailStatus] = useAtom(postDetailStatusAtom);
  const router = useRouter();
  const [like, setLike] = React.useState(isLike);
  const [totalLike, setTotalLike] = React.useState(totalLikes);
  const isPostDetailPath = router.pathname.startsWith(ROUTE_PATH.POST_DETAIL_PATH);
  const [urlPostFormat, setUrlPostFormat] = useState('');
  const [modalShareVisible, setModalShareVisible] = useState(false);

  React.useEffect(() => {
    setLike(isLike);
    setTotalLike(totalLikes);
  }, [isLike, totalLikes]);

  useEffect(() => {
    if (!window) {
      setUrlPostFormat(urlPost);
    }

    setUrlPostFormat(window.location.origin + urlPost);
  }, [urlPost]);

  useEffect(() => {
    if (!modalShareVisible) {
      onGetTotalShare(urlPostFormat);
    }
  }, [modalShareVisible, urlPostFormat]);

  const useLikePost = useRequest(
    () => {
      return likePost(String(idPost));
    },
    {
      manual: true,
      onSuccess: () => {
        setLike(true);
        setTotalLike(totalLike + 1);
        setPostDetailStatus({ ...postDetailStatus, idPostLike: idPost });
      },
      onError: (err: any) => {
        if (err?.error === 'VSD account is required') {
          toast(() => (
            <Notification type='error' message={t('message_account_pending_to_close')} />
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
        setLike(false);
        setTotalLike(totalLike - 1);
        setPostDetailStatus({ ...postDetailStatus, idPostLike: idPost });
      },
      onError: (err: any) => {
        if (err?.error === 'VSD account is required') {
          toast(() => (
            <Notification type='error' message={t('message_account_pending_to_close')} />
          ));
        }
      },
    },
  );

  const handleLikeOrUnLikePost = () => {
    if (isLogin) {
      if (statusUser === USERTYPE.PENDING_TO_CLOSE) {
        toast(() => <Notification type='error' message={t('message_account_pending_to_close')} />);
      } else if (statusUser !== USERTYPE.VSD) {
        setPopupStatus({
          ...popupStatus,
          popupEkyc: true,
        });
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
    if (isPostDetailPath && !isForceNavigate) {
      if (isLogin) {
        if (statusUser === USERTYPE.PENDING_TO_CLOSE) {
          toast(() => (
            <Notification type='error' message={t('message_account_pending_to_close')} />
          ));
        } else if (statusUser !== USERTYPE.VSD) {
          // PopupComponent.openEKYC();
          setPopupStatus({
            ...popupStatus,
            popupEkyc: true,
          });
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

  const { onGetTotalShare, total } = useGetTotalSharePost();

  return (
    <>
      {modalShareVisible && (
        <ModalShare
          urlPost={urlPostFormat}
          modalShareVisible={modalShareVisible}
          setModalShareVisible={setModalShareVisible}
          postDetail={postDetail}
        />
      )}
      <div
        className={classNames(
          'action flex flex-row items-center justify-around  py-3 [border-top:1px_solid_#EBEBEB]',
          className,
        )}
      >
        <div
          className='like z-10 flex cursor-pointer flex-row items-center justify-center desktop:mr-[40px]'
          onClick={handleLikeOrUnLikePost}
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
            {totalLike > 0 ? totalLike : ''} <span className='galaxy-max:hidden'>{t('like')}</span>
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
            <span>{totalComments || ''}</span>{' '}
            <span className=' galaxy-max:hidden'>{t('comment')}</span>
          </Text>
        </div>
        <div className='report flex cursor-pointer flex-row items-center justify-center' onClick={() => setModalShareVisible(true)}>
          <img
            src='/static/icons/iconShare.svg'
            alt=''
            className='mr-[8px] h-[20px] w-[20px] object-contain'
          />
          <Text type='body-14-medium' color='primary-5'>
            {total || ''} <span className='galaxy-max:hidden'>{t('share')}</span>
          </Text>
        </div>
      </div>
    </>
  );
};

export default PostAction;
