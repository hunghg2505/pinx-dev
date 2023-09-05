import React from 'react';

import { useAtom } from 'jotai';

import { postDetailStatusAtom } from '@store/postDetail/postDetail';

import { ForwardedRefComponent } from '.';
import CommentOfComment from './CommentOfComment';
import ItemComment from '../NewsFeed/ItemComment';
// import { IComment } from '../service';

interface IProps {
  item: any;
  width: number;
  // onReplies: (value: string, customerId: number, id: string) => void;
  setImageCommentMobile: (v: boolean) => void;
  refresh: () => void;
  postID: string;
  onRemoveComment?: (v: any, totalComment: number) => void;
  onRepliesMobile?: (value: string, customerId: number, id: string) => void;
  onTrackingViewTickerCmt?: (stockCode: string) => void;
}

const CommentPost = (props: IProps, ref: any) => {
  const {
    item,
    width,
    // onReplies,
    refresh,
    postID,
    setImageCommentMobile,
    onRepliesMobile,
    onRemoveComment,
    onTrackingViewTickerCmt,
  } = props;
  const refCommentofComment: any = React.useRef();
  const refSubReplies: any = React.useRef();
  const [postDetailStatus, setPostDetailStatus] = useAtom(postDetailStatusAtom);
  const [totalChildren, setTotalChildren] = React.useState<number>(item.totalChildren);
  const [, setShowReply] = React.useState('');
  const onReplies = async (value: string, customerId: number, id: string) => {
    //   refSubReplies?.current?.onReply();
    setPostDetailStatus({ ...postDetailStatus, isDoneReplies: false, idCommentReplie: id });
    setShowReply(id);
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
    if (width > 770 && refSubReplies?.current?.onComment) {
      refSubReplies?.current?.onComment(value, customerId, id);
    }
  };
  const onRepliesCommon = (value: string, customerId: number, id: string) => {
    if (width > 770) {
      onReplies(value, customerId, id);
    } else {
      onRepliesMobile && onRepliesMobile(value, customerId, id);
    }
  };
  React.useImperativeHandle(ref, () => ({ refreshCommentOfComment }));
  const refreshCommentOfComment = () => {
    refCommentofComment?.current && refCommentofComment?.current?.onRefresh();
  };
  const onGetTotalComment = (data: number) => {
    setTotalChildren(data);
  };
  const isReply = postDetailStatus.idCommentReplie === item.id;
  const onHandleRemove = (v: any) => {
    console.log('123', v);
    console.log('totalChildren', totalChildren);
    onRemoveComment && onRemoveComment(v, totalChildren + 1);
  };
  const onHandleRemoveReply = () => {
    onRemoveComment && onRemoveComment(undefined, 1);
  };
  return (
    <>
      <ItemComment
        data={item}
        onReplies={onRepliesCommon}
        refreshTotal={refresh}
        refreshCommentOfPOst={refreshCommentOfComment}
        width={width}
        isReply={isReply && !postDetailStatus.isDoneReplies}
        idPost={postID}
        totalChildren={totalChildren}
        onRemoveComment={onHandleRemove}
        onTrackingViewTicker={onTrackingViewTickerCmt}
      />

      {/* {item.children?.length > 0 && ( */}
      <CommentOfComment
        ref={refCommentofComment}
        id={item.id}
        onReplies={onRepliesCommon}
        width={width}
        refresh={refresh}
        idPost={postID}
        refSubReplies={refSubReplies}
        totalComment={onGetTotalComment}
        onRemoveComment={onHandleRemoveReply}
        onTrackingViewTicker={onTrackingViewTickerCmt}
      />
      {/* )} */}

      {postDetailStatus.idCommentReplie === item?.id &&
        width > 770 &&
        !postDetailStatus.isDoneReplies && (
          <div className='ml-[48px] mt-4 mobile:hidden tablet:block'>
            <ForwardedRefComponent
              ref={refSubReplies}
              id={postID}
              refresh={refreshCommentOfComment}
              refreshTotal={refresh}
              setImageCommentMobile={setImageCommentMobile}
              width={width}
              isReply={!postDetailStatus.isDoneReplies}
            />
          </div>
        )}
    </>
  );
};
export default React.forwardRef(CommentPost);
