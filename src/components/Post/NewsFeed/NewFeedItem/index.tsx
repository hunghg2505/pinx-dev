/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect, useMemo } from 'react';

import { useRequest, useHover } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { requestFollowUser, requestUnFollowUser } from '@components/Home/service';
import ModalReport from '@components/Post/NewsFeed/ModalReport';
import { Avatar } from '@components/Post/NewsFeed/NewFeedItem/components/Avatar';
import { Follower } from '@components/Post/NewsFeed/NewFeedItem/components/Follower';
import { UserName } from '@components/Post/NewsFeed/NewFeedItem/components/UserName';
import ContentPostTypeDetail from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeDetail';
import ContentPostTypeHome from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome';
import {
  IPost,
  TYPEPOST,
  TypePostOnlyReportAction,
  requestHidePost,
} from '@components/Post/service';
import CustomLink from '@components/UI/CustomLink';
import Fade from '@components/UI/Fade';
import Text from '@components/UI/Text';
import useClickOutSide from '@hooks/useClickOutside';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { ROUTE_PATH, toNonAccentVietnamese } from '@utils/common';

import styles from './index.module.scss';
import ItemHoverProfile from './ItemHoverProfile';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import PostAction from '../PostAction';

dayjs.extend(utc);
dayjs.extend(relativeTime);

interface IProps {
  postDetail: IPost;
  isExplore?: boolean;
  totalComments: number;
  onNavigate?: () => void;
  onRefreshPostDetail: () => void;
  postId: string;
  onHidePostSuccess?: (id: string) => void;
  pinned?: boolean;
}

const PostContent = ({ id, onNavigate, postDetail }: any) => {
  if (id) {
    return <ContentPostTypeDetail onNavigate={onNavigate} postDetail={postDetail} />;
  }

  return <ContentPostTypeHome onNavigate={onNavigate} postDetail={postDetail} />;
};

const NewFeedItem = (props: IProps) => {
  const { t } = useTranslation('common');
  const {
    onNavigate,
    onRefreshPostDetail,
    postId,
    postDetail,
    onHidePostSuccess,
    totalComments,
    isExplore = false,
    pinned = false,
  } = props;

  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const [showReport, setShowReport] = useState(false);
  const [modalReportVisible, setModalReportVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [excludeElements, setExcludeElements] = useState<(Element | null)[]>([]);
  const { isLogin, userId } = useUserType();
  const router = useRouter();

  const name =
    postDetail?.post?.customerInfo?.displayName &&
    toNonAccentVietnamese(postDetail?.post?.customerInfo?.displayName)?.charAt(0)?.toUpperCase();

  const { customerId, id, isLike, idPost, isMyProfilePath } = useMemo(() => {
    return {
      customerId: postDetail?.customerId,

      id: router.query?.id,

      isLike: postDetail?.isLike,

      idPost: router.query?.id || postDetail?.id,

      isMyProfilePath: router.pathname === ROUTE_PATH.MY_PROFILE,
    };
  }, [
    postDetail?.customerId,
    postDetail?.isLike,
    router.query?.id,
    postDetail?.id,
    router.pathname,
  ]);

  const ref = useRef<HTMLButtonElement>(null);
  const refHover = useRef(null);

  const isHovering = useHover(refHover);

  const isReported = postDetail?.isReport;
  const isMyPost = isLogin && postDetail?.customerId === userId;

  const [following, setFollowing] = useState(postDetail?.isFollowing);
  const [report, setReport] = useState(isReported);

  useEffect(() => {
    setFollowing(postDetail?.isFollowing);
    setReport(isReported);
  }, [postDetail?.isFollowing, isReported]);

  const handleHidePopup = () => {
    showReport && setShowReport(false);
  };

  useClickOutSide(ref, handleHidePopup, excludeElements);

  useEffect(() => {
    setExcludeElements(() => {
      return [...(document.querySelectorAll('.rc-dialog-wrap') as any)];
    });
  }, [modalReportVisible, modalDeleteVisible, modalEditVisible, popupStatus]);

  const onRefreshListPost = () => {
    onRefreshPostDetail();
    onHidePostSuccess && onHidePostSuccess(postId);
  };

  // hide post
  const onHidePost = useRequest(
    () => {
      return requestHidePost(postId);
    },
    {
      manual: true,
      onSuccess: () => {
        if (id) {
          router.push(ROUTE_PATH.HOME);
        }
        onHidePostSuccess && onHidePostSuccess(postId);
        setShowReport(false);
        onRefreshPostDetail();
      },
      onError: (err: any) => {
        console.log('err', err);
      },
    },
  );

  // follow user
  const onFollowUser = useRequest(
    () => {
      return requestFollowUser(postDetail?.customerId);
    },
    {
      manual: true,
      onSuccess: () => {
        onRefreshPostDetail();
        setFollowing(true);
      },
    },
  );

  // un follow user
  const onUnFollowUser = useRequest(
    () => {
      return requestUnFollowUser(postDetail?.customerId);
    },
    {
      manual: true,
      onSuccess: () => {
        onRefreshPostDetail();
        setFollowing(false);
      },
    },
  );

  const onFollow = () => {
    if (isLogin) {
      if (following) {
        onUnFollowUser.run();
      } else {
        onFollowUser.run();
      }
    } else {
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };

  const handleHidePost = () => {
    if (isLogin) {
      onHidePost.run();
    } else {
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };

  const handleReportPostSuccess = () => {
    setModalReportVisible(false);
    onRefreshPostDetail();
    setShowReport(false);
    setReport(false);
  };

  if (!postDetail) {
    return <></>;
  }

  return (
    <>
      <div className='mb-4 flex flex-row justify-between'>
        <CustomLink
          href={customerId ? ROUTE_PATH.PROFILE_DETAIL(customerId) : '/'}
          className='flex w-full justify-between'
        >
          <div className='flex cursor-pointer flex-row items-center'>
            <div
              ref={refHover}
              className={classNames('relative', {
                [styles.avatar]: [
                  TYPEPOST.POST,
                  TYPEPOST.ActivityTheme,
                  TYPEPOST.ActivityWatchlist,
                  TYPEPOST.ActivityMatchOrder,
                ].includes(postDetail?.post.postType),
              })}
            >
              <Avatar postDetail={postDetail} />

              <Fade
                visible={
                  [
                    TYPEPOST.POST,
                    TYPEPOST.ActivityTheme,
                    TYPEPOST.ActivityWatchlist,
                    TYPEPOST.ActivityMatchOrder,
                  ].includes(postDetail?.post.postType) && isHovering
                }
              >
                <ItemHoverProfile postDetail={postDetail} name={name} />
              </Fade>
            </div>

            <div>
              <div className='flex'>
                <div className='mr-[5px] flex items-center'>
                  <UserName postDetail={postDetail} />

                  {postDetail?.post?.customerInfo?.isFeatureProfile && (
                    <img
                      src='/static/icons/iconKol.svg'
                      alt=''
                      width={0}
                      height={0}
                      sizes='100vw'
                      className='ml-[4px] h-[16px] w-[16px] object-contain'
                    />
                  )}

                  {postDetail?.post?.customerInfo?.isKol && (
                    <img
                      src='/static/icons/iconTick.svg'
                      alt=''
                      width={0}
                      height={0}
                      sizes='100vw'
                      className='ml-[4px] h-[16px] w-[16px] object-contain'
                    />
                  )}
                </div>
              </div>
              <Text type='body-14-regular' color='neutral-4' className='mt-[2px] font-[300]'>
                {postDetail?.timeString &&
                  dayjs(postDetail?.timeString, 'YYYY-MM-DD HH:MM:ss').fromNow(true)}
              </Text>
            </div>
          </div>
        </CustomLink>

        <div className='flex items-center'>
          <Follower
            postDetail={postDetail}
            onFollow={onFollow}
            following={following}
            isMyPost={isMyPost}
          />

          {(isReported && router.pathname === '/explore') ||
          (isReported && TypePostOnlyReportAction.includes(postDetail?.post.postType)) ? (
            ''
          ) : (
            <div className='flex'>
              {pinned && (
                <img
                  src='/static/icons/iconPinned.svg'
                  alt=''
                  className='mr-[16px] h-[28px] w-[28px]'
                />
              )}

              <button className={classNames('relative')} ref={ref}>
                <img
                  src='/static/icons/iconDot.svg'
                  alt=''
                  width='0'
                  height='0'
                  className='w-[33px] cursor-pointer'
                  onClick={() => setShowReport(!showReport)}
                />
                <Fade
                  visible={showReport}
                  className='popup absolute right-0 z-20 w-[118px] rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px] rounded-tr-[4px] bg-[#FFFFFF] px-[8px] [box-shadow:0px_3px_6px_-4px_rgba(0,_0,_0,_0.12),_0px_6px_16px_rgba(0,_0,_0,_0.08),_0px_9px_28px_8px_rgba(0,_0,_0,_0.05)] mobile:top-[29px] tablet:top-[40px]'
                >
                  {[
                    TYPEPOST.POST,
                    TYPEPOST.ActivityTheme,
                    TYPEPOST.ActivityMatchOrder,
                    TYPEPOST.ActivityWatchlist,
                    TYPEPOST.PinetreePost,
                  ].includes(postDetail?.post.postType) &&
                    router.pathname !== '/explore' &&
                    !isMyProfilePath && (
                      <div
                        className='ml-[12px] flex h-[44px] items-center [&:not(:last-child)]:[border-bottom:1px_solid_#EAF4FB]'
                        onClick={handleHidePost}
                      >
                        <img
                          src='/static/icons/iconUnHide.svg'
                          alt=''
                          width='0'
                          height='0'
                          sizes='100vw'
                          className='mr-[8px] h-[20px] w-[20px] object-contain'
                        />
                        <Text type='body-14-medium' color='neutral-2'>
                          {t('hide')}
                        </Text>
                      </div>
                    )}

                  {!report && !isMyPost && (
                    <div className='ml-[12px] flex h-[44px] items-center [&:not(:last-child)]:[border-bottom:1px_solid_#EAF4FB]'>
                      <img
                        src='/static/icons/iconFlag.svg'
                        alt=''
                        width='0'
                        height='0'
                        sizes='100vw'
                        className='mr-[8px] h-[20px] w-[20px] object-contain'
                      />
                      <ModalReport
                        visible={modalReportVisible}
                        onModalReportVisible={setModalReportVisible}
                        postID={postDetail?.id}
                        onReportSuccess={handleReportPostSuccess}
                      >
                        <Text type='body-14-medium' color='neutral-2'>
                          {t('report')}
                        </Text>
                      </ModalReport>
                    </div>
                  )}

                  {(isMyProfilePath || isMyPost) && (
                    <>
                      <ModalEdit
                        visible={modalEditVisible}
                        onVisible={setModalEditVisible}
                        postDetail={postDetail}
                      >
                        <div className='ml-[12px] flex h-[44px] items-center [&:not(:last-child)]:[border-bottom:1px_solid_#EAF4FB]'>
                          <img
                            src='/static/icons/iconEdit.svg'
                            alt=''
                            width='0'
                            height='0'
                            sizes='100vw'
                            className='mr-[8px] h-[20px] w-[20px] object-contain'
                          />
                          <Text type='body-14-medium' color='neutral-2'>
                            {t('edit')}
                          </Text>
                        </div>
                      </ModalEdit>
                      <ModalDelete
                        visible={modalDeleteVisible}
                        onVisible={() => setModalDeleteVisible((prev) => !prev)}
                        id={postDetail?.id}
                        onRefreshPostDetail={onRefreshListPost}
                      >
                        <div className='ml-[12px] flex h-[44px] items-center [&:not(:last-child)]:[border-bottom:1px_solid_#EAF4FB]'>
                          <img
                            src='/static/icons/iconDelete.svg'
                            alt=''
                            width='0'
                            height='0'
                            sizes='100vw'
                            className='mr-[8px] h-[20px] w-[20px] object-contain'
                          />
                          <Text type='body-14-medium' color='neutral-2'>
                            {t('delete')}
                          </Text>
                        </div>
                      </ModalDelete>
                    </>
                  )}
                </Fade>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='mobile:mt-[16px] desktop:ml-[64px] desktop:mt-0'>
        <PostContent id={id} onNavigate={onNavigate} postDetail={postDetail} />

        <div className='mobile:mt-[22px] desktop:mt-[28px]'>
          <PostAction
            urlPost={'/post/' + idPost}
            isLike={isLike}
            idPost={String(idPost)}
            onRefreshPostDetail={onRefreshPostDetail}
            totalLikes={postDetail?.totalLikes}
            totalComments={totalComments}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </>
  );
};

export default NewFeedItem;
