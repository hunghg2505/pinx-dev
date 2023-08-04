import React from 'react';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Tabs, { TabPane } from 'rc-tabs';

const SearchSeo = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  const tab = searchParams.get('tab');
  const type = searchParams.get('type');
  const { replace, query } = useRouter();

  // Error commit git
  console.log(tab,type);

  return (
    <>
      <div className='box-shadow card-style'>
        <h1>Search result found for {keyword}</h1>
        <Tabs
          defaultActiveKey="company"
          activeKey={searchParams.get('tab') || 'company'}
          onChange={(key: string) => {
            replace({ query: { ...query, tab: key } });
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
