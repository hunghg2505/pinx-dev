import { useRouter } from 'next/router';

import NewFeedItem from '@components/Post/NewsFeed/NewFeedItem';
import { IPost, useCommentsOfPost } from '@components/Post/service';

interface IProps {
  data: IPost;
  id: string;
  refresh: () => void;
  onHidePost?: (id: string) => void;
}
const TrendingOnnPinex = (props: IProps) => {
  const { data, refresh, id, onHidePost } = props;
  const router = useRouter();
  const onNavigate = () => {
    router.push(`/post/${data?.id}`);
  };
  const { commentsOfPost } = useCommentsOfPost(String(data?.id));
  const totalComments = commentsOfPost?.data?.list?.length;
  const commentChild = commentsOfPost?.data?.list?.reduce(
    (acc: any, current: any) => acc + current?.totalChildren,
    0,
  );
  const countComment = totalComments + commentChild;
  return (
    <div className='relative mb-[16px] w-full rounded-[12px] p-[16px] mobile-max:[box-shadow:0px_9px_28px_8px_rgba(0,_0,_0,_0.05),_0px_6px_16px_0px_rgba(0,_0,_0,_0.08),_0px_3px_6px_-4px_rgba(0,_0,_0,_0.12)]'>
      <NewFeedItem
        onNavigate={onNavigate}
        postDetail={data}
        totalComments={countComment}
        onRefreshPostDetail={refresh}
        postId={id}
        onHidePostSuccess={onHidePost}
        isExplore={true}
      />
      <div className='pointer-events-none absolute left-2/4 top-0 hidden h-full w-[94%] -translate-x-2/4 transform border-b border-t border-solid border-[#ffffff] mobile-max:block'></div>
    </div>
  );
};
export default TrendingOnnPinex;
