/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import dynamic from 'next/dynamic';
import Image from 'next/image';
// import Link from 'next/link';
import { useRouter } from 'next/router';

import { requestFollowUser, requestUnFollowUser } from '@components/Home/service';
import {
  IPost,
  TYPEPOST,
  getTotalSharePost,
  likePost,
  requestHidePost,
  unlikePost,
} from '@components/Post/service';
import Text from '@components/UI/Text';
import useClickOutSide from '@hooks/useClickOutside';
import { USERTYPE, useUserType } from '@hooks/useUserType';
import { ROUTE_PATH, toNonAccentVietnamese } from '@utils/common';
import PopupComponent from '@utils/PopupComponent';
import { POPUP_COMPONENT_ID, RC_DIALOG_CLASS_NAME } from 'src/constant';

const ModalShare = dynamic(import('../ModalShare'), {
  ssr: false,
});
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
export const AlphabetToColor = {
  A: '#290ea3',
  B: '#c6f46e',
  C: '#ac82c1',
  D: '#16e9c2',
  E: '#c15c0b',
  F: '#911371',
  G: '#9987bd',
  I: '#f26e0f',
  J: '#716e40',
  K: '#db4da2',
  L: '#cf58db',
  M: '#3e9833',
  N: '#59b63d',
  O: '#22788f',
  P: '#5887e2',
  Q: '#e1a1b9',
  R: '#9b2a3d',
  S: '#bb3466',
  T: '#ca9809',
  U: '#80cf09',
  V: '#f0256a',
  W: '#036869',
  X: '#49e2aa',
  Y: '#cbcf13',
  Z: '#54af78',
};
const renderColor = (str: string) => {
  switch (str) {
    case 'A': {
      return AlphabetToColor.A;
    }
    case 'B': {
      return AlphabetToColor.B;
    }
    case 'C': {
      return AlphabetToColor.C;
    }
    case 'D': {
      return AlphabetToColor.D;
    }
    case 'E': {
      return AlphabetToColor.E;
    }
    case 'F': {
      return AlphabetToColor.F;
    }
    case 'G': {
      return AlphabetToColor.G;
    }

    case 'I': {
      return AlphabetToColor.I;
    }
    case 'J': {
      return AlphabetToColor.J;
    }
    case 'K': {
      return AlphabetToColor.K;
    }
    case 'L': {
      return AlphabetToColor.L;
    }
    case 'M': {
      return AlphabetToColor.M;
    }
    case 'N': {
      return AlphabetToColor.N;
    }
    case 'O': {
      return AlphabetToColor.O;
    }
    case 'P': {
      return AlphabetToColor.P;
    }
    case 'Q': {
      return AlphabetToColor.Q;
    }
    case 'R': {
      return AlphabetToColor.R;
    }
    case 'S': {
      return AlphabetToColor.S;
    }
    case 'T': {
      return AlphabetToColor.T;
    }
    case 'U': {
      return AlphabetToColor.U;
    }
    case 'V': {
      return AlphabetToColor.V;
    }
    case 'W': {
      return AlphabetToColor.W;
    }
    case 'X': {
      return AlphabetToColor.X;
    }
    case 'Y': {
      return AlphabetToColor.Y;
    }
    case 'Z': {
      return AlphabetToColor.Z;
    }
    default: {
      return AlphabetToColor.Z;
    }
  }
};
const NewFeedItem = (props: IProps) => {
  const { onNavigate, onRefreshPostDetail, postId, postDetail, onHidePostSuccess } = props;
  const [showReport, setShowReport] = React.useState(false);
  const [modalReportVisible, setModalReportVisible] = useState(false);
  const [showModalShare, setShowModalShare] = useState(false);
  const [excludeElements, setExcludeElements] = useState<(Element | null)[]>([]);
  const { statusUser, isLogin, userId } = useUserType();
  const router = useRouter();
  const ref = useRef<HTMLButtonElement>(null);
  const name =
    postDetail?.post?.customerInfo?.displayName &&
    toNonAccentVietnamese(postDetail?.post?.customerInfo?.displayName)?.charAt(0)?.toUpperCase();
  const isReported = postDetail?.isReport;
  const isMyPost = isLogin && postDetail?.customerId === userId;

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
  const isKol = postDetail?.post?.customerInfo?.isKol;
  const isLike = postDetail?.isLike;
  const handleComment = () => {
    if (isLogin) {
      if (statusUser === USERTYPE.VSD) {
        onNavigate && onNavigate();
      } else {
        PopupComponent.openEKYC();
      }
    } else {
      PopupComponent.open();
    }
  };
  const idPost = id || postDetail?.id;
  const urlPost = window.location.origin + '/post/' + idPost;

  useEffect(() => {
    if (!showModalShare) {
      requestGetTotalShare.run(urlPost);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModalShare]);

  const useLikePost = useRequest(
    () => {
      return likePost(String(idPost));
    },
    {
      manual: true,
      onSuccess: () => {
        onRefreshPostDetail();
      },
      onError: () => {},
    },
  );
  const useUnLike = useRequest(
    () => {
      return unlikePost(String(idPost));
    },
    {
      manual: true,
      onSuccess: () => {
        onRefreshPostDetail();
      },
      onError: () => {},
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
      PopupComponent.open();
    }
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
      },
    },
  );
  const requestGetTotalShare = useRequest(getTotalSharePost, {
    manual: true,
    onSuccess: () => {},
    onError: (error: any) => {
      console.log(error);
    },
  });
  const onFollow = () => {
    if (isLogin) {
      if (postDetail?.isFollowing) {
        onUnFollowUser.run();
      } else {
        onFollowUser.run();
      }
    } else {
      PopupComponent.open();
    }
  };
  const handleHidePost = () => {
    if (isLogin) {
      onHidePost.run();
    } else {
      PopupComponent.open();
    }
  };

  const handleReportPostSuccess = () => {
    setModalReportVisible(false);
    onRefreshPostDetail();
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
      logo = '/static/logo/logoPintree.svg';
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
  const renderContentPost = () => {
    if (id) {
      return <ContentPostTypeDetail onNavigate={onNavigate} postDetail={postDetail} />;
    }
    return <ContentPostTypeHome onNavigate={onNavigate} postDetail={postDetail} />;
  };
  const renderTextFollow = () => {
    if (postDetail?.isFollowing) {
      return (
        <>
          <div
            className={classNames(
              'mr-[10px] flex h-[36px] w-[89px] flex-row items-center justify-center rounded-[5px] bg-[#EAF4FB] mobile:hidden tablet:flex ',
              { 'bg-[#F3F2F6]': postDetail?.isFollowing },
            )}
          >
            <Text type='body-14-bold' color='neutral-5' className='ml-[5px]'>
              Following
            </Text>
          </div>

          <Image
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
          <div
            className={classNames(
              'mr-[10px] flex h-[36px] w-[89px] flex-row items-center justify-center rounded-[5px] bg-[#EAF4FB] mobile:hidden tablet:flex ',
              { 'bg-[#F3F2F6]': postDetail?.isFollowing },
            )}
          >
            <IconPlus />
            <Text type='body-14-bold' color='primary-2' className='ml-[5px]'>
              Follow
            </Text>
          </div>
        )}
        <Image
          src='/static/icons/iconUserUnFollow.svg'
          alt=''
          width={0}
          height={0}
          className='w-[24px] mobile:block tablet:hidden'
          sizes='100vw'
        />
      </>
    );
  };
  return (
    <div className='newsfeed border-b border-t border-solid border-[#D8EBFC] py-[24px] mobile:px-[16px] desktop:px-[20px]'>
      <div className='flex flex-row justify-between'>
        <div className='flex cursor-pointer flex-row items-center'>
          {postDetail?.post?.customerInfo?.avatar === '' ? (
            <div
              className='mr-2 flex items-center justify-center rounded-full object-contain mobile:w-[44px] desktop:h-[56px] desktop:w-[56px]'
              style={{ backgroundColor: renderColor(name) }}
            >
              <Text type='body-24-regular' color='cbwhite'>
                {name}
              </Text>
            </div>
          ) : (
            <img
              src={renderLogo()}
              alt='avatar'
              sizes='100vw'
              className='mr-2 rounded-full object-contain mobile:w-[44px] desktop:h-[56px] desktop:w-[56px]'
              width={0}
              height={0}
            />
          )}

          <div>
            <div className='flex'>
              <Text type='body-14-semibold' color='neutral-1' className='mr-[5px]'>
                {renderDisplayName()}
              </Text>
              {isKol && (
                <Image
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

          <button className='relative' ref={ref}>
            <Image
              src='/static/icons/iconDot.svg'
              alt=''
              width='0'
              height='0'
              className='w-[33px] cursor-pointer'
              onClick={() => setShowReport(!showReport)}
            />
            {showReport && (
              <div className='popup absolute right-0 z-10 w-[118px] rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px] rounded-tr-[4px] bg-[#FFFFFF] px-[8px] [box-shadow:0px_3px_6px_-4px_rgba(0,_0,_0,_0.12),_0px_6px_16px_rgba(0,_0,_0,_0.08),_0px_9px_28px_8px_rgba(0,_0,_0,_0.05)] mobile:top-[29px] tablet:top-[40px]'>
                {[
                  TYPEPOST.POST,
                  TYPEPOST.ActivityTheme,
                  TYPEPOST.ActivityMatchOrder,
                  TYPEPOST.ActivityWatchlist,
                  TYPEPOST.PinetreePost,
                ].includes(postDetail?.post.postType) && (
                  <div
                    className='ml-[12px] flex h-[44px] items-center [&:not(:last-child)]:[border-bottom:1px_solid_#EAF4FB]'
                    onClick={handleHidePost}
                  >
                    <Image
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

                {!isReported && !isMyPost && (
                  <div className='ml-[12px] flex h-[44px] items-center [&:not(:last-child)]:[border-bottom:1px_solid_#EAF4FB]'>
                    <Image
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
        </div>
      </div>
      <div className='mobile:mt-[16px] desktop:ml-[64px] desktop:mt-0'>
        {renderContentPost()}
        <div className='action flex flex-row items-center justify-between mobile:mt-[15px] desktop:mt-[24px] desktop:justify-start'>
          <div
            className='like z-10 flex cursor-pointer flex-row items-center justify-center desktop:mr-[40px]'
            onClick={() => handleLikeOrUnLikePost()}
          >
            <Image
              src={isLike ? '/static/icons/iconLike.svg' : '/static/icons/iconUnLike.svg'}
              color='#FFFFFF'
              alt=''
              width={16}
              height={14}
              sizes='100vw'
              className='mr-[8px] h-[14px] w-[18px] object-contain'
            />
            <Text
              type='body-12-medium'
              color='primary-5'
              className={classNames({ '!text-[#589DC0]': isLike })}
            >
              {postDetail?.totalLikes || ''} Like
            </Text>
          </div>
          <div
            className='comment flex cursor-pointer flex-row items-center justify-center desktop:mr-[40px]'
            onClick={handleComment}
          >
            <Image
              src='/static/icons/iconComment.svg'
              alt=''
              width={14}
              height={14}
              className='mr-[8px] h-[14px] w-[14px] object-contain'
            />
            <Text type='body-12-medium' color='primary-5'>
              {postDetail?.totalChildren > 0 ? postDetail?.totalChildren : ''} Comment
            </Text>
          </div>
          <div
            className='report flex cursor-pointer flex-row items-center justify-center'
            onClick={() => setShowModalShare(true)}
          >
            <Image
              src='/static/icons/iconShare.svg'
              alt=''
              width={14}
              height={14}
              className='mr-[8px] h-[14px] w-[14px] object-contain'
            />
            <Text type='body-12-medium' color='primary-5'>
              {requestGetTotalShare?.data?.shares?.all || ''} Share
            </Text>
          </div>
        </div>
      </div>
      <ModalShare
        url={urlPost}
        visible={showModalShare}
        handleClose={() => {
          setShowModalShare(false);
        }}
      />
    </div>
  );
};
export default NewFeedItem;
