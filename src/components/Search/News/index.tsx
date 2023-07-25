import React from 'react';

import { useDebounceFn } from 'ahooks';
import { useRouter } from 'next/router';
import Form from 'rc-field-form';

import NewsItem from '@components/Explore/Search/NewsItem';
import { TYPESEARCH } from '@components/Home/service';
import FormItem from '@components/UI/FormItem';
import { IconSearchWhite } from '@components/UI/Icon/IconSearchWhite';
import Input from '@components/UI/Input';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

import { useGetNews } from '../service';

const News = ({ keyword }: { keyword: any }) => {
  const router = useRouter();
  const [page, setPage] = React.useState<number>(0);
  const [listComapany, setListCompany] = React.useState<any>([]);
  const refInput = React.useRef(null);
  const { news, run } = useGetNews({
    onSuccess: (res: any) => {
      const newPage = page + 1;
      setPage(newPage);
      setListCompany([...listComapany, ...res?.data?.list]);
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
          type: TYPESEARCH.NEWS,
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
              placeholder='Are you looking for something?'
              icon={<IconSearchWhite />}
              ref={refInput}
            />
          </FormItem>
        </Form>
        {news?.length > 0 ? (
          <div className='mt-[20px] flex flex-col gap-y-[20px]'>
            {news?.map((item: any, index: number) => {
              return <NewsItem key={`new-${index}`} data={item} />;
            })}
          </div>
        ) : (
          <div className=''>
            <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
            <Text type='body-14-regular' color='neutral-gray' className='text-center'>
              No news result {keyword ? `found for ${keyword}` : ''}
            </Text>
          </div>
        )}
      </div>
    </>
  );
};
export default News;
