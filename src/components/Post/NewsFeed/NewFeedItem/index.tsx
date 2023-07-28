import { ReactNode, useMemo, useRef, useState } from 'react';

import { useHover, useRequest } from 'ahooks';
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
// import ContentPostTypeDetail from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeDetail';
import ContentPostTypeHome from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome';
import { IPost, TYPEPOST, requestHidePost } from '@components/Post/service';
import CustomLink from '@components/UI/CustomLink';
import Fade from '@components/UI/Fade';
import Text from '@components/UI/Text';
import { useHandlActionsPost } from '@hooks/useHandlActionsPost';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { ROUTE_PATH, toNonAccentVietnamese } from '@utils/common';

import styles from './index.module.scss';
import ItemHoverProfile from './ItemHoverProfile';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import PostActionComment from '../PostAction';

// import 'dayjs/locale/vi';
// import 'dayjs/locale/en';

dayjs.extend(utc);
dayjs.extend(relativeTime);

interface IProps {
  postDetail: IPost;
  isExplore?: boolean;
  totalComments: number;
  onNavigate?: () => void;
  onRefreshPostDetail: (data: any, isEdit?: boolean) => void;
  pinned?: boolean;
}

const NewFeedItem = (props: IProps) => {
  const { t, i18n } = useTranslation('common');

  const { onNavigate, onRefreshPostDetail, postDetail, totalComments, pinned = false } = props;

  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);

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

  const { refButtonList } = useHandlActionsPost();

  const { run: getUserProfile } = useProfileInitial();

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

        onRefreshPostDetail(undefined);
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
        getUserProfile();
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
        getUserProfile();
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

  const onDeletePost = () => {
    onRefreshPostDetail(undefined);
  };

  const ButtonAction = () => {
    const renderdButton = () => {
      const cond1 =
        !customerId ||
        pinned ||
        router.pathname === ROUTE_PATH.EXPLORE ||
        router.pathname === '/profile/[id]' ||
        router.pathname === '/profile/my-profile';

      const cond2 = !isReported && !isMyPost;

      const cond3 = isMyPost;

      const renderHideButton = () => {
        if (cond1) {
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
        <div className='relative'>
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
            <img src='/static/icons/iconPinned.svg' alt='' className='h-[28px] w-[28px]' />
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
  }: {
    children: ReactNode;
    href: string;
    className?: string;
  }) => {
    if (href) {
      return (
        <CustomLink className={className} href={href}>
          {children}
        </CustomLink>
      );
    }

    return <div className={className}>{children}</div>;
  };

  return (
    <>
      <div className='mb-4 flex flex-row justify-between'>
        <MaybeLink
          href={customerId ? ROUTE_PATH.PROFILE_DETAIL(customerId) : ''}
          className='flex w-full flex-1 justify-between'
        >
          <div className='flex flex-1 flex-row items-center'>
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

            <div className='flex-1'>
              <div className='flex'>
                <div className='mr-[5px] flex flex-1 items-center'>
                  <UserName postDetail={postDetail} />
                </div>
              </div>
              <Text type='body-12-regular' color='neutral-4' className='mt-[2px] font-[300]'>
                {postDetail?.timeString &&
                  dayjs(postDetail?.timeString, 'YYYY-MM-DD HH:MM:ss')
                    .locale(i18n.language)
                    .fromNow(true)}
              </Text>
            </div>
          </div>
        </MaybeLink>

        <div className='flex items-center gap-[6px]'>
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

      <div className='mobile:mt-[16px] desktop:ml-[64px] desktop:mt-0'>
        <ContentPostTypeHome
          isPostDetailPath={isPostDetailPath}
          onNavigate={onNavigate}
          postDetail={postDetail}
          pinned={pinned}
        />

        <div className='mobile:mt-[22px] desktop:mt-[28px]'>
          <PostActionComment
            urlPost={`/post/${postId}`}
            isLike={isLike}
            idPost={String(postId as string)}
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
