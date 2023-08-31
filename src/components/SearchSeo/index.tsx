import React from 'react';

import { clearCache } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import CompanyItem from '@components/Explore/Search/CompanyItem';
import NewsItem from '@components/Explore/Search/NewsItem';
import UserItem from '@components/Explore/Search/UserItem';
import NewsFeed from '@components/Post/NewsFeed';
import { TYPEPOST } from '@components/Post/service';
import Empty from '@components/SearchSeo/Empty';
import styles from '@components/SearchSeo/index.module.scss';
import MediaItem from '@components/SearchSeo/MediaItem';
import { useSearchPublicPage } from '@components/SearchSeo/service';
import Loading from '@components/UI/Loading';
import { ROUTE_PATH } from '@utils/common';
import { removeHashTag } from '@utils/removeHashTag';

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
        textSearch: removeHashTag(keyword),
        type: getType,
      });
    }
  }, [keyword]);

  const navigateToPostDetail = (postId: string) => {
    push(ROUTE_PATH.POST_DETAIL(postId));
  };

  const companies = data?.data?.companyList?.list;
  const users = data?.data?.customerList?.list;
  const posts = data?.data?.postList?.list || data?.data?.listMapping;
  const news = data?.data?.newsList?.list;
  const media = data?.data?.listMedia?.map((item: any) => {
    return {
      type: 'media',
      timeString: item.timeString,
      ...item,
    };
  });
  const image = data?.data?.listImage
    ?.filter((item: any) => item.postType === TYPEPOST.POST)
    ?.map((item: any) => {
      return {
        type: 'image',
        timeString: item.timeString,
        ...item,
      };
    });

  // map api do trả thiếu id
  const newUsers = users?.map((item: any) => {
    return {
      id: item.customerId,
      ...item,
    };
  });

  const companiesL = companies?.length > 0;
  const usersL = users?.length > 0;
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
            {companiesL ? (
              <div className='flex flex-col gap-y-[16px]'>
                {companies?.map((company: any, index: number) => {
                  return <CompanyItem isSearchSeo key={`company-${index}`} data={company} />;
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
          <TabPane tab={t('common:searchseo.tab.people')} key='people'>
            {usersL ? (
              <div className='flex flex-col gap-y-[16px]'>
                {newUsers?.map((item: any, index: number) => (
                  <UserItem data={item} key={index} />
                ))}
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
                  return <MediaItem key={`media-item-${item?.id}`} data={item} type={item?.type} />;
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
