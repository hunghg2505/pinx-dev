import classNames from 'classnames';
import { useRouter } from 'next/router';

import Text from '@components/UI/Text';

import ItemComment from './ItemComment';
import NewFeedItem from './NewFeedItem';
import { IPost, useCommentsOfPost } from '../service';

interface IProps {
  data: IPost;
  id: string;
  refresh: () => void;
  onHidePost: (id: string) => void;
}
const NewsFeed = (props: IProps) => {
  const { data, refresh, id, onHidePost } = props;
  const router = useRouter();
  const onNavigate = () => {
    router.push(`/post/${data?.id}`);
  };
  const { commentsOfPost, refreshCommentOfPOst } = useCommentsOfPost(String(data?.id));
  const totalComments = commentsOfPost?.data?.list?.length;
  const commentChild = commentsOfPost?.data?.list?.reduce(
    (acc: any, current: any) => acc + current?.totalChildren,
    0,
  );
  const countComment = totalComments + commentChild;
  const renderViewMore = () => {
    if (countComment > 1) {
      return (
        <div
          className='mx-[auto] mt-[15px] flex h-[36px] w-[calc((100%_-_32px))] cursor-pointer flex-row items-center justify-center rounded-[4px] bg-[#EAF4FB]'
          onClick={onNavigate}
        >
          <Text type='body-14-medium' color='primary-2'>
            View more {countComment - 1} comments...
          </Text>
        </div>
      );
    }
  };
  return (
    <>
      <div
        className={classNames('bg-[#ffffff]', {
          'mobile:pb-[30px] desktop:pb-[20px]': totalComments > 1,
        })}
      >
        <NewFeedItem
          onNavigate={onNavigate}
          postDetail={data}
          totalComments={countComment}
          onRefreshPostDetail={refresh}
          postId={id}
          onHidePostSuccess={onHidePost}
        />
        <div className='desktop:ml-[64px] desktop:mr-[88px]'>
          {totalComments > 0 && (
            <div className='mt-[22px]'>
              <ItemComment
                onNavigate={onNavigate}
                data={commentsOfPost?.data?.list?.[0]}
                refresh={refresh}
                refreshCommentOfPOst={refreshCommentOfPOst}
              />
            </div>
          )}
          {renderViewMore()}
        </div>
      </div>
    </>
  );
};
export default NewsFeed;
