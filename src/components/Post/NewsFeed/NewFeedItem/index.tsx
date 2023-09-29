import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import { useHover, useRequest } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import { requestFollowUser, requestUnFollowUser } from '@components/Home/service';
import ModalReport from '@components/Post/NewsFeed/ModalReport';
import { Avatar } from '@components/Post/NewsFeed/NewFeedItem/components/Avatar';
import { Follower } from '@components/Post/NewsFeed/NewFeedItem/components/Follower';
import { UserName } from '@components/Post/NewsFeed/NewFeedItem/components/UserName';
import ContentPostTypeHome from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome';
import { IPost, TYPEPOST, requestHidePost } from '@components/Post/service';
import CustomLink from '@components/UI/CustomLink';
import Fade from '@components/UI/Fade';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useHandlActionsPost } from '@hooks/useHandlActionsPost';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { searchSeoAtom } from '@store/searchSeo/searchSeo';
import { ROUTE_PATH, toNonAccentVietnamese } from '@utils/common';

import styles from './index.module.scss';
import ItemHoverProfile from './ItemHoverProfile';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import PostActionComment from '../PostAction';

dayjs.extend(utc);
dayjs.extend(relativeTime);

// tracking event view ticker info
interface IProps {
  postDetail: IPost;
  isExplore?: boolean;
  totalComments: number;
  onNavigate?: () => void;
  refreshFollow?: () => void;
  onRefreshPostDetail: (data: any, isEdit?: boolean) => void;
  pinned?: boolean;
  isNewFeedExplore?: boolean;
  refreshTrendingOnPinex?: () => void;
  isSearchSeoBox?: boolean;
  onTrackingViewTicker?: (stockCode: string) => void;
}

const NewFeedItem = (props: IProps) => {
  const { t, i18n } = useTranslation('common');

  const {
    onNavigate,
    onRefreshPostDetail,
    postDetail,
    totalComments,
    pinned = false,
    isNewFeedExplore = false,
    refreshFollow,
    refreshTrendingOnPinex,
    isExplore,
    isSearchSeoBox,
    onTrackingViewTicker,
  } = props;
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const [postDetailStatus, setPostDetailStatus] = useAtom(postDetailStatusAtom);
  const [, setSearchSeo] = useAtom(searchSeoAtom);
  const { isLogin, userId } = useUserType();
  const router = useRouter();
  const name =
    postDetail?.post?.customerInfo?.displayName &&
    toNonAccentVietnamese(postDetail?.post?.customerInfo?.displayName)?.charAt(0)?.toUpperCase();

  const { customerId, postId, isLike, isPostDetailPath, isMyProfileOrUserDetailPath } =
    useMemo(() => {
      return {
        customerId: postDetail?.customerId,

        id: router.query?.id,

        isLike: postDetail?.isLike,

        postId: postDetail?.id || router.query?.id,

        isPostDetailPath: router.pathname.startsWith(ROUTE_PATH.POST_DETAIL_PATH),

        isMyProfileOrUserDetailPath: router.pathname.startsWith(ROUTE_PATH.PROFILE_PATH),
      };
    }, [
      postDetail?.customerId,
      postDetail?.isLike,
      router.query?.id,
      postDetail?.id,
      router.pathname,
    ]);
  const refHover = useRef(null);

  const isHovering = useHover(refHover);

  const isMyPost = isLogin && postDetail?.customerId === userId;

  const [following, setFollowing] = useState(postDetail?.isFollowing);

  const [isReported, setReported] = useState(!!postDetail?.isReport);

  const urlTitle = useMemo(() => {
    let url = '';
    if (postDetail?.customerId) {
      url =
        isLogin && postDetail?.customerId === userId
          ? ROUTE_PATH.MY_PROFILE
          : ROUTE_PATH.PROFILE_DETAIL(customerId);
    }

    return url;
  }, [postDetail, isLogin]);

  const { refButtonList } = useHandlActionsPost();

  const { run: getUserProfile } = useProfileInitial();

  useEffect(() => {
    setFollowing(postDetail?.isFollowing);

    setReported(!!postDetail?.isReport);
  }, [postDetail]);
  // hide post
  const onHidePost = useRequest(
    () => {
      return requestHidePost(postId as string);
    },
    {
      manual: true,
      onSuccess: () => {
        if (router.route === '/post/[id]') {
          router.back();
        }
        setPostDetailStatus({ ...postDetailStatus, idPostDetail: postDetail?.id });
        onRefreshPostDetail(undefined);
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
        refreshFollow && refreshFollow();
        getUserProfile();
        setFollowing(true);
        if (refreshTrendingOnPinex && isExplore) {
          refreshTrendingOnPinex();
        }
        setPostDetailStatus({ ...postDetailStatus, idCustomerFollow: postDetail?.customerId });
      },
      onError: (err: any) => {
        toast(() => <Notification type='error' message={err.error} />);
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
        refreshFollow && refreshFollow();
        getUserProfile();
        setFollowing(false);
        if (refreshTrendingOnPinex && isExplore) {
          refreshTrendingOnPinex();
        }
        setPostDetailStatus({ ...postDetailStatus, idCustomerFollow: postDetail?.customerId });
      },
      onError: (err: any) => {
        toast(() => <Notification type='error' message={err.error} />);
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

  const onDeletePost = () => {
    // onRefreshPostDetail(undefined);
    // if (router.route === ROUTE_PATH.MY_PROFILE) {
    //   onRefreshPostDetail(undefined);
    // } else {
    //   onRefreshPostDetail(undefined);
    // }
    setPostDetailStatus({ ...postDetailStatus, idPostDetail: postDetail?.id });
    if (router.route === '/post/[id]') {
      router.back();
    } else {
      onRefreshPostDetail(undefined);
    }
  };

  const ButtonAction = () => {
    const renderdButton = () => {
      const cond1 =
        !customerId ||
        pinned ||
        router.pathname === ROUTE_PATH.EXPLORE ||
        router.pathname === '/profile/[id]' ||
        router.pathname === '/profile/my-profile' ||
        router.pathname === '/search-seo' ||
        isSearchSeoBox;

      const cond2 = !isReported && !isMyPost;

      const cond3 = isMyPost;

      const renderHideButton = () => {
        if (cond1 || isNewFeedExplore) {
          return <></>;
        }

        return (
          <>
            <div
              className='ml-[12px] flex h-[44px] cursor-pointer items-center [&:not(:last-child)]:[border-bottom:1px_solid_#EAF4FB]'
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
              <Text type='body-14-medium' color='neutral-2' className='whitespace-nowrap'>
                {t('hide')}
              </Text>
            </div>
          </>
        );
      };

      if (cond1 && !cond2 && !cond3) {
        return <></>;
      }

      return (
        <div className='relative z-50'>
          <img
            src='/static/icons/iconDot.svg'
            alt=''
            width='0'
            height='0'
            data-img-dot={true}
            className='imgDot w-[33px] cursor-pointer'
            ref={refButtonList as any}
          />

          <div className='box-shadow pointer-events-none absolute right-0 z-20 min-w-[125px] max-w-full rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px] rounded-tr-[4px] bg-[#FFFFFF] px-[8px] opacity-0 transition-all duration-300 [box-shadow:0px_3px_6px_-4px_rgba(0,_0,_0,_0.12),_0px_6px_16px_rgba(0,_0,_0,_0.08),_0px_9px_28px_8px_rgba(0,_0,_0,_0.05)] mobile:top-[29px] tablet:top-[40px]'>
            <div>
              {renderHideButton()}

              {cond2 && (
                <div className='ml-[12px] flex h-[44px] cursor-pointer items-center [&:not(:last-child)]:[border-bottom:1px_solid_#EAF4FB]'>
                  <img
                    src='/static/icons/iconFlag.svg'
                    alt=''
                    width='0'
                    height='0'
                    sizes='100vw'
                    className='mr-[8px] h-[20px] w-[20px] object-contain'
                  />

                  <ModalReport postID={postId as string} onReportSuccess={() => setReported(true)}>
                    <Text
                      type='body-14-medium'
                      color='neutral-2'
                      className='mr-[8px] whitespace-nowrap'
                    >
                      {t('report')}
                    </Text>
                  </ModalReport>
                </div>
              )}

              {cond3 && (
                <>
                  <ModalEdit
                    postDetail={postDetail}
                    refresh={(newData) => onRefreshPostDetail(newData, true)}
                  >
                    <div className='ml-[12px] flex h-[44px] cursor-pointer items-center [border-bottom:1px_solid_#EAF4FB]'>
                      <img
                        src='/static/icons/iconEdit.svg'
                        alt=''
                        width='0'
                        height='0'
                        sizes='100vw'
                        className='mr-[8px] h-[20px] w-[20px] object-contain'
                      />
                      <Text
                        type='body-14-medium'
                        color='neutral-2'
                        className='mr-[8px] whitespace-nowrap'
                      >
                        {t('edit_post')}
                      </Text>
                    </div>
                  </ModalEdit>

                  <ModalDelete id={postDetail?.id} onDeletePost={onDeletePost}>
                    <div className='ml-[12px] flex h-[44px] cursor-pointer items-center [&:not(:last-child)]:[border-bottom:1px_solid_#EAF4FB]'>
                      <img
                        src='/static/icons/iconDelete.svg'
                        alt=''
                        width='0'
                        height='0'
                        sizes='100vw'
                        className='mr-[8px] h-[20px] w-[20px] object-contain'
                      />
                      <Text
                        type='body-14-medium'
                        color='neutral-2'
                        className='mr-[8px] whitespace-nowrap'
                      >
                        {t('delete')}
                      </Text>
                    </div>
                  </ModalDelete>
                </>
              )}
            </div>
          </div>
        </div>
      );
    };

    return (
      <>
        <div className='flex gap-[6px]'>
          {pinned && (
            <img
              loading='lazy'
              src='/static/icons/iconPinned.svg'
              alt=''
              className='h-[28px] w-[28px]'
            />
          )}

          {renderdButton()}
        </div>
      </>
    );
  };

  if (!postDetail) {
    return <></>;
  }

  const MaybeLink = ({
    children,
    href,
    className,
    linkClassName,
  }: {
    children: ReactNode;
    href: string;
    className?: string;
    linkClassName?: string;
  }) => {
    if (href) {
      return (
        <CustomLink className={className} href={href} linkClassName={linkClassName}>
          {children}
        </CustomLink>
      );
    }

    return <div className={className}>{children}</div>;
  };

  return (
    <>
      <div
        className={classNames('relative z-30 mb-[2px] flex flex-row justify-between gap-x-[12px]', {
          'z-50': isHovering,
        })}
      >
        <div onClick={() => setSearchSeo(false)} className='flex-1'>
          <MaybeLink
            linkClassName='flex-1'
            href={urlTitle}
            className='flex flex-1 flex-row items-center'
          >
            <div
              ref={refHover}
              className={classNames('relative flex-none', {
                [styles.avatar]: [
                  TYPEPOST.POST,
                  TYPEPOST.ActivityTheme,
                  TYPEPOST.ActivityWatchlist,
                  TYPEPOST.ActivityMatchOrder,
                ].includes(postDetail?.post?.postType),
              })}
            >
              <Avatar postDetail={postDetail} isNewFeedExplore={isNewFeedExplore} />

              <Fade
                visible={
                  [
                    TYPEPOST.POST,
                    TYPEPOST.ActivityTheme,
                    TYPEPOST.ActivityWatchlist,
                    TYPEPOST.ActivityMatchOrder,
                  ].includes(postDetail?.post?.postType) && isHovering
                }
              >
                <ItemHoverProfile postDetail={postDetail} name={name} />
              </Fade>
            </div>

            <div className='des flex-1 mobile:w-[120px] galaxy-max:w-[100px] tablet:w-[220px] laptop:w-[280px] xdesktop:w-[350px]'>
              <div className='mr-[5px] flex w-full flex-1 items-center'>
                <UserName postDetail={postDetail} />
              </div>
              <Text
                type='body-12-regular'
                color='neutral-4'
                className='mt-[2px] font-[300] galaxy-max:text-[10px]'
              >
                {postDetail?.timeString &&
                  dayjs(postDetail?.timeString, 'YYYY-MM-DD HH:MM:ss')
                    .locale(i18n.language)
                    .fromNow(true)}
              </Text>
            </div>
          </MaybeLink>
        </div>
        <div className='flex items-center gap-[6px] galaxy-max:max-w-[49px]'>
          {!isMyProfileOrUserDetailPath && (
            <Follower
              postDetail={postDetail}
              onFollow={onFollow}
              following={following}
              isMyPost={isMyPost}
            />
          )}

          <ButtonAction />
        </div>
      </div>

      <div className='mobile:mt-[14px] desktop:ml-[64px] desktop:mt-0'>
        <ContentPostTypeHome
          isPostDetailPath={isPostDetailPath}
          onNavigate={onNavigate}
          postDetail={postDetail}
          pinned={pinned}
          onTrackingViewTicker={onTrackingViewTicker}
        />
        {!isNewFeedExplore && (
          <div className='mobile:mt-[22px] desktop:mt-[28px]'>
            <PostActionComment
              urlPost={`/post/${postId}`}
              isLike={isLike}
              idPost={String(postId as string)}
              totalLikes={postDetail?.totalLikes}
              totalComments={totalComments}
              onNavigate={onNavigate}
              isForceNavigate={isSearchSeoBox}
              postDetail={postDetail}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default NewFeedItem;
