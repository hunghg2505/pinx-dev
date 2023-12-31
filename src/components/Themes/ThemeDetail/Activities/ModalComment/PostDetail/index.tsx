/* eslint-disable react/display-name */
import React, { useRef, useState } from 'react';

import classNames from 'classnames';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { IComment, useCommentsOfPost, usePostDetail } from '@components/Post/service';
import PopupAccessLimit from '@components/UI/Popup/PopupAccessLimit';
import PopupAuth from '@components/UI/Popup/PopupAuth';
import PopupLoginTerms from '@components/UI/Popup/PopupLoginTerms';
import PopupRegisterOtp from '@components/UI/Popup/PopupOtp';
import PopupRegisterCreateUsername from '@components/UI/Popup/PopupUsername';
// import SkeletonLoading from '@components/UI/Skeleton';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useLogin } from '@store/auth/hydrateAuth';
import { popupStatusAtom, initialPopupStatus } from '@store/popup/popup';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { NOT_FOUND } from 'src/constant/route';

const FooterSignUp = dynamic(import('@components/FooterSignup'), {
  ssr: false,
});
const ItemComment = dynamic(import('@components/Post/NewsFeed/ItemComment'), {
  ssr: false,
});
const NewFeedItem = dynamic(import('@components/Post/NewsFeed/NewFeedItem'), {
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
  const { t } = useTranslation();
  const refSubReplies: any = useRef();
  const refRepliesLaptop: any = useRef();
  const refRepliesMobile: any = useRef();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const [postDetailStatus, setPostDetailStatus] = useAtom(postDetailStatusAtom);
  const { userType, isReadTerms } = useUserLoginInfo();
  const router = useRouter();
  const { isLogin } = useLogin();

  const [width, setWidth] = React.useState<number>(0);
  const [showReply, setShowReply]: any = useState('');
  const [isImageCommentMobile, setImageCommentMobile] = useState(false);
  React.useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  // is login
  const { refresh, postDetail } = usePostDetail(String(router.query.id), {
    onError: () => {
      router.push(NOT_FOUND);
    },
    manual: true,
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

  const onReplies = async (value: string, customerId: number, id: string) => {
    //   refSubReplies?.current?.onReply();
    setPostDetailStatus({ ...postDetailStatus, isDoneReplies: false });
    setShowReply(id);
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
    if (width > 770) {
      if (refSubReplies?.current?.onComment) {
        refSubReplies?.current?.onComment(value, customerId, id);
      }
    } else {
      refRepliesLaptop?.current?.onComment &&
        refRepliesLaptop?.current?.onComment(value, customerId, id);
      refRepliesMobile?.current?.onComment &&
        refRepliesMobile?.current?.onComment(value, customerId, id);
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
              refreshCommentOfPOst={refreshCommentOfPost}
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
      <div className='p-[10px] desktop:p-0'>
        <div className='card-style rounded-[8px] bg-[#FFF] px-[10px] desktop:px-[0]'>
          <div className='header relative mobile:h-[56px] desktop:h-[60px]'>
            <Text
              type='body-20-bold'
              color='primary-5'
              className='absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-center '
            >
              Post detail
            </Text>

            <div
              onClick={onGoToBack}
              className='absolute top-2/4 flex h-full -translate-y-2/4 items-center px-[0] desktop:px-[20px]'
            >
              <img
                src='/static/icons/back_icon.svg'
                alt='Back icon'
                className='h-[28px] w-[28px] cursor-pointer'
              />
            </div>
          </div>

          <div className='mobile:px-[0] desktop:px-[20px]'>
            <NewFeedItem
              postDetail={postDetail?.data}
              totalComments={countComment}
              onRefreshPostDetail={refresh}
            />
          </div>

          {isLogin && (
            <div className='mt-4 px-[16px] mobile:hidden tablet:block desktop:ml-[64px] desktop:px-[20px]'>
              <ForwardedRefComponent
                ref={refRepliesLaptop}
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
              'pb-[16px] tablet:mb-[32px] desktop:ml-[64px] desktop:px-[20px]',
              {
                'mobile:mb-[60px]': !isImageCommentMobile && isLogin,
                'mobile:mb-[179px]': isImageCommentMobile && isLogin,
              },
            )}
          >
            {isHaveComment ? (
              commentsOfPost?.data?.list?.map((item: IComment, index: number) => {
                // const isReply = item.children?.find((i) => {
                //   return i?.id === showReply;
                // });
                const isReply = item.id === showReply;
                return (
                  <div className='mt-[16px]' key={index}>
                    <ItemComment
                      data={item}
                      onReplies={onReplies}
                      refreshTotal={refresh}
                      refreshCommentOfPOst={refreshCommentOfPost}
                      width={width}
                    />
                    {getSubComment(item.children)}
                    {(showReply === item?.id || isReply) &&
                      width > 770 &&
                      !postDetailStatus.isDoneReplies && (
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
                  {t('empty_comment')}
                </Text>
              </>
            )}
          </div>
          {width < 770 && isLogin && (
            <div className='mobile:block tablet:hidden'>
              <div
                className={classNames(
                  'fixed bottom-0 left-0 z-10 -mb-[4px] border-t border-solid border-t-[var(--primary-3)] bg-white pt-[16px] tablet-max:w-full',
                )}
              >
                <ForwardedRefComponent
                  ref={refRepliesMobile}
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
      </div>
      <FooterSignUp />
    </>
  );
};
export default PostDetail;
