import React from 'react';

import ItemComment from '../NewsFeed/ItemComment';
import { IComment, useCommentOfComment } from '../service';

interface IProps {
  id: string;
  onReplies: any;
  width: number;
  refresh: () => void;
  idPost: string;
  refSubReplies: any;
  setImageCommentMobile: any;
  isReply?: boolean;
}
const CommentOfComment = (props: IProps, ref: any) => {
  const { id, onReplies, width, refresh, idPost } = props;
  const { data, refreshCommentOfComment } = useCommentOfComment(id);
  console.log('id', id);
  React.useImperativeHandle(ref, () => {
    return {
      refreshCommentOfComment: (showReply: string) => {
        console.log(
          '🚀 ~ file: CommentOfComment.tsx:23 ~ React.useImperativeHandle ~ showReply:',
          showReply,
        );
        // run(showReply);
      },
    };
  });
  return (
    <>
      <div className='sub-comment ml-[48px]'>
        {data?.map((comment: IComment, index: number) => (
          <ItemComment
            idPost={idPost}
            key={comment.id}
            data={comment}
            onReplies={onReplies}
            refreshCommentOfPOst={refreshCommentOfComment}
            refreshTotal={refresh}
            isChildren={true}
            width={width}
            isLastChildren={index === data.length - 1}
          />
        ))}
      </div>
      {/* {isReply && width > 770 && !postDetailStatus.isDoneReplies && (
        <div className='ml-[48px] mt-4 mobile:hidden tablet:block'>
          <ForwardedRefComponent
            ref={refSubReplies}
            id={idPost}
            refresh={refreshComment}
            refreshTotal={refresh}
            setImageCommentMobile={setImageCommentMobile}
            width={width}
            isReply={true}
          />
        </div>
      )} */}
    </>
  );
};
export default React.forwardRef(CommentOfComment);
