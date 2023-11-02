import { lazyLoadHydrateScroll } from '@components/LazyComp/LazyComp';
import NewsFeedSkeleton from '@components/Post/NewsFeed/NewsFeedSkeleton';

const PostListChunk1 = lazyLoadHydrateScroll(
  () => import('@components/Home/HomeNewFeed/Comp/PostListChunk1'),
  false,
);

const PostListChunk2 = lazyLoadHydrateScroll(
  () => import('@components/Home/HomeNewFeed/Comp/PostListChunk2'),
  false,
);

const PostList = ({
  // size,
  serviceLoadMorePost,
  onCommentPost,
  firstPost,
  fourPost,
  postsNext,
  loadingPosts,
}: any) => {
  return (
    <>
      <PostListChunk1
        firstPost={firstPost}
        onCommentPost={onCommentPost}
        fourPost={fourPost}
        loadingPosts={loadingPosts}
      />
      <PostListChunk2
        postsNext={postsNext}
        serviceLoadMorePost={serviceLoadMorePost}
        onCommentPost={onCommentPost}
      />

      {loadingPosts && (
        <>
          {[1, 2].map((item) => (
            <NewsFeedSkeleton key={item} />
          ))}
        </>
      )}
    </>
  );
};

export default PostList;
