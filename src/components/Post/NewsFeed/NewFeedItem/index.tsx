/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Image from 'next/image';
// import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  IPost,
  TYPEPOST,
  getTotalSharePost,
  likePost,
  requestHidePost,
  unlikePost,
} from '@components/Post/service';
import Text from '@components/UI/Text';
import useClickOutSide from '@hooks/useClickOutSide';
import { USERTYPE, useUserType } from '@hooks/useUserType';
import PopupComponent from '@utils/PopupComponent';
import { POPUP_COMPONENT_ID, RC_DIALOG_CLASS_NAME } from 'src/constant';

import ContentPostTypeDetail from './ContentPostTypeDetail';
import ContentPostTypeHome from './ContentPostTypeHome';
import ModalReport from '../ModalReport';
import ModalShare from '../ModalShare';

interface IProps {
  postDetail: IPost;
  totalComments: number;
  onNavigate?: () => void;
  onRefreshPostDetail: () => void;
  postId: string;
}
const NewFeedItem = (props: IProps) => {
  const { onNavigate, onRefreshPostDetail, postId, postDetail, totalComments } = props;
  const [showReport, setShowReport] = React.useState(false);
  const [modalReportVisible, setModalReportVisible] = useState(false);
  const [showModalShare, setShowModalShare] = useState(false);
  const [excludeElements, setExcludeElements] = useState<(Element | null)[]>([]);
  const { statusUser, isLogin } = useUserType();
  const router = useRouter();
  const ref = useRef<HTMLButtonElement>(null);

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
      onNavigate && onNavigate();
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
        onRefreshPostDetail();
      },
      onError: (err: any) => {
        console.log('err', err);
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

  const handleHidePost = () => {
    if (isLogin) {
      onHidePost.run();
    } else {
      PopupComponent.open();
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
      logo = '/static/logo/logoPintree.svg';
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
      name = 'CafeFNews';
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
  return (
    <div className='newsfeed border-b border-t border-solid border-[#D8EBFC] py-[24px] mobile:px-[16px] desktop:px-[20px]'>
      <div className='flex flex-row justify-between'>
        <div className='flex cursor-pointer flex-row items-center'>
          <Image
            src={renderLogo() || ''}
            alt='avatar'
            sizes='100vw'
            className='mr-2 rounded-full object-contain mobile:w-[44px] desktop:h-[56px] desktop:w-[56px]'
            width={0}
            height={0}
          />

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
        <div className='flex'>
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
              <div className='popup absolute right-0 top-[29px] z-10 h-[88px] w-[118px] rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px] rounded-tr-[4px] bg-[#FFFFFF] px-[8px] [box-shadow:0px_3px_6px_-4px_rgba(0,_0,_0,_0.12),_0px_6px_16px_rgba(0,_0,_0,_0.08),_0px_9px_28px_8px_rgba(0,_0,_0,_0.05)]'>
                <div
                  className='ml-[12px] flex h-[44px] items-center [border-bottom:1px_solid_#EAF4FB]'
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
                <div className='ml-[12px] flex h-[44px] items-center'>
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
                  >
                    <Text type='body-14-medium' color='neutral-2'>
                      Report
                    </Text>
                  </ModalReport>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
      <div className='mobile:mt-[16px] desktop:ml-[64px] desktop:mt-0'>
        {renderContentPost()}
        <div className='action mt-[15px] flex flex-row items-center justify-between desktop:justify-start'>
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
              {postDetail?.totalLikes || ''} Likes
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
              {totalComments > 0 ? totalComments : ''} Comments
            </Text>
          </div>
          <div
            className='report flex cursor-pointer flex-row items-center justify-center'
            onClick={() => {
              if (isLogin) {
                if (statusUser === USERTYPE.VSD) {
                  setShowModalShare(true);
                } else {
                  PopupComponent.openEKYC();
                }
              } else {
                PopupComponent.open();
              }
            }}
          >
            <Image
              src='/static/icons/iconShare.svg'
              alt=''
              width={14}
              height={14}
              className='mr-[8px] h-[14px] w-[14px] object-contain'
            />
            <Text type='body-12-medium' color='primary-5'>
              {requestGetTotalShare?.data?.shares?.all || ''} Shares
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
