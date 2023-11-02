import { useTranslation } from 'next-i18next';

import { handleTrackingViewTicker } from '@components/Home/HomeNewFeed/utilts';
import { lazyLoadHydrateScroll } from '@components/LazyComp/LazyComp';
import NewsFeedSkeleton from '@components/Post/NewsFeed/NewsFeedSkeleton';
import { IPost } from '@components/Post/service';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { PEOPLEINSPOTLIGHT } from 'src/constant/route';

const Trending = lazyLoadHydrateScroll(() => import('../../Trending'), false);
const Influencer = lazyLoadHydrateScroll(() => import('../../People/Influencer'), false);

const SuggestionPeople = lazyLoadHydrateScroll(() => import('../SuggestionPeople'), false);

const NewsFeed = lazyLoadHydrateScroll(
  () => import('../../../Post/NewsFeed'),
  false,
  () => <NewsFeedSkeleton />,
);
const ListTheme = lazyLoadHydrateScroll(() => import('@components/Home/ListTheme'), false);

const PostListChunk1 = ({ firstPost, onCommentPost, fourPost, loadingPosts }: any) => {
  const { t } = useTranslation('home');

  return (
    <>
      {firstPost ? (
        <NewsFeed
          onTrackingViewTickerCmt={(stockCode: any) =>
            handleTrackingViewTicker(stockCode, 'Comment')
          }
          onTrackingViewTicker={(stockCode: any) =>
            handleTrackingViewTicker(stockCode, 'News feed')
          }
          key={`home-post-item-${firstPost?.id}`}
          data={firstPost as any}
          onCommentPost={onCommentPost}
          currentLocation='Home page'
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

        <CustomLink href={PEOPLEINSPOTLIGHT}>
          <div className='mt-[16px]'>
            <button className='h-[45px] w-full rounded-[8px] bg-[#F0F7FC]'>
              <Text type='body-14-bold' color='primary-2'>
                {t('explore_influencer')}
              </Text>
            </button>
          </div>
        </CustomLink>
      </div>

      <SuggestionPeople />

      {fourPost.length > 0 && (
        <>
          {fourPost?.map((item: IPost) => {
            return (
              <NewsFeed
                key={`home-post-item-${item?.id}`}
                onTrackingViewTickerCmt={(stockCode: any) =>
                  handleTrackingViewTicker(stockCode, 'Comment')
                }
                onTrackingViewTicker={(stockCode: any) =>
                  handleTrackingViewTicker(stockCode, 'News feed')
                }
                loading={loadingPosts}
                data={item}
                onCommentPost={onCommentPost}
                currentLocation='Home page'
              />
            );
          })}
        </>
      )}

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
    </>
  );
};

export default PostListChunk1;
