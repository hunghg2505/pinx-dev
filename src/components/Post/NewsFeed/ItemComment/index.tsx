import React, { useEffect, useRef, useState } from 'react';

import { useRequest, useClickAway } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import ModalMedia from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/ModalMedia';
import {
  IComment,
  requestHideComment,
  requestLikeComment,
  requestUnLikeComment,
} from '@components/Post/service';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { formatMessage, ROUTE_PATH } from '@utils/common';
import { USERTYPE } from '@utils/constant';

const ModalReportComment = dynamic(import('./ModalReportComment'), {
  ssr: false,
});

dayjs.extend(relativeTime);
interface IProps {
  onNavigate?: () => void;
  onReplies?: (value: string, customerId: number, id: string) => void;
  data: IComment;
  refreshTotal?: () => void;
  isChildren?: boolean;
  width?: number;
  refreshCommentOfPOst?: () => void;
  isLastChildren?: boolean;
  isReply?: boolean;
}
const ItemComment = (props: IProps) => {
  const { t, i18n } = useTranslation();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const router = useRouter();
  const { statusUser, isLogin } = useUserType();
  const [showDelete, setShowDelete] = React.useState(false);
  const {
    onNavigate,
    data,
    onReplies,
    refreshTotal,
    isChildren = false,
    width,
    refreshCommentOfPOst,
    isLastChildren,
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
        toast(() => <Notification type='error' message={t('message_account_pending_to_close')} />);
      } else if (statusUser !== USERTYPE.VSD && isPostDetailPath) {
        setPopupStatus({ ...popupStatus, popupEkyc: true });
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
  // const onRedirect = (url: string) => {
  //   router.push({
  //     pathname: '/redirecting',
  //     query: { url },
  //   });
  // };
  React.useEffect(() => {
    const handleClick = (event: any) => {
      const textContent = event?.target?.textContent;
      const classElement = event?.target?.className;
      if (classElement === 'link') {
        router.push({
          pathname: '/redirecting',
          query: { url: textContent },
        });
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);
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
        refreshCommentOfPOst && refreshCommentOfPOst();
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
      return requestUnLikeComment(data.id);
    },
    {
      manual: true,
      onSuccess: () => {
        refreshCommentOfPOst && refreshCommentOfPOst();
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
  const onLike = () => {
    if (isLogin) {
      if (statusUser === USERTYPE.PENDING_TO_CLOSE) {
        toast(() => <Notification type='error' message={t('message_account_pending_to_close')} />);
      } else if (statusUser !== USERTYPE.VSD) {
        setPopupStatus({ ...popupStatus, popupEkyc: true });
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
  const handleClick = (event: any) => {
    const textContent = event?.target?.textContent;
    const classElement = event?.target?.className;
    if (classElement === 'link') {
      router.push({
        pathname: '/redirecting',
        query: { url: textContent },
      });
    }
  };
  // const [windowSize, setWindowSize] = useState([window.innerWidth]);
  const commentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (isChildren) {
      if (!commentRef?.current?.clientHeight) {
        return;
      }
      setHeight(commentRef?.current?.clientHeight);
    } else if (commentRef?.current?.parentElement?.clientHeight) {
      setHeight(commentRef?.current?.parentElement?.clientHeight);
    }
  }, [commentRef?.current?.clientHeight, commentRef?.current?.parentElement?.clientHeight]);
  useEffect(() => {
    if (!isChildren) {
      const element = commentRef?.current?.parentElement;
      if (!element) {
        return;
      }
      const observer = new ResizeObserver(() => {
        if (element.clientHeight) {
          setHeight(element.clientHeight);
        }
      });
      observer.observe(element);
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  const minCommentHeight = 95;
  return (
    <div ref={commentRef} className='comment mt-[12px]'>
      <div className='relative flex flex-row items-start'>
        <img
          src={data?.customerInfo?.avatar}
          alt=''
          width='0'
          height='0'
          sizes='100vw'
          className={classNames('mr-[8px] cursor-pointer rounded-full object-cover', {
            'h-[40px] w-[40px]': !isChildren,
            'h-[36px] w-[36px]': isChildren,
          })}
          onClick={() =>
            isComment
              ? router.push(ROUTE_PATH.MY_PROFILE)
              : router.push(ROUTE_PATH.PROFILE_DETAIL(data?.customerId))
          }
        />
        {isPostDetailPath && data?.children.length > 0 && !isChildren && (
          <div
            style={{
              height: `${height - minCommentHeight - 40 - 18 + 13}px`,
            }}
            className={classNames('absolute left-[20px] top-[44px] z-0 w-[2px] bg-neutral_07')}
          ></div>
        )}

        {isChildren && (
          <div>
            <div className='absolute -left-[28px] -top-[18px] z-30 h-[40px] w-[20px] rounded-bl-xl  bg-neutral_07'></div>
            <div className='absolute -left-[26px] -top-[19.5px] z-30 h-[40px] w-[20px] rounded-bl-xl   bg-white'></div>
            {isLastChildren && (
              <div
                style={{
                  height: `${height - 4}px`,
                }}
                className='absolute -left-[28px] top-0 z-20 w-[2px] bg-white '
              ></div>
            )}
          </div>
        )}

        {/* bg-[#F6FAFD] */}
        <div
          className={classNames('content relative flex-1', {
            'w-[calc(100%_-_40px)]': isChildren,
            'w-[calc(100%_-_48px)]': !isChildren,
          })}
        >
          <div className='relative mb-[8px] flex-1 rounded-[12px] bg-[#F3F2F6] pt-[12px]'>
            <div className='flex w-full flex-row items-center justify-between px-[16px]'>
              <div className='relative flex items-center'>
                <Text type='body-14-semibold' color='neutral-1'>
                  {data?.customerInfo?.displayName}
                </Text>
                {data?.customerInfo?.isFeatureProfile && (
                  <img
                    src='/static/icons/iconKol.svg'
                    alt=''
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='ml-[6px] h-[14px] w-[14px] object-contain'
                  />
                )}
                {data?.customerInfo?.isKol && (
                  <img
                    src='/static/icons/iconTick.svg'
                    alt=''
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='ml-[6px] h-[14px] w-[14px] object-contain'
                  />
                )}
              </div>
              <button className='relative flex items-center' ref={ref}>
                {isComment && (
                  <img
                    src='/static/icons/iconDotHorizontal.svg'
                    alt=''
                    className='ml-[8px] h-[14px] w-[14px] rotate-90 transform cursor-pointer'
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
                      {t('delete')}
                    </Text>
                  </div>
                )}
              </button>
            </div>
            <div
              className='box-border rounded-[12px] bg-[#F3F2F6] px-[16px] pb-[12px] pt-[6px]'
              onClick={(event) => handleClick(event)}
            >
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
              <div className='absolute bottom-0 right-[10px] flex h-[24px] w-[54px] translate-y-1/2 flex-row items-center justify-center rounded-[100px] bg-[#F3F2F6]'>
                <img
                  src='/static/icons/iconLike.svg'
                  alt=''
                  width='0'
                  height='0'
                  className='mr-[10px] w-[15px]'
                />
                <Text type='body-13-regular' color='primary-1' className='tablet:!text-[14px]'>
                  {data?.totalLikes}
                </Text>
              </div>
            )}
          </div>

          {urlImage && (
            <ModalMedia url={urlImage}>
              <img
                src={urlImage}
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='mb-[8px] h-[100px] w-[100px] rounded-[8px] object-cover'
              />
            </ModalMedia>
          )}

          <div className='action flex gap-x-[12px] tablet:gap-x-[18px]'>
            <div className='flex cursor-pointer like' onClick={onLike}>
              <Text
                type='body-13-regular'
                className={classNames('tablet:!text-[14px]', {
                  'text-[#589DC0]': data?.isLike && isLogin,
                  'text-[#808080]': !data?.isLike || !isLogin,
                })}
              >
                {t('like')}
              </Text>
            </div>
            <div
              className='flex cursor-pointer comment'
              onClick={() => onComment(name, data?.customerId, data?.id)}
            >
              <Text
                type='body-13-regular'
                color='neutral-4'
                className='mr-[3px] tablet:!text-[14px]'
              >
                {data?.children?.length > 0 ? data?.children?.length : ''}
              </Text>
              <div>
                <Text type='body-13-regular' color='neutral-4' className='tablet:!text-[14px]'>
                  {t('reply')}
                </Text>
              </div>
            </div>
            <ModalReportComment
              isReported={data?.isReport}
              postID={data?.id}
              refreshCommentOfPOst={refreshCommentOfPOst}
            >
              {numberReport} {t('report')}
            </ModalReportComment>

            <Text
              type='body-13-regular'
              color='neutral-4'
              className='select-none !font-light tablet:!text-[14px]'
            >
              {dayjs(data?.timeString)?.locale(i18n.language)?.fromNow(true)}
            </Text>
          </div>
          <div
            className='pointer-events-none visible absolute -bottom-[50px] h-[50px]'
            ref={bottomRef}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default ItemComment;
