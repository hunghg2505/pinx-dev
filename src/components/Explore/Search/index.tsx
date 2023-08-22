import React, { useRef } from 'react';

import { useClickAway, useDebounceFn, useFocusWithin } from 'ahooks';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';

import { TYPESEARCH } from '@components/Home/service';
import NewsFeed from '@components/Post/NewsFeed';
import { ExploreButton } from '@components/UI/Button';
import Fade from '@components/UI/Fade';
import FormItem from '@components/UI/FormItem';
import { IconSearchWhite } from '@components/UI/Icon/IconSearchWhite';
import Input from '@components/UI/Input';
import Loading from '@components/UI/Loading';
import Text from '@components/UI/Text';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';

import CompanyItem from './CompanyItem';
import NewsItem from './NewsItem';
import UserItem from './UserItem';
import { useGetPopular, useGetSearchRecent, useSearchPublic } from '../service';

const Search = (props: any, ref: any) => {
  const { t } = useTranslation('theme');
  const refInput = React.useRef(null);
  const [form] = Form.useForm();
  const [showPopup, setShowPopup] = React.useState(false);
  const [showRecent, setShowRecent] = React.useState(false);
  const searchResultPopupRef = useRef<HTMLDivElement | null>(null);
  const { isLogin } = useAuth();

  const { popular } = useGetPopular();
  const { listRecent, refreshSearchRecent } = useGetSearchRecent();
  const router = useRouter();

  useFocusWithin(refInput, {
    onFocus: () => {
      setShowRecent(true);
      const value = form.getFieldValue('search');
      if (value) {
        run();
      }
    },
  });

  useClickAway(() => {
    setShowRecent(false);
  }, refInput);

  const { search, data, loading, mutate } = useSearchPublic({
    onSuccess: () => {
      refreshSearchRecent();
    },
  });
  console.log('🚀 ~ file: index.tsx:58 ~ Search ~ data:', data);

  const { run } = useDebounceFn(
    () => {
      const value = form.getFieldValue('search');
      if (value === '') {
        setShowPopup(false);
      } else {
        setShowPopup(true);
      }
      search({
        keyword: value,
        searchType: TYPESEARCH.ALL,
      });
    },
    {
      wait: 500,
    },
  );

  React.useImperativeHandle(ref, () => ({
    onKeyDown: (data: any) => {
      form.setFieldValue('search', data);
      run();
    },
  }));

  const onClickRecent = (data: any) => {
    form.setFieldValue('search', data);
    run();
  };

  const valueInput = form.getFieldValue('search');
  const companies = data?.data?.companies;
  const news = data?.data?.news;
  const posts = data?.data?.posts;
  console.log('🚀 ~ file: index.tsx:94 ~ Search ~ posts:', posts);
  const users = data?.data?.users;

  const onRemoveData = (postId: any) => () => {
    // mutate
    mutate({
      data: {
        ...data.data,
        posts: posts?.filter((item: any) => item?.id !== postId),
      },
    });
  };

  const onShowMore = (type: string) => {
    router.push({
      pathname: ROUTE_PATH.SEARCH,
      query: {
        keyword: valueInput,
        type,
      },
    });
  };

  useClickAway((e: any) => {
    const main: any = document?.querySelector('main');

    if (main.contains(e.srcElement)) {
      setShowPopup(false);
    }
  }, searchResultPopupRef);

  return (
    <>
      <div
        className={classNames('relative z-[100] mr-[12px] mt-[16px] w-full ')}
        ref={searchResultPopupRef}
      >
        <div ref={refInput}>
          <Form form={form} onValuesChange={run}>
            <FormItem name='search'>
              <Input
                className='h-[40px] w-full rounded-[8px] bg-[#EFF2F5] pl-[36px] pr-[12px] outline-none'
                placeholder={t('common:are_you_looking_for_something')}
                icon={<IconSearchWhite />}
              />
            </FormItem>
          </Form>
          {showRecent && !valueInput && (
            <div className='z-3 absolute left-0 top-[50px] w-full rounded-[8px] bg-[#FFF] px-[16px] py-[24px] [box-shadow:0px_9px_28px_8px_rgba(0,_0,_0,_0.05),_0px_6px_16px_0px_rgba(0,_0,_0,_0.08),_0px_3px_6px_-4px_rgba(0,_0,_0,_0.12)]'>
              {isLogin && (
                <>
                  <Text type='body-14-semibold' color='neutral-black'>
                    {t('common:recent')}
                  </Text>
                  <div className='mb-[20px] mt-[12px] flex flex-row flex-wrap gap-[16px]'>
                    {listRecent?.slice(0, 5)?.map((item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className='cursor-pointer rounded-[1000px] bg-[#EEF5F9] px-[12px] py-[4px]'
                          onClick={() => onClickRecent(item?.keyword)}
                        >
                          <Text type='body-14-regular' color='primary-2'>
                            {item?.keyword}
                          </Text>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              <Text type='body-14-semibold' color='neutral-black'>
                {t('popular')}
              </Text>
              <div className='mt-[12px] flex flex-row flex-wrap gap-[16px]'>
                {popular?.slice(0, 6)?.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className='cursor-pointer rounded-[1000px] bg-[#EEF5F9] px-[12px] py-[4px]'
                      onClick={() => onClickRecent(item?.keyword)}
                    >
                      <Text type='body-14-regular' color='primary-2'>
                        {item?.keyword}
                      </Text>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className='relative'>
          <Fade
            visible={showPopup}
            className='z-22 absolute left-0 top-[100%] mt-[10px] w-full  rounded-[12px] bg-[#ffffff] px-[16px] [box-shadow:0px_9px_28px_8px_rgba(0,_0,_0,_0.05),_0px_6px_16px_0px_rgba(0,_0,_0,_0.08),_0px_3px_6px_-4px_rgba(0,_0,_0,_0.12)] galaxy-max:px-[12px] '
          >
            <div className='mt-[24px]'>
              <Text type='body-20-semibold' className='galaxy-max:text-[18px]' color='neutral-1'>
                {t('company')}
              </Text>
              {loading && <Loading />}
              {companies?.length > 0 ? (
                <>
                  <div className='mb-[16px] mt-[16px] flex flex-col gap-y-[16px]'>
                    {[...companies]?.slice(0, 5)?.map((company: any, index: number) => {
                      return <CompanyItem key={`company-${index}`} data={company} />;
                    })}
                  </div>
                  {companies?.length > 5 && (
                    <ExploreButton onClick={() => onShowMore(TYPESEARCH.STOCK)}>
                      <Text type='body-14-bold' color='primary-2'>
                        {t('show_more')}
                      </Text>
                    </ExploreButton>
                  )}
                </>
              ) : (
                <Text
                  type='body-14-regular'
                  color='neutral-4'
                  className='mt-[16px] galaxy-max:text-[12px] tablet:mt-[2px]'
                >
                  {t('no_company_result_found_for')} {valueInput}
                </Text>
              )}
            </div>
            <div className='mt-[32px] galaxy-max:mt-[26px]'>
              <Text type='body-20-semibold' className='galaxy-max:text-[18px]' color='neutral-1'>
                {t('people')}
              </Text>
              {loading && <Loading />}
              {users?.length > 0 ? (
                <>
                  <div className='mb-[16px] mt-[16px] flex flex-col gap-y-[16px]'>
                    {[...users]?.splice(0, 5)?.map((item: any, index: number) => (
                      <UserItem data={item} key={index} />
                    ))}
                  </div>
                  {users?.length > 5 && (
                    <ExploreButton onClick={() => onShowMore(TYPESEARCH.FRIEND)}>
                      <Text type='body-14-bold' color='primary-2'>
                        {t('show_more')}
                      </Text>
                    </ExploreButton>
                  )}
                </>
              ) : (
                <Text
                  type='body-14-regular'
                  color='neutral-4'
                  className='mt-[16px] tablet:mt-[2px]'
                >
                  {t('no_people_result_found_for')} {valueInput}
                </Text>
              )}
            </div>
            <div className='mt-[32px] galaxy-max:mt-[26px]'>
              <Text type='body-20-semibold' className='galaxy-max:text-[18px]' color='neutral-1'>
                {t('posts')}
              </Text>
              {loading && <Loading />}
              {posts?.length > 0 ? (
                <>
                  <div className='mt-[16px] flex flex-col'>
                    {[...posts]?.splice(0, 3)?.map((post: any) => {
                      return (
                        <NewsFeed
                          key={`explore-search-${post?.id}`}
                          data={post}
                          onRemoveData={onRemoveData(post?.id)}
                          isNewFeedExplore={true}
                        />
                      );
                    })}
                  </div>
                  {posts?.length > 3 && (
                    <ExploreButton onClick={() => onShowMore(TYPESEARCH.POST)}>
                      <Text type='body-14-bold' color='primary-2'>
                        {t('exploring_more_posts')}
                      </Text>
                    </ExploreButton>
                  )}
                </>
              ) : (
                <Text
                  type='body-14-regular'
                  color='neutral-4'
                  className='mt-[16px] tablet:mt-[2px]'
                >
                  {t('no_post_result_found_for')} {valueInput}
                </Text>
              )}
            </div>
            <div className='mb-[24px] mt-[32px]'>
              <Text type='body-20-semibold' color='neutral-1'>
                {t('news')}
              </Text>
              {loading && <Loading />}
              {news?.length > 0 ? (
                <>
                  <div className='my-[16px] flex flex-col gap-y-[12px]'>
                    {[...news]?.splice(0, 3)?.map((item: any) => {
                      return <NewsItem key={`new-items-${item?.id}`} data={item} />;
                    })}
                  </div>
                  {news?.length > 3 && (
                    <ExploreButton onClick={() => onShowMore(TYPESEARCH.NEWS)}>
                      <Text type='body-14-bold' color='primary-2'>
                        {t('exploring_more_news')}
                      </Text>
                    </ExploreButton>
                  )}
                </>
              ) : (
                <Text
                  type='body-14-regular'
                  color='neutral-4'
                  className='mt-[16px] tablet:mt-[2px]'
                >
                  {t('no_news_result_found_for')} {valueInput}
                </Text>
              )}
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
};
export default React.forwardRef(Search);
