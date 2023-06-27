/* eslint-disable react/display-name */
import React, { useRef } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';

import FooterSignUp from '@components/FooterSignup';
import Text from '@components/UI/Text';
import { useContainerDimensions } from '@hooks/useDimensions';
import { getAccessToken } from '@store/auth';

// import ItemComment from '../NewsFeed/ItemComment';
// import NewFeedItem from '../NewsFeed/NewFeedItem';
import { IComment, useCommentsOfPost, usePostDetail } from '../service';

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
const ForwardedRefComponent = React.forwardRef((props: any, ref) => {
  return (
    <ComponentRef
      {...props}
      forwardedRef={ref}
      id={props.id}
      refresh={props.refresh}
      refreshTotal={props.refresh}
    />
  );
});

const PostDetail = () => {
  const refReplies: any = useRef();
  const refContainer: any = useRef();
  const router = useRouter();
  const isLogin = !!getAccessToken();
  const { width } = useContainerDimensions(refContainer);
  // const [showReply, setShowReply] = useState(false);
  // is login
  const { refresh, postDetail } = usePostDetail(String(router.query.id));

  const { commentsOfPost, refreshCommentOfPOst } = useCommentsOfPost(String(router.query.id));

  const onGoToBack = () => {
    router.back();
  };
  const onReplies = async (value: string, customerId: number, id: string) => {
    // setShowReply(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
    if (refReplies?.current?.onComment) {
      refReplies?.current?.onComment(value, customerId, id);
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
            <Text
              type='body-16-bold'
              color='primary-5'
              className='py-[17px] text-center mobile:block desktop:hidden'
            >
              Post detail
            </Text>
            <Image
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

          <div className='mobile:hidden tablet:block'>
            <ForwardedRefComponent
              ref={refReplies}
              id={postDetail?.data?.id}
              refresh={refreshCommentOfPOst}
              refreshTotal={refresh}
            />
          </div>
          <div className='desktop:ml-[48px] desktop:mr-[72px]'>
            {commentsOfPost?.data?.list?.map((item: IComment, index: number) => {
              return (
                <>
                  <ItemComment
                    key={index}
                    data={item}
                    onReplies={onReplies}
                    refresh={refreshCommentOfPOst}
                    refreshTotal={refresh}
                  />
                  {getSubComment(item.children)}
                  {/* {showReply && width > 737 && (
                    <ForwardedRefComponent
                      ref={refReplies}
                      id={postDetail?.data?.id}
                      refresh={refreshCommentOfPOst}
                    />
                  )} */}
                </>
              );
            })}
          </div>
          {width < 738 && (
            <div className='mobile:block tablet:hidden'>
              <ForwardedRefComponent
                ref={refReplies}
                id={postDetail?.data?.id}
                refresh={refreshCommentOfPOst}
                refreshTotal={refresh}
              />
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
