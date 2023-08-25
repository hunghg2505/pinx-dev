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
  isReply?: boolean;
  totalComment?: (v: number) => void;
}
const CommentOfComment = (props: IProps, ref: any) => {
  const { id, onReplies, width, refresh, idPost, totalComment } = props;
  const { data, refreshCommentOfComment, run } = useCommentOfComment({
    onSuccess: (r: any) => {
      totalComment && totalComment(r?.data?.list?.length);
    },
    manual: true,
  });
  React.useEffect(() => {
    run(id);
  }, [id]);

  const onRefresh = () => run(id);

  React.useImperativeHandle(ref, () => ({ onRefresh }));
  if (data?.length < 1) {
    return <></>;
  }
  return (
    <>
      <div className='sub-comment ml-[48px]'>
        {data &&
          [...data]
            .reverse()
            ?.map((comment: IComment, index: number) => (
              <ItemComment
                idPost={idPost}
                key={`subComment-${comment.id}`}
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
    </>
  );
};
export default React.forwardRef(CommentOfComment);
