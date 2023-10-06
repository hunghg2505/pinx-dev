import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useRequest, useClickAway } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import Image from 'next/image';
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
import AvatarDefault from '@components/UI/AvatarDefault';
import CustomImage from '@components/UI/CustomImage';
import { IconReported } from '@components/UI/Icon/IconReported';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { formatMessage, isUrlValid, ROUTE_PATH } from '@utils/common';
import { USERTYPE } from 'src/constant';

dayjs.extend(relativeTime);

const ModalReportComment = dynamic(import('./ModalReportComment'), {
  ssr: false,
});

const MessageCommentContent = ({ message }: { message: string }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(message);
  }, [message]);

  if (!content) {
    return <></>;
  }

  return (
    <Text type='body-16-regular' className='text-[#0D0D0D] galaxy-max:text-[14px]'>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className='messageFormat [word-wrap:break-word]'
      ></div>
    </Text>
  );
};

interface IProps {
  onNavigate?: () => void;
  onReplies?: (value: string, customerId: number, id: string) => void;
  data: IComment;
  idPost?: string;
  refreshTotal?: () => void;
  isChildren?: boolean;
  width?: number;
  refreshCommentOfPOst?: () => void;
  isLastChildren?: boolean;
  isReply?: boolean;
  totalChildren?: number;
  onRemoveComment?: (v: any) => void;
  onTrackingViewTicker?: (stockCode: string) => void;
  onCloseModalComment?: () => void;
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
    // refreshTotal,
    isChildren = false,
    width,
    refreshCommentOfPOst,
    isLastChildren,
    isReply = false,
    idPost,
    totalChildren = 0,
    onRemoveComment,
    onTrackingViewTicker,
    onCloseModalComment,
  } = props;
  const { userLoginInfo } = useUserLoginInfo();
  const isComment = userLoginInfo?.id === data?.customerId;
  const ref = React.useRef<HTMLButtonElement>(null);
  const bottomRef: any = useRef(null);
  const isPostDetailPath = router.pathname.startsWith(ROUTE_PATH.POST_DETAIL_PATH);
  const isHomePath = router.pathname === '/';
  const isProfilePath = router.pathname.startsWith(ROUTE_PATH.PROFILE_PATH);
  const [postDetailStatus, setPostDetailStatus] = useAtom(postDetailStatusAtom);
  const [isLike, setIsLike] = React.useState<boolean>(data?.isLike);
  const [isReport, setIsReport] = React.useState<boolean>(data?.isReport);
  const [totalReport, setTotalReport] = React.useState<number>(0);
  const [totalLikes, setTotalLikes] = React.useState<number>(0);

  React.useEffect(() => {
    setIsLike(data?.isLike);
    setTotalLikes(data?.totalLikes);
    setIsReport(data?.isReport);
    setTotalReport(data?.totalReports);
  }, [data]);

  const message = useMemo(() => {
    return data?.message ? formatMessage(data?.message) : '';
  }, [data?.message]);

  const name = data?.customerInfo?.displayName || '';
  const urlImage = data?.urlImages?.length > 0 ? data?.urlImages?.[0] : '';
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

  const useLike = useRequest(
    () => {
      return requestLikeComment(data.id);
    },
    {
      manual: true,
      onSuccess: () => {
        setIsLike(true);
        setTotalLikes(totalLikes + 1);
        if (!isHomePath) {
          setPostDetailStatus({
            ...postDetailStatus,
            idPostAddComment: idPost,
          });
        }

        // refreshCommentOfPOst && refreshCommentOfPOst();
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
        setIsLike(false);
        setTotalLikes(totalLikes - 1);
        if (!isHomePath) {
          setPostDetailStatus({
            ...postDetailStatus,
            idPostAddComment: idPost,
          });
        }

        // refreshCommentOfPOst && refreshCommentOfPOst();
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
        onRemoveComment && onRemoveComment(data?.id);
        refreshCommentOfPOst && refreshCommentOfPOst();
        // refreshTotal && refreshTotal();
        setShowDelete(false);
        if (idPost && !isHomePath) {
          setPostDetailStatus({ ...postDetailStatus, idPostHideComment: idPost });
        }
      },
    },
  );
  const onShowDelete = () => {
    setShowDelete(!showDelete);
  };
  const onDelete = () => {
    useHideComment.run();
  };
  const handleClick = (e: any) => {
    const textContent = e?.target?.textContent;
    const classElement = e?.target?.className;
    const id = e?.target?.id;
    if (classElement === 'link') {
      // return router.push({
      //   pathname: '/redirecting',
      //   query: { url: textContent },
      // });
      window.open(textContent);
    }
    if (classElement === 'people') {
      const url =
        Number(userLoginInfo?.id) === Number(id)
          ? ROUTE_PATH.MY_PROFILE
          : ROUTE_PATH.PROFILE_DETAIL(id);
      return router.push(url);
    }
    if (classElement === 'tagStock') {
      onCloseModalComment && onCloseModalComment();
      onTrackingViewTicker && onTrackingViewTicker(textContent);
      return router.push(ROUTE_PATH.STOCK_DETAIL(textContent));
    }
    if (classElement === 'hashtag') {
      const text = textContent.slice(1);
      return router.push(`${ROUTE_PATH.SEARCHSEO}?keyword=${text}`);
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
  const addTotalReport = () => {
    if (!isHomePath) {
      setPostDetailStatus({
        ...postDetailStatus,
        idPostAddComment: idPost,
      });
    }
    setTotalReport(totalReport + 1);
  };
  return (
    <div ref={commentRef} className='comment mt-[12px]'>
      <div className='relative flex flex-row items-start'>
        {isUrlValid(data?.customerInfo?.avatar) ? (
          <CustomImage
            src={data?.customerInfo?.avatar}
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className={classNames(
              'mr-[8px] cursor-pointer rounded-full border border-solid border-[#ebebeb] object-cover galaxy-max:mr-[4px] ',
              {
                'h-[40px] w-[40px] galaxy-max:h-[36px] galaxy-max:w-[36px]': !isChildren,
                'h-[36px] w-[36px] galaxy-max:h-[32px] galaxy-max:w-[32px]': isChildren,
              },
            )}
            onClick={() =>
              isComment
                ? router.push(ROUTE_PATH.MY_PROFILE)
                : router.push(ROUTE_PATH.PROFILE_DETAIL(data?.customerId))
            }
          />
        ) : (
          <div
            className={classNames(
              'mr-[8px] cursor-pointer rounded-full object-cover galaxy-max:mr-[4px] ',
              {
                'h-[40px] w-[40px] galaxy-max:h-[36px] galaxy-max:w-[36px]': !isChildren,
                'h-[36px] w-[36px] galaxy-max:h-[32px] galaxy-max:w-[32px]': isChildren,
              },
            )}
            onClick={() =>
              isComment
                ? router.push(ROUTE_PATH.MY_PROFILE)
                : router.push(ROUTE_PATH.PROFILE_DETAIL(data?.customerId))
            }
          >
            <AvatarDefault nameClassName='text-[14px]' name={data?.customerInfo?.displayName} />
          </div>
        )}
        {!isHomePath && !isProfilePath && totalChildren > 0 && !isChildren && (
          <>
            <div
              style={{
                height: `${height - 40 - 20 + 13}px`,
              }}
              className={classNames('absolute left-[20px] top-[44px] z-0 w-[2px] bg-neutral_07')}
            ></div>
          </>
        )}
        {!isChildren && isReply && (
          <div
            style={{
              height: `${height - 95 - 40}px`,
            }}
            className='abc absolute left-[20px] top-[44px] z-10  hidden  w-[2px] bg-neutral_07 tablet:block'
          ></div>
        )}
        {isChildren && (
          <div>
            <div className='absolute -left-[28px] -top-[18px] z-20 h-[40px] w-[17px] rounded-bl-xl  bg-neutral_07'></div>
            <div className='absolute -left-[26px] -top-[19.5px] z-20 h-[40px] w-[17px] rounded-bl-xl   bg-white'></div>

            {isLastChildren && (
              <div
                style={{
                  height: `${height - 4}px`,
                }}
                className='absolute -left-[30px] top-0 z-0  w-[5px] bg-white'
              ></div>
            )}
          </div>
        )}

        <div
          className={classNames('content relative flex-1', {
            'w-[calc(100%_-_40px)]': isChildren,
            'w-[calc(100%_-_48px)]': !isChildren,
          })}
        >
          <div className='relative mb-[8px] flex-1 rounded-[12px] bg-[#F3F2F6] pt-[12px]'>
            <div className='flex w-full flex-row items-center justify-between gap-x-[12px] px-[16px]'>
              <div
                onClick={() =>
                  isComment
                    ? router.push(ROUTE_PATH.MY_PROFILE)
                    : router.push(ROUTE_PATH.PROFILE_DETAIL(data?.customerId))
                }
                className='relative flex cursor-pointer items-center overflow-hidden truncate'
              >
                <Text type='body-14-semibold' color='neutral-1' className='truncate'>
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
                    src='/static/icons/iconTickKolV2.svg'
                    alt=''
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='ml-[6px] h-[14px] w-[14px] object-contain'
                  />
                )}
              </div>
              <button className='relative flex items-center' ref={ref} aria-label='show popup'>
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
              className='box-border cursor-pointer rounded-[12px] bg-[#F3F2F6] px-[16px] pb-[12px] pt-[6px]'
              onClick={handleClick}
            >
              <MessageCommentContent message={message} />
            </div>

            {totalLikes > 0 && (
              <div className='absolute bottom-0 right-[10px] flex h-[24px] w-[54px] translate-y-1/2 flex-row items-center justify-center rounded-[100px] bg-[#F3F2F6] galaxy-max:h-[20px]  galaxy-max:w-[44px] galaxy-max:gap-1'>
                <img
                  src='/static/icons/iconLike.svg'
                  alt=''
                  width='0'
                  height='0'
                  className='mr-[10px] w-[15px] galaxy-max:mr-0'
                />

                <Text
                  type='body-13-regular'
                  color='primary-1'
                  className='galaxy-max:text-[12px] tablet:!text-[14px]'
                >
                  {totalLikes}
                </Text>
              </div>
            )}
          </div>

          {urlImage && (
            <ModalMedia url={urlImage}>
              <Image
                src={urlImage}
                alt=''
                width='0'
                height='0'
                sizes='100vw'
                className='mb-[8px] h-[100px] w-[100px] rounded-[8px] object-cover'
              />
            </ModalMedia>
          )}

          <div className='action flex gap-x-[12px] galaxy-max:justify-evenly galaxy-max:gap-[4px] tablet:gap-x-[18px]'>
            <div className='like flex cursor-pointer items-center' onClick={onLike}>
              <Text
                type='body-13-regular'
                className={classNames('galaxy-max:hidden tablet:!text-[14px]', {
                  'text-[#589DC0]': isLike && isLogin,
                  'text-[#808080]': !isLike || !isLogin,
                })}
              >
                {t('like')}
              </Text>
              <img
                src={
                  isLike && isLogin ? '/static/icons/iconLike.svg' : '/static/icons/iconUnLike.svg'
                }
                alt=''
                className={classNames(
                  'mr-[8px] hidden h-[20px] w-[20px] object-contain galaxy-max:mr-[6px] galaxy-max:block galaxy-max:h-[16px] galaxy-max:w-[16px]',
                )}
              />
            </div>
            <div
              className='comment flex cursor-pointer items-center'
              onClick={() => onComment(name, data?.customerId, data?.id)}
            >
              <img
                src='/static/icons/iconComment.svg'
                alt=''
                className='mr-[8px] hidden h-[20px] w-[20px] object-contain galaxy-max:mr-[4px] galaxy-max:block galaxy-max:h-[16px] galaxy-max:w-[16px]'
              />
              <Text
                type='body-13-regular'
                color='neutral-4'
                className='mr-[3px] tablet:!text-[14px]'
              >
                {totalChildren > 0 ? totalChildren : ''}
              </Text>

              <Text
                type='body-13-regular'
                color='neutral-4'
                className='galaxy-max:hidden tablet:!text-[14px]'
              >
                {t('reply')}
              </Text>
            </div>

            <ModalReportComment
              isReported={isReport}
              postID={data?.id}
              refreshCommentOfPOst={refreshCommentOfPOst}
              setIsReport={setIsReport}
              setTotalReport={addTotalReport}
            >
              <div className='flex'>
                {isReport && isLogin ? (
                  <IconReported className='mr-[8px]  hidden h-[20px] w-[20px] object-contain galaxy-max:mr-[4px] galaxy-max:block galaxy-max:h-[16px] galaxy-max:w-[16px]' />
                ) : (
                  <img
                    src='/static/icons/iconFlag.svg'
                    alt=''
                    className='mr-[8px] hidden h-[20px] w-[20px] object-contain galaxy-max:mr-[6px] galaxy-max:block galaxy-max:h-[16px] galaxy-max:w-[16px]'
                  />
                )}
                <div>
                  {totalReport > 0 ? totalReport : ''}
                  <span className='pl-[2px] galaxy-max:hidden'>{t('report')}</span>
                </div>{' '}
              </div>
            </ModalReportComment>

            <Text
              type='body-13-regular'
              color='neutral-4'
              className='select-none !font-light  galaxy-max:ml-[4px] galaxy-max:self-end galaxy-max:text-[10px] tablet:!text-[14px]'
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
