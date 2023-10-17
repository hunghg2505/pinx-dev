import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';

import { handleTrackingViewTicker } from '@components/Home/HomeNewFeed/utilts';
import LoadCompVisible from '@components/LoadCompVisible/LoadCompVisible';
import NewsFeedSkeleton from '@components/Post/NewsFeed/NewsFeedSkeleton';
import { IPost } from '@components/Post/service';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import useObserver from '@hooks/useObserver';
import { ROUTE_PATH } from '@utils/common';

const ListTheme = dynamic(() => import('@components/Home/ListTheme'), {
  ssr: false,
});
const Trending = dynamic(() => import('../Trending'), {
  ssr: false,
});
const Influencer = dynamic(() => import('../People/Influencer'), {
  ssr: false,
});

const SuggestionPeople = dynamic(() => import('./SuggestionPeople'), { ssr: false });

const NewsFeed = dynamic(() => import('../../Post/NewsFeed'), {
  ssr: false,
  loading: () => <NewsFeedSkeleton />,
});

const PostList = ({
  // size,
  serviceLoadMorePost,
  onCommentPost,
  firstPost,
  fourPost,
  postsNext,
  loadingPosts,
}: any) => {
  const { t } = useTranslation('home');
  const { refLastElement } = useObserver();

  return (
    <>
      {firstPost ? (
        <NewsFeed
          onTrackingViewTickerCmt={(stockCode) => handleTrackingViewTicker(stockCode, 'Comment')}
          onTrackingViewTicker={(stockCode) => handleTrackingViewTicker(stockCode, 'News feed')}
          key={`home-post-item-${firstPost?.id}`}
          data={firstPost as any}
          onCommentPost={onCommentPost}
        />
      ) : (
        <NewsFeedSkeleton />
      )}

      <div className='box-shadow card-style tablet:hidden'>
        <div className='pb-[13px] pt-[10px] '>
          <Trending />
        </div>
      </div>

      <div className='box-shadow card-style'>
        <Text
          element='h2'
          type='body-16-semibold'
          color='neutral-2'
          className='mb-[14px] tablet:text-[20px]'
        >
          {t('people_in_spotlight')}
        </Text>
        <Influencer />

        <CustomLink href={ROUTE_PATH.PEOPLEINSPOTLIGHT}>
          <div className='mt-[16px]'>
            <button className='h-[45px] w-full rounded-[8px] bg-[#F0F7FC]'>
              <Text type='body-14-bold' color='primary-2'>
                {t('explore_influencer')}
              </Text>
            </button>
          </div>
        </CustomLink>
      </div>

      <LoadCompVisible>
        <SuggestionPeople />
      </LoadCompVisible>

      {fourPost.length > 0 ? (
        <>
          {fourPost?.map((item: IPost) => {
            return (
              <NewsFeed
                key={`home-post-item-${item?.id}`}
                onTrackingViewTickerCmt={(stockCode) => handleTrackingViewTicker(stockCode, 'Comment')}
                onTrackingViewTicker={(stockCode) => handleTrackingViewTicker(stockCode, 'News feed')}
                loading={loadingPosts}
                data={item}
                onCommentPost={onCommentPost}
              />
            );
          })}
        </>
      ) : (
        <NewsFeedSkeleton />
      )}

      <LoadCompVisible>
        <div className='box-shadow card-style'>
          <Text
            element='h2'
            type='body-16-semibold'
            color='neutral-2'
            className='mb-[14px] tablet:text-[20px]'
          >
            {t('economy_in_the_themes')}
          </Text>
          <ListTheme />
        </div>

        {postsNext?.map((item: IPost, idx: number) => {
          if (idx === postsNext?.length - 1) {
            return (
              <div
                key={`home-post-item-${item?.id}`}
                ref={(node: any) => refLastElement(node, serviceLoadMorePost)}
              >
                <NewsFeed
                  onTrackingViewTicker={(stockCode) =>
                    handleTrackingViewTicker(stockCode, 'News feed')
                  }
                  onTrackingViewTickerCmt={(stockCode) =>
                    handleTrackingViewTicker(stockCode, 'Comment')
                  }
                  data={item}
                  onCommentPost={onCommentPost}
                />
              </div>
            );
          }

          return (
            <NewsFeed
              key={`home-post-item-${item?.id}`}
              onTrackingViewTicker={(stockCode) => handleTrackingViewTicker(stockCode, 'News feed')}
              onTrackingViewTickerCmt={(stockCode) => handleTrackingViewTicker(stockCode, 'Comment')}
              data={item}
              onCommentPost={onCommentPost}
            />
          );
        })}
      </LoadCompVisible>

      {loadingPosts && (
        <>
          {[1, 2].map(item => (
            <NewsFeedSkeleton key={item} />
          ))}
        </>
      )}
    </>
  );
};

export default PostList;
