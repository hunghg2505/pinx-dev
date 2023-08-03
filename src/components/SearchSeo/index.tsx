import React from 'react';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Tabs, { TabPane } from 'rc-tabs';

const SearchSeo = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('keyword');
  const { replace, query } = useRouter();

  return (
    <>
      <div className='box-shadow card-style'>
        <h1>Search result found for {search}</h1>
        <Tabs
          defaultActiveKey="company"
          activeKey={searchParams.get('type') || 'company'}
          onChange={(key: string) => {
            replace({ query: { ...query, type: key } });
          }}
        >
          <TabPane tab="Company" key="company">
            Company
          </TabPane>
          <TabPane tab="People" key="people">
            People
          </TabPane>
          <TabPane tab="Posts" key="post">
            Posts
          </TabPane>
          <TabPane tab="News" key="news">
            News
          </TabPane>
          <TabPane tab="Media" key="media">
            Media
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};
export default SearchSeo;
