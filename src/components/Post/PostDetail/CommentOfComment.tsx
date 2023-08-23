import { useAtom } from 'jotai';

import { ForwardedRefComponent } from '@components/Themes/ThemeDetail/Activities/ModalComment/PostDetail';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';

import ItemComment from '../NewsFeed/ItemComment';
import { IComment, useCommentOfComment } from '../service';

interface IProps {
  id: string;
  onReplies: any;
  width: number;
  refresh: () => void;
  idPost?: string;
  refSubReplies: any;
  setImageCommentMobile: any;
}
const CommentOfComment = (props: IProps) => {
  const { id, onReplies, width, refresh, idPost, refSubReplies, setImageCommentMobile } = props;
  const { data, refreshCommentOfComment } = useCommentOfComment(id);
  const [postDetailStatus] = useAtom(postDetailStatusAtom);
  return (
    <>
      <div className='sub-comment ml-[48px]'>
        {data?.map((comment: IComment, index: number) => (
          <ItemComment
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
      {width > 770 && !postDetailStatus.isDoneReplies && (
        <div className='ml-[48px] mt-4 mobile:hidden tablet:block'>
          <ForwardedRefComponent
            ref={refSubReplies}
            id={idPost}
            refresh={refreshCommentOfComment}
            refreshTotal={refresh}
            setImageCommentMobile={setImageCommentMobile}
            width={width}
            isReply={true}
          />
        </div>
      )}
    </>
  );
};
export default CommentOfComment;
