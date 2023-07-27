import React from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import { likePost, unlikePost } from '@components/Post/service';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
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
}

const PostAction = (props: IPostActionProps) => {
  const { t } = useTranslation('common');
  const { isLike, idPost, onNavigate, totalLikes, totalComments, urlPost } = props;

  const { statusUser, isLogin } = useUserType();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const router = useRouter();
  const [like, setLike] = React.useState(isLike);
  const [totalLike, setTotalLike] = React.useState(totalLikes);
  const isPostDetailPath = router.pathname.startsWith(ROUTE_PATH.POST_DETAIL_PATH);

  React.useEffect(() => {
    setLike(isLike);
    setTotalLike(totalLikes);
  }, [isLike, totalLikes]);

  const useLikePost = useRequest(
    () => {
      return likePost(String(idPost));
    },
    {
      manual: true,
      onSuccess: () => {
        setLike(true);
        setTotalLike(totalLikes + 1);
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
        setTotalLike(totalLikes - 1);
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
    if (isPostDetailPath) {
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

  return (
    <>
      <div className='action flex flex-row items-center justify-around  py-3 [border-top:1px_solid_#EBEBEB]'>
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
            {totalLike > 0 ? totalLike : ''} {t('like')}
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
            {totalComments || ''} {t('comment')}
          </Text>
        </div>
        <ModalShare urlPost={urlPost}>
          <div className='report flex cursor-pointer flex-row items-center justify-center'>
            <img
              src='/static/icons/iconShare.svg'
              alt=''
              className='mr-[8px] h-[20px] w-[20px] object-contain'
            />
            <Text type='body-14-medium' color='primary-5'>
              {t('share')}
            </Text>
          </div>
        </ModalShare>
      </div>
    </>
  );
};

export default PostAction;
