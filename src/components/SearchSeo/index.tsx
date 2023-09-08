import React from 'react';

import { clearCache } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import NewsItem from '@components/Explore/Search/NewsItem';
import NewsFeed from '@components/Post/NewsFeed';
import { TYPEPOST } from '@components/Post/service';
import Empty from '@components/SearchSeo/Empty';
import styles from '@components/SearchSeo/index.module.scss';
import MediaItem from '@components/SearchSeo/MediaItem';
import { useSearchPublicPage } from '@components/SearchSeo/service';
import Loading from '@components/UI/Loading';
import { ROUTE_PATH } from '@utils/common';
import { ViewTickerInfo } from '@utils/dataLayer';
import { removeSpecialCharacter } from '@utils/removeSpecialChar';

import { CompanyTab, PeopleTab } from './Tab';

// tracking event view ticker info
const handleTrackingViewTickerInfo = (stockCode: string, locationDetail: string) => {
  ViewTickerInfo(stockCode, 'Search seo screen', locationDetail, 'Stock');
};

const SearchSeo = () => {
  const { t } = useTranslation(['search-seo', 'common']);
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const getType = searchParams.get('tab') || '';
  const { replace, query, push } = useRouter();

  const {
    data,
    run: searchPublicPage,
    loading,
  } = useSearchPublicPage({
    onSuccess: () => {
      clearCache('search-seo-page');
    },
  });
  React.useEffect(() => {
    clearCache('search-seo-page');
    if (keyword) {
      searchPublicPage({
        textSearch: removeSpecialCharacter(keyword),
        type: getType,
      });
    }
  }, [keyword]);

  const navigateToPostDetail = (postId: string) => {
    push(ROUTE_PATH.POST_DETAIL(postId));
  };

  const posts = data?.data?.postList?.list || data?.data?.listMapping;
  const news = data?.data?.newsList?.list;
  const media = data?.data?.listMedia?.list?.map((item: any) => {
    return {
      type: 'media',
      timeString: item.timeString,
      ...item,
    };
  });
  const image = data?.data?.listImage?.list
    ?.filter((item: any) => item.postType === TYPEPOST.POST)
    ?.map((item: any) => {
      return {
        type: 'image',
        timeString: item.timeString,
        ...item,
      };
    });

  const postsL = posts?.length > 0;
  const newsL = news?.length > 0;
  const mediaL = media?.length > 0;
  const imageL = image?.length > 0;
  let newMedia = [];
  let fillterMediaSort = [];

  if (mediaL || imageL) {
    newMedia = [...media, ...image];
    const newMediaSort = newMedia.sort(({ timeString: a }, { timeString: b }) =>
      dayjs(a).isBefore(dayjs(b)) ? 1 : -1,
    );

    fillterMediaSort = newMediaSort;
  }
  console.log('fillterMediaSort', fillterMediaSort);
  return (
    <>
      <div className={classNames('box-shadow card-style', styles.Tab)}>
        <Tabs
          defaultActiveKey='post'
          activeKey={searchParams.get('tab') || 'company'}
          onChange={(key: string) => {
            replace({ query: { ...query, tab: key } });
          }}
          animated={false}
        >
          <TabPane tab={t('common:searchseo.tab.company')} key='company'>
            <CompanyTab textSearch={keyword} onTrackingViewTicker={handleTrackingViewTickerInfo} />
          </TabPane>
          <TabPane tab={t('common:searchseo.tab.people')} key='people'>
            <PeopleTab textSearch={keyword} />
          </TabPane>
          <TabPane tab={t('common:searchseo.tab.posts')} key='posts'>
            {postsL ? (
              <div className='flex flex-col'>
                {posts?.map((post: any) => {
                  return (
                    <NewsFeed
                      key={`explore-search-${post?.id}`}
                      data={post}
                      isNewFeedExplore={false}
                      hiddenComment={true}
                      onTrackingViewTicker={(stockCode) =>
                        handleTrackingViewTickerInfo(stockCode, 'Posts tab')
                      }
                    />
                  );
                })}
              </div>
            ) : (
              <>
                {data ? (
                  <Empty keyword={keyword} loading={loading} />
                ) : (
                  <div className='flex min-h-[150px] flex-row items-center justify-center'>
                    <Loading />
                  </div>
                )}
              </>
            )}
          </TabPane>
          <TabPane tab={t('common:searchseo.tab.news')} key='news'>
            {newsL ? (
              <div className='my-[16px] flex flex-col gap-y-[12px]'>
                {news?.map((item: any) => {
                  return (
                    <NewsItem
                      onNavigate={() => navigateToPostDetail(item?.id)}
                      key={`new-items-${item?.id}`}
                      middle={true}
                      data={item}
                      showComment
                    />
                  );
                })}
              </div>
            ) : (
              <>
                {data ? (
                  <Empty keyword={keyword} loading={loading} />
                ) : (
                  <div className='flex min-h-[150px] flex-row items-center justify-center'>
                    <Loading />
                  </div>
                )}
              </>
            )}
          </TabPane>
          <TabPane tab={t('common:searchseo.tab.media')} key='media'>
            {fillterMediaSort?.length > 0 ? (
              <div className='grid grid-cols-1 gap-[16px] tablet:grid-cols-2'>
                {fillterMediaSort?.map((item: any) => {
                  return (
                    <MediaItem
                      onTrackingViewTicker={(stockCode) =>
                        handleTrackingViewTickerInfo(stockCode, 'Media tab')
                      }
                      key={`media-item-${item?.id}`}
                      data={item}
                      type={item?.type}
                    />
                  );
                })}
              </div>
            ) : (
              <>
                {data ? (
                  <Empty keyword={keyword} loading={loading} />
                ) : (
                  <div className='flex min-h-[150px] flex-row items-center justify-center'>
                    <Loading />
                  </div>
                )}
              </>
            )}
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};
export default SearchSeo;
