import React from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import { likePost, unlikePost, useCommentsOfPost } from '@components/Post/service';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { USERTYPE } from '@utils/constant';
import PopupComponent from '@utils/PopupComponent';

import ModalComment from './ModalComment';

interface IActivitiesActionProps {
  isLike: boolean;
  idPost: string;
  refresh: () => void;
}

const ActivitiesAction = (props: IActivitiesActionProps) => {
  const { isLike, idPost, refresh } = props;
  const { t } = useTranslation('common');

  const { commentsOfPost, refreshCommentOfPost } = useCommentsOfPost(idPost);

  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { statusUser, isLogin } = useUserType();

  const totalComments = commentsOfPost?.data?.list?.length;
  const commentChild = commentsOfPost?.data?.list?.reduce(
    (acc: any, current: any) => acc + current?.totalChildren,
    0,
  );
  const countComment = totalComments + commentChild;

  const useLikePost = useRequest(
    () => {
      return likePost(String(idPost));
    },
    {
      manual: true,
      onSuccess: () => {
        refresh && refresh();
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
        refresh && refresh();
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
        PopupComponent.openEKYC();
      } else if (isLike) {
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

  return (
    <div className='flex'>
      <div onClick={() => handleLikeOrUnLikePost()}>
        <Text
          type='body-12-regular'
          color='neutral-gray'
          className={classNames('mr-[38px] cursor-pointer', { '!text-[#589DC0]': isLike })}
        >
          {t('like')}
        </Text>
      </div>

      <ModalComment
        commentsOfPost={commentsOfPost}
        refreshCommentOfPost={refreshCommentOfPost}
        id={idPost}
        refresh={refresh}
      >
        <Text type='body-12-regular' color='neutral-gray'>
          {countComment > 0 && countComment} {t('comment')}
        </Text>
      </ModalComment>
    </div>
  );
};

export default ActivitiesAction;
