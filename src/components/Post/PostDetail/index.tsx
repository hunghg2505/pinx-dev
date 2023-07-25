/* eslint-disable react/display-name */
import React, { useRef, useState } from 'react';

import classNames from 'classnames';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import PopupAccessLimit from '@components/UI/Popup/PopupAccessLimit';
import PopupAuth from '@components/UI/Popup/PopupAuth';
import PopupLoginTerms from '@components/UI/Popup/PopupLoginTerms';
import PopupRegisterOtp from '@components/UI/Popup/PopupOtp';
import PopupRegisterCreateUsername from '@components/UI/Popup/PopupUsername';
// import SkeletonLoading from '@components/UI/Skeleton';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { getAccessToken } from '@store/auth';
import { popupStatusAtom, initialPopupStatus } from '@store/popup/popup';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { ROUTE_PATH } from '@utils/common';

import { IComment, useCommentsOfPost, usePostDetail } from '../service';

const FooterSignUp = dynamic(import('@components/FooterSignup'), {
  ssr: false,
});
const ItemComment = dynamic(import('../NewsFeed/ItemComment'), {
  ssr: false,
});
const NewFeedItem = dynamic(import('../NewsFeed/NewFeedItem'), {
  ssr: false,
});
const ComponentRef = dynamic(import('@components/ComponentRef'), {
  ssr: false,
});

export const ForwardedRefComponent = React.forwardRef((props: any, ref) => {
  return (
    <ComponentRef
      {...props}
      forwardedRef={ref}
      id={props.id}
      refresh={props.refresh}
      refreshTotal={props.refreshTotal}
      width={props?.width}
    />
  );
});

const PostDetail = () => {
  const refSubReplies: any = useRef();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { userType, isReadTerms } = useUserLoginInfo();
  const router = useRouter();
  const isLogin = !!getAccessToken();
  const [width, setWidth] = React.useState<number>(0);
  const [showReply, setShowReply]: any = useState('');
  const [isImageCommentMobile, setImageCommentMobile] = useState(false);
  const { run: initUserProfile } = useProfileInitial();
  // is login
  const { refresh, postDetail } = usePostDetail(String(router.query.id), {
    onError: () => {
      router.push(ROUTE_PATH.PAGE_NOT_FOUND);
    },
  });

  const { commentsOfPost, refreshCommentOfPost } = useCommentsOfPost(String(router.query.id));

  const isHaveComment = commentsOfPost?.data?.list?.length > 0;
  const totalComments = commentsOfPost?.data?.list?.length;
  const commentChild = commentsOfPost?.data?.list?.reduce(
    (acc: any, current: any) => acc + current?.totalChildren,
    0,
  );
  const countComment = totalComments + commentChild;

  const onGoToBack = () => {
    router.back();
  };
  const onRef = (ele: any) => {
    if (!ele) {
      return;
    }
    setWidth(ele?.offsetWidth);
  };
  const onReplies = async (value: string, customerId: number, id: string) => {
    //   refSubReplies?.current?.onReply();

    setShowReply(id);
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
    if (refSubReplies?.current?.onComment) {
      refSubReplies?.current?.onComment(value, customerId, id);
    }
  };
  const getSubComment = (payload: IComment[]) => {
    if (payload.length > 0) {
      return (
        <div className='sub-comment ml-[48px]'>
          {payload?.map((comment: IComment, index: number) => (
            <ItemComment
              data={comment}
              key={index}
              onReplies={onReplies}
              refresh={refreshCommentOfPost}
              refreshTotal={refresh}
              isChildren={true}
              width={width}
            />
          ))}
        </div>
      );
    }
  };

  const onCloseModal = () => {
    setPopupStatus(initialPopupStatus);
  };
  React.useEffect(() => {
    if (!!userType && !isReadTerms) {
      setPopupStatus({
        ...popupStatus,
        popupLoginTerms: true,
      });
    }
    initUserProfile();
  }, [userType, isReadTerms]);

  return (
    <>
      {popupStatus.popupAccessLinmit && (
        <PopupAccessLimit visible={popupStatus.popupAccessLinmit} onClose={onCloseModal} />
      )}
      {popupStatus.popupLoginTerms && (
        <PopupLoginTerms visible={popupStatus.popupLoginTerms} onClose={onCloseModal} />
      )}
      {popupStatus.popupAuth && (
        <PopupAuth visible={popupStatus.popupAuth} onClose={onCloseModal} />
      )}
      {popupStatus.popupRegisterOtp && (
        <PopupRegisterOtp visible={popupStatus.popupRegisterOtp} onClose={onCloseModal} />
      )}
      {popupStatus.popupRegisterUsername && (
        <PopupRegisterCreateUsername
          visible={popupStatus.popupRegisterUsername}
          onClose={onCloseModal}
        />
      )}
      <div
        ref={onRef}
        className='rounded-[8px] bg-[#FFF] px-[10px] desktop:px-[0] desktop:[box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'
      >
        <div className='header relative mobile:h-[56px] desktop:h-[60px]'>
          <Text
            type='body-20-bold'
            color='primary-5'
            className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center '
          >
            Post detail
          </Text>

          <div
            onClick={onGoToBack}
            className='absolute top-2/4 flex h-full -translate-y-2/4 items-center px-[16px]'
          >
            <img
              src='/static/icons/iconBack.svg'
              alt=''
              width='0'
              height='0'
              className='h-[20px] w-[20px] cursor-pointer'
            />
          </div>
        </div>

        <div className='mobile:px-0 desktop:px-[20px]'>
          <NewFeedItem
            postDetail={postDetail?.data}
            totalComments={countComment}
            onRefreshPostDetail={refresh}
            postId={postDetail?.data?.id}
          />
        </div>

        {isLogin && (
          <div className='mt-4 mobile:hidden tablet:block desktop:ml-[64px] desktop:mr-[88px] desktop:px-[20px]'>
            <ForwardedRefComponent
              id={postDetail?.data?.id}
              refresh={refreshCommentOfPost}
              refreshTotal={refresh}
              setImageCommentMobile={setImageCommentMobile}
              width={width}
            />
          </div>
        )}

        <div
          className={classNames(
            'pb-[16px] tablet:mb-[32px] desktop:ml-[64px] desktop:mr-[88px] desktop:px-[20px]',
            {
              'mobile:mb-[50px]': !isImageCommentMobile && isLogin,
              'mobile:mb-[179px]': isImageCommentMobile && isLogin,
            },
          )}
        >
          {isHaveComment ? (
            commentsOfPost?.data?.list?.map((item: IComment, index: number) => {
              const isReply = item.children?.find((i) => {
                return i?.id === showReply;
              });
              return (
                <div className='mt-[16px]' key={index}>
                  <ItemComment
                    data={item}
                    onReplies={onReplies}
                    refresh={refreshCommentOfPost}
                    refreshTotal={refresh}
                    width={width}
                  />
                  {getSubComment(item.children)}
                  {(showReply === item?.id || isReply) && width > 737 && (
                    <div className='ml-[48px] mt-4 mobile:hidden tablet:block'>
                      <ForwardedRefComponent
                        ref={refSubReplies}
                        id={postDetail?.data?.id}
                        refresh={refreshCommentOfPost}
                        refreshTotal={refresh}
                        setImageCommentMobile={setImageCommentMobile}
                        width={width}
                      />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <>
              <Text
                type='body-14-regular'
                color='neutral-3'
                className='mt-[16px] text-center tablet:mb-[32px]'
              >
                There is no comments
              </Text>
            </>
          )}
        </div>
        {width < 738 && isLogin && (
          <div className='mobile:block tablet:hidden'>
            <div className='fixed bottom-0 left-0 z-10 -mb-[4px] border-t border-solid border-t-[var(--primary-3)] bg-white pt-[16px] tablet-max:w-full'>
              <ForwardedRefComponent
                ref={refSubReplies}
                id={postDetail?.data?.id}
                refresh={refreshCommentOfPost}
                refreshTotal={refresh}
                setImageCommentMobile={setImageCommentMobile}
                width={width}
              />
            </div>
          </div>
        )}
      </div>

      <FooterSignUp />
    </>
  );
};
export default PostDetail;
