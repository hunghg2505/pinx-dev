/* eslint-disable react/display-name */
import React, { useRef, useState } from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import PopupAccessLimit from '@components/UI/Popup/PopupAccessLimit';
import PopupAuth from '@components/UI/Popup/PopupAuth';
import PopupLoginTerms from '@components/UI/Popup/PopupLoginTerms';
import PopupRegisterOtp from '@components/UI/Popup/PopupOtp';
import PopupRegisterCreateUsername from '@components/UI/Popup/PopupUsername';
// import SkeletonLoading from '@components/UI/Skeleton';
import SkeletonLoading from '@components/UI/Skeleton';
import Text from '@components/UI/Text';
import useObserver from '@hooks/useObserver';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { getAccessToken } from '@store/auth';
import { popupStatusAtom, initialPopupStatus } from '@store/popup/popup';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { ROUTE_PATH } from '@utils/common';

import styles from './index.module.scss';
import { IComment, getMoreCommentPost, usePostDetail } from '../service';

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
      canExpand={props?.canExpand}
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
  const isLogin = !!getAccessToken();
  const [width, setWidth] = React.useState<number>(0);
  const [showReply, setShowReply]: any = useState('');
  const [isImageCommentMobile, setImageCommentMobile] = useState(false);
  const { run: initUserProfile } = useProfileInitial();
  const [postData, setPostData] = useState<any>();
  const postID = router.query.id;
  React.useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  // is login
  const {
    refresh,
    postDetail,
    run,
    loading: loadingPostDetail,
  } = usePostDetail(String(postID), {
    onError: () => {
      router.push(ROUTE_PATH.NOT_FOUND);
    },
    onSuccess: (res: any) => {
      setPostData(res.data);
    },
  });
  React.useEffect(() => {
    run();
  }, [postID]);

  const {
    data,
    loading,
    mutate,
    runAsync,
    refreshAsync: refreshCommentOfPost,
  } = useRequest(async (nextId: any) => {
    if (nextId === false) {
      return;
    }
    return getMoreCommentPost(String(postID), nextId);
  });
  const service = async () => {
    if (!data?.nextId || loading) {
      return;
    }

    const newData: any = await runAsync(data?.nextId);
    if (newData?.list?.length) {
      mutate({
        list: [...data?.list, ...newData?.list],
        nextId: newData?.nextId,
      });
    }
  };

  const { refLastElement } = useObserver();
  const isHaveComment = postData?.totalChildren > 0;

  const countComment = postData?.totalChildren || 0;
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
    initUserProfile();
  }, [userType, isReadTerms]);
  if (loadingPostDetail) {
    return <SkeletonLoading />;
  }
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
              postDetail={postData}
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
                canExpand={true}
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
              data?.list?.map((item: IComment, index: number) => {
                // const isReply = item.children?.find((i) => {
                //   return i?.id === showReply;
                // });
                const isReply = item.id === showReply;
                if (index + 1 === data?.list?.length) {
                  return (
                    <div ref={(node) => refLastElement(node, service)} key={`comment-${item?.id}`}>
                      <div className='mt-[16px]'>
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
                    </div>
                  );
                }
                return (
                  <div key={`comment-${item?.id}`}>
                    <div className='mt-[16px]'>
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
                  styles.comment,
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
