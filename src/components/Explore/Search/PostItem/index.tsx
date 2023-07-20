import React from 'react';

import { useHover, useRequest } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';

import { requestFollowUser, requestUnFollowUser } from '@components/Home/service';
import ModalReport from '@components/Post/NewsFeed/ModalReport';
import ItemHoverProfile from '@components/Post/NewsFeed/NewFeedItem/ItemHoverProfile';
import { IPost, TYPEPOST } from '@components/Post/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import Text from '@components/UI/Text';
import useClickOutSide from '@hooks/useClickOutside';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { ROUTE_PATH, toNonAccentVietnamese } from '@utils/common';
import { POPUP_COMPONENT_ID, RC_DIALOG_CLASS_NAME } from 'src/constant';

import styles from './index.module.scss';
import PostTypeHome from './PostTypeHome';

dayjs.extend(relativeTime);
interface IProps {
  postDetail: IPost;
  refresh?: () => void;
}
const IconPlus = () => (
  <svg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M5.00501 10C5.49649 10 5.81745 9.6432 5.81745 9.17068V5.78592H9.13741C9.62889 5.78592 10 5.47734 10 5.00482C10 4.5323 9.62889 4.22372 9.13741 4.22372H5.81745V0.829315C5.81745 0.356798 5.49649 0 5.00501 0C4.51354 0 4.19258 0.356798 4.19258 0.829315V4.22372H0.862588C0.371113 4.22372 0 4.5323 0 5.00482C0 5.47734 0.371113 5.78592 0.862588 5.78592H4.19258V9.17068C4.19258 9.6432 4.51354 10 5.00501 10Z'
      fill='#1F6EAC'
    />
  </svg>
);
const PostItem = (props: IProps) => {
  const { postDetail } = props;
  const router = useRouter();
  console.log('🚀 ~ file: index.tsx:39 ~ PostItem ~ postDetail:', postDetail);
  const [isFollowed, setIsFollowed] = React.useState<boolean>(false);
  React.useEffect(() => {
    setIsFollowed(postDetail?.isFollowing);
  }, [postDetail?.isFollowing]);
  const { isLogin, userId } = useUserType();
  const [showReport, setShowReport] = React.useState(false);
  const [modalReportVisible, setModalReportVisible] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);
  const refHover = React.useRef(null);
  const isHovering = useHover(refHover);
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const name =
    postDetail?.post?.customerInfo?.displayName &&
    toNonAccentVietnamese(postDetail?.post?.customerInfo?.displayName)?.charAt(0)?.toUpperCase();
  const isReported = postDetail?.isReport;
  // const isFollow = postDetail?.isFollowing;
  const isMyPost = isLogin && postDetail?.customerId === userId;
  const isKol = postDetail?.post?.customerInfo?.isKol;
  const [excludeElements, setExcludeElements] = React.useState<(Element | null)[]>([]);
  const handleReportPostSuccess = () => {
    setModalReportVisible(false);
    // onRefreshPostDetail();
    setShowReport(false);
  };
  const handleHidePopup = () => {
    showReport && setShowReport(false);
  };
  useClickOutSide(ref, handleHidePopup, excludeElements);
  React.useEffect(() => {
    setExcludeElements(() => {
      return [
        document.querySelector(`#${POPUP_COMPONENT_ID}`),
        document.querySelector(`.${RC_DIALOG_CLASS_NAME}`),
      ];
    });
  }, [modalReportVisible]);
  const onFollowUser = useRequest(
    () => {
      return requestFollowUser(postDetail?.customerId);
    },
    {
      manual: true,
      onSuccess: () => {
        setIsFollowed(true);
        // onRefreshPostDetail();
        // refresh && refresh();
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
        setIsFollowed(false);
        // refresh && refresh();
        // onRefreshPostDetail();
      },
    },
  );
  const onFollow = () => {
    if (isLogin) {
      if (isFollowed) {
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
      name = 'TNCKNews';
    }
    return name;
  };

  const renderTextFollow = () => {
    if (isFollowed) {
      return (
        <>
          <div
            className={classNames(
              'mr-[10px] flex h-[36px] w-[89px] flex-row items-center justify-center rounded-[5px] bg-[#EAF4FB] mobile:hidden tablet:flex ',
              { 'bg-[#F3F2F6]': isFollowed },
            )}
          >
            <Text type='body-14-bold' color='neutral-5' className='ml-[5px]'>
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
                { 'bg-[#F3F2F6]': isFollowed },
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
  return (
    <>
      <div className='rounded-[12px] bg-[#FFF] p-[16px] [border-bottom:1px_solid_##EEF5F9] [border-top:1px_solid_##EEF5F9] [box-shadow:0px_9px_28px_8px_rgba(0,_0,_0,_0.05),_0px_6px_16px_0px_rgba(0,_0,_0,_0.08),_0px_3px_6px_-4px_rgba(0,_0,_0,_0.12)]'>
        <div className={classNames('newsfeed')}>
          <div className='flex flex-row justify-between'>
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
                onClick={() => router.push(ROUTE_PATH.PROFILE_DETAIL(postDetail?.customerId))}
              >
                {postDetail?.post?.customerInfo?.avatar === '' ? (
                  <div className='mr-2 h-[44px] w-[44px] rounded-full'>
                    <AvatarDefault name={name} />
                  </div>
                ) : (
                  <img
                    src={renderLogo()}
                    alt='avatar'
                    sizes='100vw'
                    className={classNames(
                      'mr-2 rounded-full object-cover mobile:h-[44px] mobile:w-[44px] desktop:h-[44px] desktop:w-[44px]',
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
                  <Text type='body-14-semibold' color='neutral-1' className='mr-[5px]'>
                    {renderDisplayName()}
                  </Text>
                  {isKol && (
                    <img
                      src='/static/icons/iconKol.svg'
                      alt=''
                      width={0}
                      height={0}
                      sizes='100vw'
                      className='h-[20px] w-[20px]'
                    />
                  )}
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
              {!isReported && (
                <button className='relative' ref={ref}>
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
                      {!isReported && !isMyPost && (
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
                    </div>
                  )}
                </button>
              )}
            </div>
          </div>
          <div className='mobile:mt-[16px] desktop:ml-[64px] desktop:mt-0'>
            <PostTypeHome postDetail={postDetail} />
          </div>
        </div>
      </div>
    </>
  );
};
export default PostItem;
