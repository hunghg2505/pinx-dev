import React from 'react';

import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import styles from '@components/SearchSeo/index.module.scss';
import { ViewTickerInfo } from '@utils/dataLayer';

import { CompanyTab, MediaTab, NewsTab, PeopleTab, PostsTab } from './Tab';

// tracking event view ticker info
const handleTrackingViewTickerInfo = (stockCode: string, locationDetail: string) => {
  ViewTickerInfo(stockCode, 'Search seo screen', locationDetail, 'Stock');
};

const SearchSeo = () => {
  const { t } = useTranslation(['search-seo', 'common']);
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const { replace, query } = useRouter();

  // const media = data?.data?.listMedia?.list?.map((item: any) => {
  //   return {
  //     type: 'media',
  //     timeString: item.timeString,
  //     ...item,
  //   };
  // });
  // const image = data?.data?.listImage?.list
  //   ?.filter((item: any) => item.postType === TYPEPOST.POST)
  //   ?.map((item: any) => {
  //     return {
  //       type: 'image',
  //       timeString: item.timeString,
  //       ...item,
  //     };
  //   });

  // const mediaL = media?.length > 0;
  // const imageL = image?.length > 0;
  // let newMedia = [];
  // let fillterMediaSort = [];

  // if (mediaL || imageL) {
  //   newMedia = [...media, ...image];
  //   const newMediaSort = newMedia.sort(({ timeString: a }, { timeString: b }) =>
  //     dayjs(a).isBefore(dayjs(b)) ? 1 : -1,
  //   );

  //   fillterMediaSort = newMediaSort;
  // }
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
            <PostsTab keyword={keyword} onTrackingViewTicker={handleTrackingViewTickerInfo} />
          </TabPane>
          <TabPane tab={t('common:searchseo.tab.news')} key='news'>
            <NewsTab keyword={keyword} />
          </TabPane>
          <TabPane tab={t('common:searchseo.tab.media')} key='media'>
            <MediaTab textSearch={keyword} onTrackingViewTicker={handleTrackingViewTickerInfo} />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};
export default SearchSeo;
