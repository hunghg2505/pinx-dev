import { handleTrackingViewTicker } from '@components/Home/HomeNewFeed/utilts';
import { lazyLoadHydrateScroll } from '@components/LazyComp/LazyComp';
import NewsFeedSkeleton from '@components/Post/NewsFeed/NewsFeedSkeleton';
import { IPost } from '@components/Post/service';
import useObserver from '@hooks/useObserver';

const NewsFeed = lazyLoadHydrateScroll(
  () => import('../../../Post/NewsFeed'),
  false,
  () => <NewsFeedSkeleton />,
);

const PostListChunk2 = ({ postsNext, serviceLoadMorePost, onCommentPost }: any) => {
  const { refLastElement } = useObserver();

  return (
    <>
      {postsNext?.map((item: IPost, idx: number) => {
        if (idx === postsNext?.length - 1) {
          return (
            <div
              key={`home-post-item-${item?.id}`}
              ref={(node: any) => refLastElement(node, serviceLoadMorePost)}
            >
              <NewsFeed
                onTrackingViewTicker={(stockCode: any) =>
                  handleTrackingViewTicker(stockCode, 'News feed')
                }
                onTrackingViewTickerCmt={(stockCode: any) =>
                  handleTrackingViewTicker(stockCode, 'Comment')
                }
                data={item}
                onCommentPost={onCommentPost}
                currentLocation='Home page'
              />
            </div>
          );
        }

        return (
          <NewsFeed
            key={`home-post-item-${item?.id}`}
            onTrackingViewTicker={(stockCode: any) =>
              handleTrackingViewTicker(stockCode, 'News feed')
            }
            onTrackingViewTickerCmt={(stockCode: any) =>
              handleTrackingViewTicker(stockCode, 'Comment')
            }
            data={item}
            onCommentPost={onCommentPost}
            currentLocation='Home page'
          />
        );
      })}
    </>
  );
};

export default PostListChunk2;
