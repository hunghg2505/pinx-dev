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
  onHidePost?: (id: string) => void;
  pinned?: boolean;
}
const NewsFeed = (props: IProps) => {
  const { data, refresh, id, onHidePost, pinned = false } = props;
  console.log('🚀 ~ file: index.tsx:19 ~ NewsFeed ~ data:', data);
  const router = useRouter();
  const onNavigate = () => {
    router.push(`/post/${data?.id}`);
  };
  const { commentsOfPost, refreshCommentOfPost } = useCommentsOfPost(String(data?.id));
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
          className='mb-[5px] mt-[15px] flex h-[36px] cursor-pointer flex-row items-center justify-center rounded-[4px] bg-[#EAF4FB]'
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
        className={classNames(
          'relative bg-[#ffffff] after:absolute after:-left-[20px] after:right-0 after:top-0 after:h-[1px] after:w-[calc(100%+40px)] after:bg-[#D8EBFC] after:content-[""]',
          {
            'mobile:pb-[30px] desktop:pb-[20px]': countComment > 1,
          },
        )}
      >
        <NewFeedItem
          onNavigate={onNavigate}
          postDetail={data}
          totalComments={countComment}
          onRefreshPostDetail={refresh}
          postId={id}
          onHidePostSuccess={onHidePost}
          pinned={pinned}
        />
        <div className='desktop:ml-[64px] desktop:mr-[85px]'>
          {countComment > 0 && (
            <div className='mt-[22px]'>
              <ItemComment
                onNavigate={onNavigate}
                data={commentsOfPost?.data?.list?.[0]}
                refresh={refresh}
                refreshCommentOfPOst={refreshCommentOfPost}
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
