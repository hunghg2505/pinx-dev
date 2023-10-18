import React, { useEffect, useRef, useState } from 'react';

import NewsItem from '@components/Explore/Search/NewsItem';
// import Loading from '@components/UI/Loading';
import { Skeleton } from '@components/UI/Skeleton';
import useBottomScroll from '@hooks/useBottomScroll';

import Empty from '../Empty';
import { ResponseSearchPost, useSearchNews } from '../service';

interface NewsTabProps {
  keyword: string;
  keywordFormat: string;
}

const SkeletonLoadingNews = () => {
  return (
    <div className='flex gap-x-[12px]'>
      <div className='flex-1'>
        <Skeleton round height={12} />
        <Skeleton
          rows={2}
          wrapClassName='mt-[8px] !w-full !gap-y-[8px]'
          className='!w-full'
          height={14}
        />
      </div>

      <Skeleton width={73} height={73} className='!rounded-[12px]' />
    </div>
  );
};

const NewsTab = ({ keyword, keywordFormat }: NewsTabProps) => {
  const [news, setNews] = useState<ResponseSearchPost | NonNullable<any>>();
  const ref = useRef(null);
  const requestGetNews = useSearchNews({
    manual: true,
    onSuccess: ({ data }: ResponseSearchPost) => {
      setNews((prev: any) => ({
        data: {
          list: [...(prev?.data.list || []), ...data?.list],
          hasNext: data?.hasNext,
          last: data.last,
        },
      }));
    },
    onError: () => setNews({}),
  });

  useEffect(() => {
    if (keyword.trim()) {
      requestGetNews.run({
        keyword: keywordFormat,
      });
    }

    return () => {
      setNews(undefined);
    };
  }, [keyword]);

  useBottomScroll(ref, () => {
    if (news?.data.hasNext && !requestGetNews.loading) {
      requestGetNews.run({
        keyword,
        last: news.data.last,
      });
    }
  });

  return news?.data?.list && news?.data.list.length > 0 ? (
    <div className='flex flex-col gap-y-[16px]' ref={ref}>
      {news?.data?.list.map((item: any) => {
        return (
          <NewsItem
            key={`new-items-${item?.id}`}
            middle={true}
            data={item}
            showComment
            currentLocation='Search seo news tab'
          />
        );
      })}

      {news?.data.hasNext && requestGetNews.loading && <SkeletonLoadingNews />}
    </div>
  ) : (
    <>
      {news && keyword ? (
        <Empty keyword={keyword} />
      ) : (
        <div className='flex min-h-[150px] flex-row items-center justify-center'>
          {/* <Loading /> */}
          <Skeleton className='!h-[290px] !w-full !rounded-[8px]' />
        </div>
      )}
    </>
  );
};

export default NewsTab;
