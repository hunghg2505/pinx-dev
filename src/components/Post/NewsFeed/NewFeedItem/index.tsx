/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from 'react';

import { useRequest, useHover } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
// import Link from 'next/link';
import { useRouter } from 'next/router';

import { requestFollowUser, requestUnFollowUser } from '@components/Home/service';
import { IPost, TYPEPOST, requestHidePost } from '@components/Post/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import Text from '@components/UI/Text';
import useClickOutSide from '@hooks/useClickOutside';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { ROUTE_PATH, toNonAccentVietnamese } from '@utils/common';
import { POPUP_COMPONENT_ID, RC_DIALOG_CLASS_NAME } from 'src/constant';

import styles from './index.module.scss';
import ItemHoverProfile from './ItemHoverProfile';
import PostAction from '../PostAction';

const ModalReport = dynamic(import('../ModalReport'), {
  ssr: false,
});
const ContentPostTypeHome = dynamic(import('./ContentPostTypeHome'), {
  ssr: false,
});
const ContentPostTypeDetail = dynamic(import('./ContentPostTypeDetail'), {
  ssr: false,
});
dayjs.extend(relativeTime);
interface IProps {
  postDetail: IPost;
  isExplore?: boolean;
  totalComments: number;
  onNavigate?: () => void;
  onRefreshPostDetail: () => void;
  postId: string;
  onHidePostSuccess?: (id: string) => void;
}
const IconPlus = () => (
  <svg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M5.00501 10C5.49649 10 5.81745 9.6432 5.81745 9.17068V5.78592H9.13741C9.62889 5.78592 10 5.47734 10 5.00482C10 4.5323 9.62889 4.22372 9.13741 4.22372H5.81745V0.829315C5.81745 0.356798 5.49649 0 5.00501 0C4.51354 0 4.19258 0.356798 4.19258 0.829315V4.22372H0.862588C0.371113 4.22372 0 4.5323 0 5.00482C0 5.47734 0.371113 5.78592 0.862588 5.78592H4.19258V9.17068C4.19258 9.6432 4.51354 10 5.00501 10Z'
      fill='#1F6EAC'
    />
  </svg>
);
const NewFeedItem = (props: IProps) => {
  const {
    onNavigate,
    onRefreshPostDetail,
    postId,
    postDetail,
    onHidePostSuccess,
    totalComments,
    isExplore = false,
  } = props;

  const customerId = postDetail?.customerId;
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const [showReport, setShowReport] = React.useState(false);
  const [modalReportVisible, setModalReportVisible] = useState(false);
  const [excludeElements, setExcludeElements] = useState<(Element | null)[]>([]);
  const { isLogin, userId } = useUserType();
  const router = useRouter();

  const ref = useRef<HTMLButtonElement>(null);
  const refHover = useRef(null);
  const isHovering = useHover(refHover);
  const name =
    postDetail?.post?.customerInfo?.displayName &&
    toNonAccentVietnamese(postDetail?.post?.customerInfo?.displayName)?.charAt(0)?.toUpperCase();
  const isReported = postDetail?.isReport;
  const isMyPost = isLogin && postDetail?.customerId === userId;
  const [following, setFollowing] = React.useState(postDetail?.isFollowing);
  const [report, setReport] = React.useState(isReported);
  React.useEffect(() => {
    setFollowing(postDetail?.isFollowing);
    setReport(isReported);
  }, [postDetail?.isFollowing, isReported]);
  const handleHidePopup = () => {
    showReport && setShowReport(false);
  };
  useClickOutSide(ref, handleHidePopup, excludeElements);

  useEffect(() => {
    setExcludeElements(() => {
      return [
        document.querySelector(`#${POPUP_COMPONENT_ID}`),
        document.querySelector(`.${RC_DIALOG_CLASS_NAME}`),
      ];
    });
  }, [modalReportVisible]);

  const id = router.query?.id;
  const isLike = postDetail?.isLike;

  const idPost = id || postDetail?.id;
  const urlPost = window.location.origin + '/post/' + idPost;
  const isMyProfilePath = router.pathname === ROUTE_PATH.MY_PROFILE;

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

  const renderLogo = () => {
    let logo = '';
    if (
      [
        TYPEPOST.PinetreeDailyNews,
        TYPEPOST.PinetreeMarketBrief,
        TYPEPOST.PinetreeMorningBrief,
        TYPEPOST.PinetreePost,
        TYPEPOST.PinetreeWeeklyNews,
      ].includes(postDetail?.post.postType)
    ) {
      logo = '/static/logo/logoPintree.png';
    }
    if ([TYPEPOST.TNCKNews].includes(postDetail?.post?.postType)) {
      logo = 'https://static.pinetree.com.vn/upload/vendor_tnck_logo.png';
    }
    if (
      [
        TYPEPOST.POST,
        TYPEPOST.ActivityTheme,
        TYPEPOST.ActivityWatchlist,
        TYPEPOST.ActivityMatchOrder,
      ].includes(postDetail?.post.postType)
    ) {
      logo = postDetail?.post?.customerInfo?.avatar;
    }
    if (
      [TYPEPOST.VietstockLatestNews, TYPEPOST.VietstockNews, TYPEPOST.VietstockStockNews].includes(
        postDetail?.post.postType,
      )
    ) {
      logo = 'https://static.pinetree.com.vn/upload/vendor_vietstock_logo.png';
    }
    if ([TYPEPOST.CafeFNews].includes(postDetail?.post.postType)) {
      logo = '/static/logo/logoCafeF.png';
    }
    return logo;
  };
  const renderDisplayName = () => {
    let name = '';
    if (
      [
        TYPEPOST.PinetreeDailyNews,
        TYPEPOST.PinetreeMarketBrief,
        TYPEPOST.PinetreeMorningBrief,
        TYPEPOST.PinetreePost,
        TYPEPOST.PinetreeWeeklyNews,
      ].includes(postDetail?.post.postType)
    ) {
      name = 'Pinetree';
    }
    if (
      [
        TYPEPOST.POST,
        TYPEPOST.ActivityTheme,
        TYPEPOST.ActivityWatchlist,
        TYPEPOST.ActivityMatchOrder,
      ].includes(postDetail?.post.postType)
    ) {
      name = postDetail?.post?.customerInfo?.displayName;
    }
    if (
      [TYPEPOST.VietstockLatestNews, TYPEPOST.VietstockNews, TYPEPOST.VietstockStockNews].includes(
        postDetail?.post.postType,
      )
    ) {
      name = 'Vietstock';
    }
    if ([TYPEPOST.CafeFNews].includes(postDetail?.post.postType)) {
      name = 'CafeF';
    }
    if ([TYPEPOST.TNCKNews].includes(postDetail?.post.postType)) {
      name = 'Tin nhanh chứng khoán';
    }
    return name;
  };
  const renderContentPost = () => {
    if (id) {
      return <ContentPostTypeDetail onNavigate={onNavigate} postDetail={postDetail} />;
    }
    return <ContentPostTypeHome onNavigate={onNavigate} postDetail={postDetail} />;
  };
  const renderTextFollow = () => {
    if (following) {
      return (
        <>
          <div
            className={classNames(
              'mr-[10px] flex h-[36px] w-[89px] flex-row items-center justify-center rounded-[5px] bg-[#EAF4FB] mobile:hidden tablet:flex ',
              { 'bg-[#F3F2F6]': following },
            )}
          >
            <Text type='body-14-bold' color='neutral-5'>
              Following
            </Text>
          </div>

          <img
            src='/static/icons/iconUserFollow.svg'
            alt=''
            width={0}
            height={0}
            className='w-[24px] mobile:block tablet:hidden'
            sizes='100vw'
          />
        </>
      );
    }
    return (
      <>
        {!isMyPost && (
          <>
            <div
              className={classNames(
                'mr-[10px] flex h-[36px] w-[89px] flex-row items-center justify-center rounded-[5px] bg-[#EAF4FB] mobile:hidden tablet:flex ',
                { 'bg-[#F3F2F6]': following },
              )}
            >
              <IconPlus />
              <Text type='body-14-bold' color='primary-2' className='ml-[5px]'>
                Follow
              </Text>
            </div>

            <img
              src='/static/icons/iconUserUnFollow.svg'
              alt=''
              width={0}
              height={0}
              className='w-[24px] mobile:block tablet:hidden'
              sizes='100vw'
            />
          </>
        )}
      </>
    );
  };
  const onClickProfileDetail = () => {
    if (
      [
        TYPEPOST.POST,
        TYPEPOST.ActivityTheme,
        TYPEPOST.ActivityWatchlist,
        TYPEPOST.ActivityMatchOrder,
      ].includes(postDetail?.post.postType)
    ) {
      router.push(ROUTE_PATH.PROFILE_DETAIL(customerId));
    }
  };
  return (
    <div
      className={classNames('newsfeed  border-solid border-[#D8EBFC] py-[24px]', {
        'border-b': totalComments > 0,
        'border-t': !isExplore,
      })}
    >
      <div className='flex flex-row justify-between '>
        <div className='flex cursor-pointer flex-row items-center' onClick={onClickProfileDetail}>
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
            {postDetail?.post?.customerInfo?.avatar === '' ? (
              <AvatarDefault name={name} />
            ) : (
              <img
                src={renderLogo()}
                alt='avatar'
                sizes='100vw'
                className={classNames(
                  'mr-2 rounded-full object-contain mobile:h-[44px] mobile:w-[44px] desktop:h-[56px] desktop:w-[56px]',
                  {
                    'object-cover': [
                      TYPEPOST.POST,
                      TYPEPOST.ActivityTheme,
                      TYPEPOST.ActivityWatchlist,
                      TYPEPOST.ActivityMatchOrder,
                    ].includes(postDetail?.post.postType),
                  },
                )}
              />
            )}
            {[
              TYPEPOST.POST,
              TYPEPOST.ActivityTheme,
              TYPEPOST.ActivityWatchlist,
              TYPEPOST.ActivityMatchOrder,
            ].includes(postDetail?.post.postType) &&
              isHovering && <ItemHoverProfile postDetail={postDetail} name={name} />}
          </div>

          <div>
            <div className='flex'>
              <div className='mr-[5px] flex items-center'>
                <Text type='body-14-semibold' color='neutral-1'>
                  {renderDisplayName()}
                </Text>

                {postDetail?.post?.customerInfo?.isFeatureProfile && (
                  <img
                    src='/static/icons/iconKol.svg'
                    alt='Icon kol'
                    className='ml-[4px] h-[16px] w-[16px] object-contain'
                  />
                )}
              </div>
            </div>
            <Text type='body-12-regular' color='neutral-4' className='mt-[2px]'>
              {postDetail?.timeString && dayjs(postDetail?.timeString)?.fromNow()}
            </Text>
          </div>
        </div>
        <div className='flex items-center'>
          {[
            TYPEPOST.POST,
            TYPEPOST.ActivityTheme,
            TYPEPOST.ActivityMatchOrder,
            TYPEPOST.ActivityWatchlist,
          ].includes(postDetail?.post.postType) && (
            <div className='cursor-pointer' onClick={onFollow}>
              {renderTextFollow()}
            </div>
          )}
          {isReported && router.pathname === '/explore' ? (
            ''
          ) : (
            <button className={classNames('relative')} ref={ref}>
              <img
                src='/static/icons/iconDot.svg'
                alt=''
                width='0'
                height='0'
                className='w-[33px] cursor-pointer'
                onClick={() => setShowReport(!showReport)}
              />
              {showReport && (
                <div className='popup absolute right-0 z-20 w-[118px] rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px] rounded-tr-[4px] bg-[#FFFFFF] px-[8px] [box-shadow:0px_3px_6px_-4px_rgba(0,_0,_0,_0.12),_0px_6px_16px_rgba(0,_0,_0,_0.08),_0px_9px_28px_8px_rgba(0,_0,_0,_0.05)] mobile:top-[29px] tablet:top-[40px]'>
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
                          Hide
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
                          Report
                        </Text>
                      </ModalReport>
                    </div>
                  )}

                  {isMyProfilePath && (
                    <>
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
                          Edit
                        </Text>
                      </div>

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
                          Delete
                        </Text>
                      </div>
                    </>
                  )}
                </div>
              )}
            </button>
          )}
        </div>
      </div>
      <div className='mobile:mt-[16px] desktop:ml-[64px] desktop:mt-0'>
        {renderContentPost()}
        <div className='mobile:mt-[15px] desktop:mt-[24px]'>
          <PostAction
            urlPost={urlPost}
            isLike={isLike}
            idPost={String(idPost)}
            onRefreshPostDetail={onRefreshPostDetail}
            totalLikes={postDetail?.totalLikes}
            totalComments={totalComments}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </div>
  );
};
export default NewFeedItem;
