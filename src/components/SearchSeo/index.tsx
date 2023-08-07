import React from 'react';

import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Tabs, { TabPane } from 'rc-tabs';

import CompanyItem from '@components/Explore/Search/CompanyItem';
import NewsItem from '@components/Explore/Search/NewsItem';
import UserItem from '@components/Explore/Search/UserItem';
import NewsFeed from '@components/Post/NewsFeed';
import Empty from '@components/SearchSeo/Empty';
import styles from '@components/SearchSeo/index.module.scss';
import { useSearchPublic } from '@components/SearchSeo/service';

const SearchSeo = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const tab = searchParams.get('tab');
  const getType = searchParams.get('type') || '';
  const { replace, query } = useRouter();

  const { data, searchPublic, loading, refresh } = useSearchPublic({
    onSuccess: () => {
      console.log('useSearchPublic', data);
    },
  });

  React.useEffect(() => {
    searchPublic({
      textSearch: keyword,
      type: getType,
    });
  }, [keyword, getType]);

  const companies = data?.data?.companyList?.list;
  const users = data?.data?.customerList?.list;
  const posts = data?.data?.postList?.list;
  const news = data?.data?.newsList?.list;
  const media = data?.data?.listMedia?.list;

  const companiesL = companies?.length > 0;
  const usersL = users?.length > 0;
  const postsL = posts?.length > 0;
  const newsL = news?.length > 0;
  const mediaL = media?.length > 0;

  // Error commit git
  console.log('keyword', keyword);
  console.log('tab', tab);
  console.log('type', getType);
  console.log(loading, refresh, media);

  return (
    <>
      <div className='box-shadow card-style'>
        <Tabs
          defaultActiveKey='post'
          activeKey={searchParams.get('tab') || 'company'}
          onChange={(key: string) => {
            replace({ query: { ...query, tab: key } });
          }}
          className={classNames(
            styles.Tab,
            'tabHome',
          )}
        >
          <TabPane tab='Company' key='company'>
            {companiesL ? (
              <div className='flex flex-col gap-y-[16px]'>
                {companies?.map((company: any, index: number) => {
                  return <CompanyItem key={`company-${index}`} data={company} />;
                })}
              </div>
            ):(
              <>
                <Empty keyword={keyword} />
              </>
            )}
          </TabPane>
          <TabPane tab='People' key='people'>
            {usersL ? (
              <div className='flex flex-col gap-y-[16px]'>
                {users?.map((item: any, index: number) => (
                  <UserItem data={item} key={index} />
                ))}
              </div>
            ):(
              <>
                <Empty keyword={keyword} />
              </>
            )}
          </TabPane>
          <TabPane tab="Posts" key="post">
            {postsL ? (
              <div className='flex flex-col'>
                {posts?.map((post: any) => {
                  return <NewsFeed key={`explore-search-${post?.id}`} data={post} />;
                })}
              </div>
            ):(
              <>
                <Empty keyword={keyword} />
              </>
            )}
          </TabPane>
          <TabPane tab='News' key='news'>
            {newsL ? (
              <div className='my-[16px] flex flex-col gap-y-[12px]'>
                {news?.map((item: any) => {
                  return <NewsItem key={`new-items-${item?.id}`} data={item} />;
                })}
              </div>
            ):(
              <>
                <Empty keyword={keyword} />
              </>
            )}
          </TabPane>
          <TabPane tab='Media' key='media'>
            {mediaL ? (
              <div>media</div>
            ):(
              <>
                <Empty keyword={keyword} />
              </>
            )}
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};
export default SearchSeo;
