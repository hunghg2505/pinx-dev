import React from 'react';

import { useDebounceFn } from 'ahooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';

import { TYPESEARCH } from '@components/Home/service';
import NewsFeed from '@components/Post/NewsFeed';
import FormItem from '@components/UI/FormItem';
import { IconSearchWhite } from '@components/UI/Icon/IconSearchWhite';
import Input from '@components/UI/Input';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';
import { searchTracking, viewTickerInfoTracking } from 'src/mixpanel/mixpanel';

import { useGetPosts } from '../service';

// tracking event view ticker info
const handleTrackingViewTicker = (stockCode: string) => {
  viewTickerInfoTracking(stockCode, 'Search post screen', 'Post', 'Stock');
};

const Post = ({ keyword }: { keyword: any }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [page, setPage] = React.useState<number>(0);
  const [listComapany, setListCompany] = React.useState<any>([]);
  const refInput = React.useRef(null);
  const { posts, run, refresh } = useGetPosts({
    onSuccess: (res: any) => {
      const newPage = page + 1;
      setPage(newPage);
      setListCompany([...listComapany, ...res?.data?.list]);
      searchTracking('post', keyword, res?.data?.totalElements, 'page-search');
    },
  });
  React.useEffect(() => {
    run(keyword);
  }, []);
  const [form] = Form.useForm();
  const { run: search } = useDebounceFn(
    () => {
      const value = form.getFieldValue('search');
      router.push({
        pathname: ROUTE_PATH.SEARCH,
        query: {
          keyword: value,
          type: TYPESEARCH.POST,
        },
      });
      run(value);
    },
    {
      wait: 500,
    },
  );
  // React.useEffect(() => {
  //   window.addEventListener('scroll', loadMore);
  //   return () => {
  //     window.removeEventListener('scroll', loadMore);
  //   };
  // }, [page]);
  // const loadMore = () => {
  //   const heigtBottom = document?.scrollingElement?.scrollHeight || 0;
  //   const heightTop = window.innerHeight + document.documentElement?.scrollTop || 0;
  //   if (Math.floor(heightTop) === heigtBottom) {
  //     run(keyword, page);
  //   }
  // };
  return (
    <>
      <div>
        <Form form={form} onValuesChange={search} initialValues={{ search: keyword }}>
          <FormItem name='search'>
            <Input
              className='h-[40px] w-full rounded-[8px] bg-[#EFF2F5] pl-[36px] pr-[12px] outline-none'
              placeholder={t('are_you_looking_for_something')}
              icon={<IconSearchWhite />}
              ref={refInput}
            />
          </FormItem>
        </Form>
        {posts?.length > 0 ? (
          <div className='mt-[20px]'>
            {posts?.map((post: any) => {
              return (
                <NewsFeed
                  key={`search-post-item-${post?.id}`}
                  data={post}
                  onRefreshList={refresh}
                  isNewFeedExplore={true}
                  onTrackingViewTicker={handleTrackingViewTicker}
                  currentLocation='Search post screen'
                />
              );
            })}
          </div>
        ) : (
          <div className=''>
            <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
            <Text type='body-14-regular' color='neutral-gray' className='text-center'>
              {t('no_post_result')} {keyword ? `${t('found_for')} ${keyword}` : ''}
            </Text>
          </div>
        )}
      </div>
    </>
  );
};
export default Post;
