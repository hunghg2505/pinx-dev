import Image from 'next/image';
import { useRouter } from 'next/router';

import Text from '@components/UI/Text';

import data from '../data.json';
import ItemComment from '../NewsFeed/ItemComment';
import NewFeedItem from '../NewsFeed/NewFeedItem';
import { IComment } from '../service';
import dynamic from 'next/dynamic';
import React, { forwardRef, useRef } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Mention from '@tiptap/extension-mention';
import suggestion from '@components/Editor/Suggestion';
// import Editor from '@components/Editor';
const Editor = dynamic(() => import('@components/Editor'), {
  ssr: false,
});
const ComponentRef = dynamic(import('@components/ComponentRef'), {
  ssr: false,
});
const ForwardedRefComponent = React.forwardRef((props, ref) => (
  <ComponentRef {...props} forwardedRef={ref} />
));
// const ForwardRefEditor = forwardRef((props, ref) => <Editor {...props} forwardedRef={ref} />);
// const Editor = dynamic(() => import('@components/Editor'), {
//   ssr: false,
// });
// const NewFeedItem = dynamic(() => import('../NewsFeed/NewFeedItem'), {
//   ssr: false,
// });
const getSubComment = (payload: IComment[]) => {
  if (payload.length > 0) {
    return (
      <div className='sub-comment ml-[48px]'>
        {payload?.map((comment: IComment, index: number) => (
          <ItemComment data={comment} key={index} />
        ))}
      </div>
    );
  }
};

const PostDetail = () => {
  const refReplie: any = useRef();
  const router = useRouter();
  const onGoToBack = () => {
    router.back();
  };
  const onReplie = (value: string) => {
    if (refReplie?.current?.onComment) refReplie?.current?.onComment(value);
  };
  return (
    <>
      <div className='header relative '>
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
      <NewFeedItem />
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
        {data.map((item: IComment, index) => {
          console.log('children', item.children);
          return (
            <>
              <ItemComment key={index} data={item} onReplie={onReplie} />
              {getSubComment(item.children)}
            </>
          );
        })}
      </div>
      <div>
        <ForwardedRefComponent ref={refReplie} />
      </div>
    </>
  );
};
export default PostDetail;
