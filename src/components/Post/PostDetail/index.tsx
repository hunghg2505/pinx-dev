import React, { useRef } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Text from '@components/UI/Text';

import ItemComment from '../NewsFeed/ItemComment';
import NewFeedItem from '../NewsFeed/NewFeedItem';
import {
  IComment,
  useCommentsOfPost,
  useCommentsOfPostUnAuth,
  useGetPostDetailUnAuth,
  usePostDetail,
} from '../service';

const ComponentRef = dynamic(import('@components/ComponentRef'), {
  ssr: false,
});
const ForwardedRefComponent = React.forwardRef((props: any, ref) => (
  <ComponentRef {...props} forwardedRef={ref} id={props.id} />
));

const PostDetail = () => {
  const refReplies: any = useRef();
  const router = useRouter();

  // is login
  const { onRefreshPostDetail, postDetail } = usePostDetail(String(router.query.id));

  const { commentsOfPost } = useCommentsOfPost(String(router.query.id));

  // not login
  const { postDetailUnAuth } = useGetPostDetailUnAuth(String(router.query.id));
  console.log('🚀 ~ file: index.tsx:37 ~ PostDetail ~ postDetailUnAuth:', postDetailUnAuth);

  const { commentsOfPostUnAuth } = useCommentsOfPostUnAuth(String(router.query.id));
  const onGoToBack = () => {
    router.back();
  };
  const onReplies = (value: string) => {
    if (refReplies?.current?.onComment) {
      refReplies?.current?.onComment(value);
    }
  };
  const getSubComment = (payload: IComment[]) => {
    if (payload.length > 0) {
      return (
        <div className='sub-comment ml-[48px]'>
          {payload?.map((comment: IComment, index: number) => (
            <ItemComment data={comment} key={index} onReplies={onReplies} />
          ))}
        </div>
      );
    }
  };
  return (
    <>
      <div className='header relative'>
        <Text type='body-16-bold' color='primary-5' className='py-[17px] text-center'>
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
        postDetail={postDetailUnAuth?.data}
        totalComments={commentsOfPostUnAuth?.data?.list.length}
        onRefreshPostDetail={() => onRefreshPostDetail()}
      />
      <div className='unAuth flex flex-row items-center border-b border-t border-solid border-[#E6E6E6] px-[16px] py-[10px]'>
        <button className='h-[28px] w-[83px] rounded-[4px] bg-[#1F6EAC]'>
          <Text type='body-14-semibold' color='cbwhite'>
            Sign up
          </Text>
        </button>
        <Text type='body-14-regular' color='primary-5' className='mx-[8px]'>
          or
        </Text>
        <button className='h-[28px] w-[83px] rounded-[4px] bg-[#EAF4FB]'>
          <Text type='body-14-semibold' color='primary-2'>
            Log in
          </Text>
        </button>
        <Text type='body-14-regular' color='primary-5' className='ml-[7px]'>
          to join the discussion
        </Text>
      </div>
      <div>
        {commentsOfPost?.data?.list?.map((item: IComment, index: number) => {
          return (
            <>
              <ItemComment key={index} data={item} onReplies={onReplies} />
              {getSubComment(item.children)}
            </>
          );
        })}
      </div>
      <div>
        <ForwardedRefComponent ref={refReplies} id={postDetail?.id} />
      </div>
    </>
  );
};
export default PostDetail;
