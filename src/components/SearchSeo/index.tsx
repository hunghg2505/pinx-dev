import React from 'react';

import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import CompanyItem from '@components/Explore/Search/CompanyItem';
import NewsItem from '@components/Explore/Search/NewsItem';
import UserItem from '@components/Explore/Search/UserItem';
import NewsFeed from '@components/Post/NewsFeed';
import Empty from '@components/SearchSeo/Empty';
import styles from '@components/SearchSeo/index.module.scss';
import MediaItem from '@components/SearchSeo/MediaItem';
import { useSearchPublic } from '@components/SearchSeo/service';

const SearchSeo = () => {
  const { t } = useTranslation(['search-seo', 'common']);
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const tab = searchParams.get('tab') || 'company';
  const getType = searchParams.get('type') || '';
  const { replace, query } = useRouter();

  const { data, searchPublic, loading } = useSearchPublic({
    onSuccess: () => {},
  });

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const removeHashTag = (str: string) => {
    const regexp = /#(\S)/g;
    return str.replaceAll(regexp, '$1');
  };

  React.useEffect(() => {
    searchPublic({
      textSearch: removeHashTag(keyword),
      type: getType,
    });
  }, [keyword, getType, tab]);

  const companies = data?.data?.companyList?.list;
  const users = data?.data?.customerList?.list;
  const posts = data?.data?.postList?.list || data?.data?.listMapping;
  const news = data?.data?.newsList?.list;
  const media = data?.data?.listMedia;
  const image = data?.data?.listImage;

  // map api do trả thiếu id
  const newUsers = users?.map((item: any) => ({ ...item, id: item.customerId }));

  const companiesL = companies?.length > 0;
  const usersL = users?.length > 0;
  const postsL = posts?.length > 0;
  const newsL = news?.length > 0;

  // Lọc loại bỏ data ko có hình ảnh (Yêu cầu của BA)
  const mediaFilter = media?.filter((item: any) => item?.post?.metadataList[0]?.images[0]?.length > 0 || item?.post?.metadataList[0]?.url?.length > 0);
  const imageFilter = image?.filter((item: any) => item?.post?.seoMetadata?.imageSeo?.urlImage?.length > 0);


  return (
    <>
      <div className={classNames('box-shadow card-style', styles.Tab)}>
        <Tabs
          defaultActiveKey='post'
          activeKey={searchParams.get('tab') || 'company'}
          onChange={(key: string) => {
            replace({ query: { ...query, tab: key } });
          }}
        >
          <TabPane tab={t('common:searchseo.tab.company')} key='company'>
            {companiesL ? (
              <div className='flex flex-col gap-y-[16px]'>
                {companies?.map((company: any, index: number) => {
                  return <CompanyItem key={`company-${index}`} data={company} />;
                })}
              </div>
            ) : (
              <>
                <Empty keyword={keyword} loading={loading} />
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
                <Empty keyword={keyword} loading={loading} />
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
                      isNewFeedExplore={true}
                    />
                  );
                })}
              </div>
            ) : (
              <>
                <Empty keyword={keyword} loading={loading} />
              </>
            )}
          </TabPane>
          <TabPane tab={t('common:searchseo.tab.news')} key='news'>
            {newsL ? (
              <div className='my-[16px] flex flex-col gap-y-[12px]'>
                {news?.map((item: any) => {
                  return <NewsItem key={`new-items-${item?.id}`} middle={true} data={item} />;
                })}
              </div>
            ) : (
              <>
                <Empty keyword={keyword} loading={loading} />
              </>
            )}
          </TabPane>
          <TabPane tab={t('common:searchseo.tab.media')} key='media'>
            {(imageFilter?.length > 0 || mediaFilter?.length > 0) ? (
              <div className='grid grid-cols-1 tablet:grid-cols-2 gap-[16px]'>
                {imageFilter?.map((item: any) => {
                  return <MediaItem key={`media-item-${item?.id}`} data={item} type='image' />;
                })}
                {mediaFilter?.map((item: any) => {
                  return <MediaItem key={`media-item-${item?.id}`} data={item} />;
                })}
              </div>
            ) : (
              <>
                <Empty keyword={keyword} loading={loading} />
              </>
            )}
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};
export default SearchSeo;
