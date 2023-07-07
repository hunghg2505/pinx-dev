import React, { useRef } from 'react';

import { useRequest, useClickAway } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import {
  IComment,
  requestHideComment,
  requestLikeComment,
  requestUnLikeComment,
} from '@components/Post/service';
import Fancybox from '@components/UI/Fancybox';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { formatMessage, ROUTE_PATH } from '@utils/common';
import { USERTYPE } from '@utils/constant';
import PopupComponent from '@utils/PopupComponent';

const ModalReportComment = dynamic(import('./ModalReportComment'), {
  ssr: false,
});

dayjs.extend(relativeTime);
interface IProps {
  onNavigate?: () => void;
  onReplies?: (value: string, customerId: number, id: string) => void;
  data: IComment;
  refresh: () => void;
  refreshTotal?: () => void;
  isChildren?: boolean;
  width?: number;
  refreshCommentOfPOst?: () => void;
}
const ItemComment = (props: IProps) => {
  const router = useRouter();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { statusUser, isLogin } = useUserType();
  const [showDelete, setShowDelete] = React.useState(false);
  const {
    onNavigate,
    data,
    onReplies,
    refresh,
    refreshTotal,
    isChildren = false,
    width,
    refreshCommentOfPOst,
  } = props;
  const { userLoginInfo } = useUserLoginInfo();
  const isComment = userLoginInfo?.id === data?.customerId;
  const ref = React.useRef<HTMLButtonElement>(null);
  const bottomRef: any = useRef(null);
  const isPostDetailPath = router.pathname.startsWith(ROUTE_PATH.POST_DETAIL_PATH);

  const onComment = (value: string, customerId: number, id: string) => {
    const idComment = isChildren ? data?.parentId : id;
    if (isLogin) {
      if (statusUser === USERTYPE.PENDING_TO_CLOSE && isPostDetailPath) {
        toast(() => (
          <Notification
            type='error'
            message='Your account has been pending to close. You cannot perform this action'
          />
        ));
      } else if (statusUser !== USERTYPE.VSD && isPostDetailPath) {
        PopupComponent.openEKYC();
      } else if (onNavigate) {
        onNavigate();
      } else {
        onReplies && onReplies(value, customerId, idComment);
        if (width && width < 738) {
          bottomRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
        }
      }
    } else {
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };
  useClickAway(() => {
    showDelete && setShowDelete(false);
  }, ref);
  const message = data?.message && formatMessage(data?.message, data);
  const name = data?.customerInfo?.displayName || '';
  const isLike = data?.isLike;
  const numberReport = data?.reports?.length > 0 ? data?.reports.length : '';
  const urlImage = data?.urlImages?.length > 0 ? data?.urlImages?.[0] : '';
  const useLike = useRequest(
    () => {
      return requestLikeComment(data.id);
    },
    {
      manual: true,
      onSuccess: () => {
        refresh();
        refreshCommentOfPOst && refreshCommentOfPOst();
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
      return requestUnLikeComment(data.id);
    },
    {
      manual: true,
      onSuccess: () => {
        refresh();
        refreshCommentOfPOst && refreshCommentOfPOst();
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
  const onLike = () => {
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
      } else if (isLike) {
        useUnLike.run();
      } else {
        useLike.run();
      }
    } else {
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };

  // hide comment
  const useHideComment = useRequest(
    () => {
      return requestHideComment(data?.id);
    },
    {
      manual: true,
      onSuccess: () => {
        refresh();
        refreshCommentOfPOst && refreshCommentOfPOst();
        refreshTotal && refreshTotal();
        setShowDelete(false);
      },
    },
  );
  const onShowDelete = () => {
    setShowDelete(!showDelete);
  };
  const onDelete = () => {
    useHideComment.run();
  };
  return (
    <div className='comment mb-[22px] px-[16px]'>
      <div className='flex flex-row items-start'>
        <img
          src={data?.customerInfo?.avatar}
          alt=''
          width='0'
          height='0'
          sizes='100vw'
          className={classNames('mr-[12px] rounded-full', {
            'w-[36px]': !isChildren,
            'w-[28px]': isChildren,
          })}
        />
        {/* bg-[#F6FAFD] */}
        <div
          className={classNames('content', {
            'w-[calc(100%_-_40px)]': isChildren,
            'w-[calc(100%_-_48px)]': !isChildren,
          })}
        >
          <div className='relative mb-[8px] rounded-[12px] bg-[#F3F2F6] pt-[12px]'>
            <div className='flex w-full flex-row items-center justify-between px-[16px]'>
              <Text type='body-14-semibold' color='neutral-1'>
                {data?.customerInfo?.displayName}
              </Text>
              <button className='relative flex items-center' ref={ref}>
                <Text type='body-14-regular' color='neutral-5'>
                  {dayjs(data?.timeString).fromNow(true)}
                </Text>
                {isComment && (
                  <img
                    src='/static/icons/iconDot.svg'
                    alt=''
                    width={0}
                    height={0}
                    className='h-[18px] w-[18px] rotate-90 transform cursor-pointer'
                    onClick={onShowDelete}
                  />
                )}

                {showDelete && (
                  <div
                    className=' absolute -bottom-[55px] right-0 z-20 flex h-[52px] w-[121px] cursor-pointer flex-row items-center justify-center rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px] rounded-tr-[4px] bg-[#ffffff] [box-shadow:0px_9px_28px_8px_rgba(0,_0,_0,_0.05),_0px_6px_16px_0px_rgba(0,_0,_0,_0.08),_0px_3px_6px_-4px_rgba(0,_0,_0,_0.12)]'
                    onClick={onDelete}
                  >
                    <img
                      src='/static/icons/iconDelete.svg'
                      alt=''
                      width={0}
                      height={0}
                      className='mr-[8px] h-[24px] w-[24px]'
                    />
                    <Text type='body-16-regular' color='primary-5'>
                      Delete
                    </Text>
                  </div>
                )}
              </button>
            </div>
            <div className='box-border rounded-[12px] bg-[#F3F2F6] px-[16px] py-[12px]'>
              <Text type='body-16-regular' className='text-[#0D0D0D]'>
                {message && (
                  <div
                    dangerouslySetInnerHTML={{ __html: message }}
                    className='messageFormat [word-wrap:break-word]'
                  ></div>
                )}
              </Text>
            </div>

            {data?.totalLikes > 0 && (
              <div className='absolute bottom-0 right-[1px] flex h-[24px] w-[54px] translate-y-1/2 flex-row items-center justify-center rounded-[100px] bg-[#F3F2F6]'>
                <img
                  src='/static/icons/iconLike.svg'
                  alt=''
                  width='0'
                  height='0'
                  className='mr-[10px] w-[15px]'
                />
                <Text type='body-12-regular' color='primary-1'>
                  {data?.totalLikes}
                </Text>
              </div>
            )}
          </div>
          {urlImage !== '' && (
            <Fancybox
              options={{
                closeButton: true,
              }}
            >
              <a data-fancybox='gallery' href={urlImage}>
                {urlImage && (
                  <img
                    src={urlImage}
                    alt=''
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='mb-[8px] h-[100px] w-[100px] rounded-[8px] object-cover'
                  />
                )}
              </a>
            </Fancybox>
          )}

          <div className='action flex' ref={bottomRef}>
            <div className='like mr-[38px] flex cursor-pointer' onClick={onLike}>
              <Text
                type='body-14-regular'
                className={classNames({
                  'text-[#589DC0]': data?.isLike,
                  'text-[#808080]': !data?.isLike,
                })}
              >
                Like
              </Text>
            </div>
            <div
              className='comment mr-[38px] flex cursor-pointer'
              onClick={() => onComment(name, data?.customerId, data?.id)}
            >
              <Text type='body-14-regular' color='neutral-4' className='mr-[3px]'>
                {data?.children?.length > 0 ? data?.children?.length : ''}
              </Text>
              <div>
                <Text type='body-14-regular' color='neutral-4'>
                  Reply
                </Text>
              </div>
            </div>
            <ModalReportComment isReported={data?.isReport} postID={data?.id} refresh={refresh}>
              {numberReport} Report
            </ModalReportComment>
            {/* <Fancybox>
                <a data-fancybox='gallery' href='/static/images/image_post.jpg'>
                  <img alt='' src='/static/images/image_post.jpg' width='200' height='150' />
                </a>
              </Fancybox> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemComment;
