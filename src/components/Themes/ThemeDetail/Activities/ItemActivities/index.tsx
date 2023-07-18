import { useRequest } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAtom } from 'jotai';
import { toast } from 'react-hot-toast';

import { INewFeed } from '@components/Home/service';
import { likePost, unlikePost, useCommentsOfPost } from '@components/Post/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { toNonAccentVietnamese } from '@utils/common';
import { USERTYPE } from '@utils/constant';
import PopupComponent from '@utils/PopupComponent';

import ModalComment from '../ModalComment';

dayjs.extend(relativeTime);
export enum ActionPostEnum {
  UNSUBSCRIBE = 'UNSUBSCRIBE',
  SUBSCRIBE = 'SUBSCRIBE',
}
const ItemActivities = ({ data, refresh }: { data: INewFeed; refresh: () => void }) => {
  console.log('🚀 ~ file: index.tsx:25 ~ ItemActivities ~ data:', data);
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { statusUser, isLogin } = useUserType();
  const isSubsribed = data?.post?.action === ActionPostEnum.SUBSCRIBE;
  const idPost = data?.id;
  const isLike = data?.isLike;
  const avatar = data?.post?.customerInfo?.avatar;
  const nameAvatar =
    data?.post?.customerInfo?.displayName &&
    toNonAccentVietnamese(data?.post?.customerInfo?.displayName)?.charAt(0)?.toUpperCase();
  const { commentsOfPost, refreshCommentOfPOst } = useCommentsOfPost(String(data?.id));
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
        // onRefreshPostDetail();
        refresh && refresh();
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
  const useUnLike = useRequest(
    () => {
      return unlikePost(String(idPost));
    },
    {
      manual: true,
      onSuccess: () => {
        // onRefreshPostDetail();
        refresh && refresh();
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
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };
  return (
    <div className='flex'>
      {avatar ? (
        <img src={avatar} alt='' className='mr-[12px] h-[28px] w-[28px] rounded-full' />
      ) : (
        <div className='mr-[12px] h-[28px] w-[28px]'>
          <AvatarDefault name={nameAvatar} />
        </div>
      )}

      <div className='w-[calc(100%_-_40px)]'>
        <div className='relative w-full rounded-[12px] bg-[#EEF5F9] px-[16px] py-[12px]'>
          <div className='flex items-center justify-between'>
            <Text type='body-14-semibold' color='neutral-black'>
              {data?.post?.customerInfo?.displayName}
            </Text>
            <Text type='body-12-regular' color='neutral-gray'>
              {dayjs(data?.timeString).fromNow(true)}
            </Text>
          </div>
          <div className='mt-[15px] flex items-center'>
            <img
              src={
                isSubsribed ? '/static/icons/iconHeartActive.svg' : '/static/icons/iconHeart.svg'
              }
              alt=''
              className='mr-[10px] h-[24px] w-[24px]'
            />
            <Text type='body-14-regular' color='neutral-black'>
              {data?.post?.message}
            </Text>
          </div>
          {data?.totalLikes > 0 && (
            <div className='like absolute -bottom-[12px] right-0 flex  h-[24px] w-[54px] items-center justify-center rounded-[100px] bg-[#F0F7FC] [box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
              <img src='/static/icons/iconLike.svg' alt='' className='mr-[4px] w-[16px]' />
              <Text type='body-12-regular' color='primary-1'>
                {data?.totalLikes}
              </Text>
            </div>
          )}
        </div>
        <div className='mt-[8px] flex'>
          <div onClick={() => handleLikeOrUnLikePost()} className='cursor-pointer'>
            <Text
              type='body-12-regular'
              color='neutral-gray'
              className={classNames('mr-[38px]', { '!text-[#589DC0]': isLike })}
            >
              Like
            </Text>
          </div>

          <ModalComment
            commentsOfPost={commentsOfPost}
            refreshCommentOfPOst={refreshCommentOfPOst}
            id={idPost}
            refresh={refresh}
          >
            <Text type='body-12-regular' color='neutral-gray'>
              {countComment > 0 && countComment} Comment
            </Text>
          </ModalComment>
        </div>
      </div>
    </div>
  );
};
export default ItemActivities;
