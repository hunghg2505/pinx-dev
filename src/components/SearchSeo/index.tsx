import React, { useEffect, useMemo, useState } from 'react';

import { clearCache } from 'ahooks';
import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import styles from '@components/SearchSeo/index.module.scss';
import { Skeleton } from '@components/UI/Skeleton';
import { ViewTickerInfo } from '@utils/dataLayer';
import { removeSpecialCharacter } from '@utils/removeSpecialChar';

import { useSearchPublic } from './service';
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
  const [tab, setTab] = useState('company');

  const keywordFormat = useMemo(() => {
    return removeSpecialCharacter(keyword);
  }, [keyword]);
  const { data, run, refresh, loading } = useSearchPublic();
  useEffect(() => {
    refresh();
    clearCache('search-seo');
    run({
      textSearch: keywordFormat,
    });
    setTab('company');
  }, [keywordFormat]);
  const companiesL = data?.data?.companyList?.list?.length > 0;
  const usersL = data?.data?.customerList?.list?.length > 0;
  const postsL = data?.data?.postList?.list?.length > 0;
  const newsL = data?.data?.newsList?.list?.length > 0;
  const mediaL = data?.data?.listMedia?.list?.length > 0;

  useEffect(() => {
    if (companiesL) {
      setTab('company');
    } else if (usersL) {
      setTab('people');
    } else if (postsL) {
      setTab('posts');
    } else if (newsL) {
      setTab('news');
    } else if (mediaL) {
      setTab('media');
    } else {
      setTab('company');
    }
  }, [data]);
  // console.log(keywordFormat);
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
      {loading ? (
        <div className='box-shadow card-style'>
          <Skeleton
            rows={5}
            wrapClassName='!flex-row gap-x-[12px] mb-[20px]'
            className='!w-full'
            round
          />
          <Skeleton className='!h-[290px] !w-full !rounded-[8px]' />
        </div>
      ) : (
        <div className={classNames('box-shadow card-style', styles.Tab)}>
          <Tabs
            defaultActiveKey='company'
            activeKey={searchParams.get('tab') || tab}
            onChange={(key: string) => {
              replace({ query: { ...query, tab: key } });
            }}
            animated={false}
          >
            <TabPane tab={t('common:searchseo.tab.company')} key='company'>
              <CompanyTab
                textSearch={keyword}
                textSearchFormat={keywordFormat}
                onTrackingViewTicker={handleTrackingViewTickerInfo}
              />
            </TabPane>
            <TabPane tab={t('common:searchseo.tab.people')} key='people'>
              <PeopleTab textSearch={keyword} textSearchFormat={keywordFormat} />
            </TabPane>
            <TabPane tab={t('common:searchseo.tab.posts')} key='posts'>
              <PostsTab
                keyword={keyword}
                keywordFormat={keywordFormat}
                onTrackingViewTicker={handleTrackingViewTickerInfo}
              />
            </TabPane>
            <TabPane tab={t('common:searchseo.tab.news')} key='news'>
              <NewsTab keyword={keyword} keywordFormat={keywordFormat} />
            </TabPane>
            <TabPane tab={t('common:searchseo.tab.media')} key='media'>
              <MediaTab
                textSearch={keyword}
                textSearchFormat={keywordFormat}
                onTrackingViewTicker={handleTrackingViewTickerInfo}
              />
            </TabPane>
          </Tabs>
        </div>
      )}
    </>
  );
};
export default SearchSeo;
