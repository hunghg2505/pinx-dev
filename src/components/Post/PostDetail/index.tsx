/* eslint-disable react/display-name */
import React, { useRef, useState } from 'react';

import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Text from '@components/UI/Text';
import { useContainerDimensions } from '@hooks/useDimensions';
import { getAccessToken } from '@store/auth';

// import ItemComment from '../NewsFeed/ItemComment';
// import NewFeedItem from '../NewsFeed/NewFeedItem';
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
const ContentRight = dynamic(import('@components/Home/ContentRight'), {
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

  const refContainer: any = useRef();
  const router = useRouter();
  const isLogin = !!getAccessToken();
  const { width } = useContainerDimensions(refContainer);
  // const [imageComment, setImageComment] = useState('');
  const [showReply, setShowReply]: any = useState('');
  const [isImageCommentMobile, setImageCommentMobile] = useState(false);
  // is login

  const { refresh, postDetail } = usePostDetail(String(router.query.id));

  const { commentsOfPost, refreshCommentOfPOst } = useCommentsOfPost(String(router.query.id));

  const isHaveComment = commentsOfPost?.data?.list?.length > 0;
  const onGoToBack = () => {
    router.back();
  };
  const onReplies = async (value: string, customerId: number, id: string) => {
    // refSubReplies?.current?.onReply();
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
              refresh={refreshCommentOfPOst}
              refreshTotal={refresh}
              isChildren={true}
              width={width}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <div className='flex flex-row items-start' ref={refContainer}>
        <div className='rounded-[8px] mobile:w-[375px] tablet:mr-[15px] tablet:w-[calc(100%_-_265px)] desktop:mr-[24px] desktop:w-[749px] desktop:bg-[#FFF] desktop:[box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
          <div className='header relative mobile:h-auto desktop:h-[60px]'>
            <Text type='body-16-bold' color='primary-5' className='py-[17px] text-center '>
              Post detail
            </Text>
            <img
              src='/static/icons/iconBack.svg'
              alt=''
              width='0'
              height='0'
              className='absolute left-[16px] top-2/4 w-[18px] -translate-y-1/2 transform cursor-pointer'
              onClick={onGoToBack}
            />
          </div>
          <NewFeedItem
            postDetail={postDetail?.data}
            totalComments={postDetail?.data?.totalChildren}
            onRefreshPostDetail={refresh}
            postId={postDetail?.data?.id}
          />
          {isLogin && (
            <div className='mt-4 mobile:hidden tablet:block desktop:ml-[64px] desktop:mr-[88px] desktop:px-[20px]'>
              <ForwardedRefComponent
                id={postDetail?.data?.id}
                refresh={refreshCommentOfPOst}
                refreshTotal={refresh}
                setImageCommentMobile={setImageCommentMobile}
                width={width}
              />
            </div>
          )}

          <div
            className={classNames(
              'mt-[16px] tablet:mb-0 desktop:ml-[48px] desktop:mr-[72px] desktop:px-[20px]',
              {
                'mobile:mb-[79px]': !isImageCommentMobile,
                'mobile:mb-[179px]': isImageCommentMobile,
              },
            )}
          >
            {isHaveComment ? (
              commentsOfPost?.data?.list?.map((item: IComment, index: number) => {
                const isReply = item.children?.find((i) => {
                  return i?.id === showReply;
                });
                return (
                  <>
                    <ItemComment
                      key={index}
                      data={item}
                      onReplies={onReplies}
                      refresh={refreshCommentOfPOst}
                      refreshTotal={refresh}
                      width={width}
                    />
                    {getSubComment(item.children)}
                    {(showReply === item?.id || isReply) && width > 737 && (
                      <div className='ml-[48px] mt-4 mobile:hidden tablet:block'>
                        <ForwardedRefComponent
                          ref={refSubReplies}
                          id={postDetail?.data?.id}
                          refresh={refreshCommentOfPOst}
                          refreshTotal={refresh}
                          setImageCommentMobile={setImageCommentMobile}
                          width={width}
                        />
                      </div>
                    )}
                  </>
                );
              })
            ) : (
              <Text
                type='body-14-regular'
                color='neutral-3'
                className='mt-[16px] text-center tablet:hidden'
              >
                There is no comments
              </Text>
            )}
          </div>

          {width < 738 && isLogin && (
            <div className='mobile:block tablet:hidden'>
              <div className='fixed bottom-0 z-10 -mb-[4px] min-w-[375px] border-t border-solid border-t-[var(--primary-3)] bg-white pt-[16px]'>
                <ForwardedRefComponent
                  ref={refSubReplies}
                  id={postDetail?.data?.id}
                  refresh={refreshCommentOfPOst}
                  refreshTotal={refresh}
                  setImageCommentMobile={setImageCommentMobile}
                  width={width}
                />
              </div>
            </div>
          )}
        </div>
        <ContentRight />
      </div>

      {!isLogin && <FooterSignUp />}
    </>
  );
};
export default PostDetail;
