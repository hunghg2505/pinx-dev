/* eslint-disable react/display-name */
import React, { useRef, useState } from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { ForwardedRefComponentPostDetail } from '@components/Post/PostDetail/ForwardedRefComponentPostDetail';
import Text from '@components/UI/Text';
import useObserver from '@hooks/useObserver';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useLogin } from '@store/auth/hydrateAuth';
import { popupStatusAtom } from '@store/popup/popup';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { ROUTE_PATH } from '@utils/common';
import { viewTickerInfoTracking } from 'src/mixpanel/mixpanel';

import CommentPost from './CommentPost';
import styles from './index.module.scss';
// import NewsFeedSkeleton from '../NewsFeed/NewsFeedSkeleton';
import { IComment, getMoreCommentPost, usePostDetail } from '../service';

const FooterSignUp = dynamic(import('@components/FooterSignup'), {
  ssr: false,
});

const NewFeedItem = dynamic(import('../NewsFeed/NewFeedItem'), {
  ssr: false,
});

// tracking event view ticker info
const handleTrackingViewTicker = (stockCode: string, locationDetail: string) => {
  viewTickerInfoTracking(stockCode, 'Post detail screen', locationDetail, 'Stock');
};

const PostDetail = () => {
  const { t } = useTranslation();
  const refSubReplies: any = useRef();
  const refRepliesLaptop: any = useRef();
  const refRepliesMobile: any = useRef();
  const refListComment: any = useRef([]);
  // const refCommentofComment: any = useRef();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const [postDetailStatus, setPostDetailStatus] = useAtom(postDetailStatusAtom);
  const { userType, isReadTerms } = useUserLoginInfo();
  const router = useRouter();
  const { isLogin } = useLogin();
  const [width, setWidth] = React.useState<number>(0);
  const [, setShowReply]: any = useState('');
  const [isImageCommentMobile, setImageCommentMobile] = useState(false);
  const [totalCommentOfPost, setTotalCommentOfPost] = useState(0);
  const [postData, setPostData] = useState<any>();
  const postID = router.query.id;
  React.useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  React.useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  // is login
  const { refresh, postDetail, run } = usePostDetail(String(postID), {
    onError: () => {
      router.push(ROUTE_PATH.NOT_FOUND);
    },
    onSuccess: (res: any) => {
      setTotalCommentOfPost(res.data.totalChildren);
      setPostData(res.data);
    },
    manual: true,
  });
  React.useEffect(() => {
    run();
    runAsync('');
  }, [postID]);

  const {
    data,
    loading,
    mutate,
    runAsync,
    // refresh: refreshCommentOfPost,
  } = useRequest(
    async (nextId: any) => {
      if (nextId === false) {
        return;
      }
      return getMoreCommentPost(String(postID), nextId);
    },
    {
      manual: true,
    },
  );
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
  const isHaveComment = data?.list?.length > 0;

  // const totalComments = data?.list?.length;
  // const commentChild = data?.list?.reduce(
  //   (acc: any, current: any) => acc + current?.totalChildren,
  //   0,
  // );
  // const countComment = commentChild + totalComments || 0;
  const onGoToBack = () => {
    // console.log()
    const storage = globalThis?.sessionStorage;
    if (storage?.prevPath === '') {
      router.push(ROUTE_PATH.HOME);
    } else {
      router.back();
    }
    setPostDetailStatus({ ...postDetailStatus, idCommentReplie: '' });
  };

  const onReplies = async (value: string, customerId: number, id: string) => {
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

  React.useEffect(() => {
    if (!!userType && !isReadTerms) {
      setPopupStatus({
        ...popupStatus,
        popupLoginTerms: true,
      });
    }
  }, [userType, isReadTerms]);
  // if (loadingPostDetail) {
  //   return <NewsFeedSkeleton showBtnBack />;
  // }

  const refreshCommentOfComment = (id: string) => {
    const listData = refListComment?.current;
    const findItem = listData?.find((item: any) => item.id === id);
    if (findItem) {
      findItem.refreshCommentOfComment();
    }
  };
  const refreshTotal = () => {
    // refreshCommentOfPost();
    refresh();
  };
  const onAddComment = (newData: any) => {
    if (data) {
      setTotalCommentOfPost(totalCommentOfPost + 1);
      mutate({
        list: [newData.data, ...data?.list],
        nextId: data?.nextId,
      });
    }
  };
  const onRemove = (v: any, totalComment: number) => {
    if (v) {
      const newData = data?.list && [...data?.list].filter((item) => item.id !== v);
      mutate({
        list: newData,
        nextId: data?.nextId,
      });
    }
    setTotalCommentOfPost(totalCommentOfPost - totalComment);
  };
  return (
    <>
      <div>
        <div className='card-style rounded-[8px] bg-[#FFF] px-[10px] desktop:px-[0]'>
          <div className='header relative mobile:h-[56px] desktop:h-[60px]'>
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
              totalComments={totalCommentOfPost}
              onRefreshPostDetail={refresh}
              onTrackingViewTicker={(stockCode) => handleTrackingViewTicker(stockCode, 'News feed')}
            />
          </div>

          {isLogin && (
            <div className='mt-4 mobile:hidden tablet:block desktop:ml-[64px] desktop:px-[20px]'>
              <ForwardedRefComponentPostDetail
                ref={refRepliesLaptop}
                id={postDetail?.data?.id}
                refreshTotal={refresh}
                setImageCommentMobile={setImageCommentMobile}
                width={width}
                canExpand={true}
                onAddComment={onAddComment}
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
            {isHaveComment &&
              data?.list?.map((item: IComment, index: number) => {
                // const isReply = item.children?.find((i) => {
                //   return i?.id === showReply;
                // });
                if (index + 1 === data?.list?.length) {
                  return (
                    <div ref={(node) => refLastElement(node, service)} key={`comment-${item?.id}`}>
                      <div className='mt-[16px]'>
                        <CommentPost
                          onTrackingViewTickerCmt={(stockCode) =>
                            handleTrackingViewTicker(stockCode, 'Comment')
                          }
                          ref={(val: any) => {
                            refListComment.current.push({
                              id: item?.id,
                              ...val,
                            });
                          }}
                          item={item}
                          width={width}
                          setImageCommentMobile={setImageCommentMobile}
                          refresh={refresh}
                          postID={String(postID)}
                          onRepliesMobile={(value: string, customerId: number, id: string) =>
                            onReplies(value, customerId, id)
                          }
                          onRemoveComment={onRemove}
                        />
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={`comment-${item?.id}`}>
                    <div className='mt-[16px]'>
                      <CommentPost
                        onTrackingViewTickerCmt={(stockCode) =>
                          handleTrackingViewTicker(stockCode, 'Comment')
                        }
                        ref={(val: any) => {
                          refListComment.current.push({
                            id: item?.id,
                            ...val,
                          });
                        }}
                        item={item}
                        width={width}
                        setImageCommentMobile={setImageCommentMobile}
                        refresh={refresh}
                        postID={String(postID)}
                        onRepliesMobile={(value: string, customerId: number, id: string) =>
                          onReplies(value, customerId, id)
                        }
                        onRemoveComment={onRemove}
                      />
                    </div>
                  </div>
                );
              })}

            {!isHaveComment && postData && (
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
            <div className='block tablet:hidden'>
              <div
                className={classNames(
                  'fixed bottom-0 left-0 z-30 -mb-[4px] border-t border-solid border-t-[var(--primary-3)] bg-white pt-[16px] tablet-max:w-full',
                  styles.comment,
                )}
              >
                <ForwardedRefComponentPostDetail
                  ref={refRepliesMobile}
                  id={postDetail?.data?.id}
                  refreshCommentOfComment={refreshCommentOfComment}
                  refreshTotal={refreshTotal}
                  setImageCommentMobile={setImageCommentMobile}
                  width={width}
                  onAddComment={onAddComment}
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
