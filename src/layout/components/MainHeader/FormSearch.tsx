import React from 'react';

import { useClickAway, useDebounceFn, useFocusWithin, useRequest } from 'ahooks';
import classNames from 'classnames';
import { router } from 'next/client';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';

import { API_PATH } from '@api/constant';
import { requestCommunity } from '@api/request';
import CompanyItem from '@components/Explore/Search/CompanyItem';
import NewsItem from '@components/Explore/Search/NewsItem';
import UserItem from '@components/Explore/Search/UserItem';
import NewsFeed from '@components/Post/NewsFeed';
import styles from '@components/SearchSeo/index.module.scss';
import {
  useCreateSearch,
  useGetSearchRecent,
  useSearchPublic,
} from '@components/SearchSeo/service';
import { ExploreButton } from '@components/UI/Button';
import Fade from '@components/UI/Fade';
import FormItem from '@components/UI/FormItem';
import { IconSearchWhite } from '@components/UI/Icon/IconSearchWhite';
import Input from '@components/UI/Input';
import Loading from '@components/UI/Loading';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { getAccessToken } from '@store/auth';
import { ROUTE_PATH } from '@utils/common';

const FormSearch = ({ className, isOpenSearch, setIsOpenSearch }: any) => {
  const { t } = useTranslation(['search-seo','common']);
  const { isDesktop, isMobile } = useResponsive();
  const isLogin = !!getAccessToken();

  const searchParams = useSearchParams();
  const search = searchParams.get('keyword') || '';
  const [form] = Form.useForm();
  const ref = React.useRef(null);
  const valueInput = form.getFieldValue('search');

  // Call API
  const { listRecent, runRecent, refreshSearchRecent } = useGetSearchRecent();
  const { data, searchPublic, loading, refresh } = useSearchPublic();

  const [query, setQuery] = React.useState(search);
  const [inputFocus, setInputFocus] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);
  const [showRecent, setShowRecent] = React.useState(false);

  // Remove value input search when refresh open new page
  React.useEffect(() => {
    setQuery(search);
    runRecent();
  }, [search]);

  useFocusWithin(ref, {
    onFocus: () => {
      refreshSearchRecent();
      setInputFocus(true);
      setShowRecent(true);
      const value = form.getFieldValue('search');
      // setQuery(value);
      if (value === '' || value === undefined) {
        // toast('Empty || undefined');
        setShowPopup(false);
      } else {
        // toast('Not Empty');
        setShowPopup(true);
        refresh();
      }
    },
  });

  useClickAway(() => {
    setInputFocus(false);
    setShowRecent(false);
    setShowPopup(false);
  }, ref);

  // const handleParam =  () => setQuery(form.getFieldValue('search'));

  const handleSubmit = () => {
    const value = form.getFieldValue('search');
    setQuery(value);
    const payloads = {
      textSearch: query,
    };
    if (value === '' || value === undefined) {
      setInputFocus(true);
      setShowRecent(true);
      setShowPopup(false);
      setIsOpenSearch(!isOpenSearch);
    } else {
      requestSearch.run(payloads);
      // setIsOpenSearch(!isOpenSearch);
    }
  };

  const requestSearch = useCreateSearch({
    onSuccess: () => {
      // toast(() => <Notification type='success' message='success' />);
      router.push({
        pathname: ROUTE_PATH.SEARCHSEO,
        query: { keyword: query, tab: 'company' },
      });
      // form.setFieldValue('search', '');
      setInputFocus(false);
      setShowRecent(false);
      setShowPopup(false);
    },
    onError: () => {
      // toast(() => <Notification type='error' message='error rooif' />);
    },
  });

  // Set value when onSubmit Form
  const handleOnchange = () => {
    setQuery(form.getFieldValue('search'));
  };

  const removeFormSearch = () => {
    form.setFieldValue('search', '');
    run();
  };

  const useRemoveItemRecent = useRequest(
    (code) => {
      return requestCommunity.delete(API_PATH.PUBLIC_SEARCH_SEO_DELETE(code));
    },
    {
      manual: true,
      onSuccess: () => {
        refreshSearchRecent();
      },
    },
  );
  const removeItemRecent = (code: any) => {
    useRemoveItemRecent.run(code);
  };

  const { run } = useDebounceFn(
    () => {
      const value = form.getFieldValue('search');
      setQuery(value);
      if (value === '' || value === undefined) {
        setShowPopup(false);
        // setInputFocus(false);
        setShowRecent(true);
      } else {
        setShowRecent(false);
        setShowPopup(true);
        setInputFocus(true);
        searchPublic({
          textSearch: value,
        });
      }
    },
    {
      wait: 300,
    },
  );

  const onClickRecent = (data: any) => {
    form.setFieldValue('search', data);
    setQuery(data);
    form.submit();
    isDesktop && form.submit();
    isMobile && form.submit();
  };

  const companies = data?.data?.companyList?.list || [];
  const users = data?.data?.customerList?.list || [];
  const posts = data?.data?.postList?.list || [];
  const news = data?.data?.newsList?.list || [];
  const media = data?.data?.listMedia?.list || [];

  // map api do trả thiếu id
  const newUsers = users?.map(( item:any ) => ({ ...item, id: item.customerId }));

  const companiesL = companies?.length > 0;
  const usersL = users?.length > 0;
  const postsL = posts?.length > 0;
  const newsL = news?.length > 0;
  const mediaL = media?.length > 0;

  return (
    <>
      {isMobile && (
        <>
          <div className='cursor-pointer' onClick={() => setIsOpenSearch(!isOpenSearch)}>
            <img
              src='/static/icons/arrow-left.svg'
              alt='Search icon'
              className='m-auto h-[32px] w-[32px]'
            />
          </div>
        </>
      )}
      <div ref={ref} className={classNames(className)}>
        <Form
          className={classNames('', {
            'w-full': isMobile,
          })}
          form={form}
          onFinish={handleSubmit}
          onValuesChange={run}
          onFieldsChange={handleOnchange}
        >
          <FormItem name='search'>
            <Input
              className={classNames(
                'h-[40px] max-w-full rounded-[8px] border pl-[36px] pr-[12px] outline-none transition-all duration-300 ease-in-out',
                {
                  'w-full border-[#1F6EAC] bg-[#F7F6F8]': inputFocus && isDesktop,
                  'w-full border-[#EFF2F5] bg-[#EFF2F5]': !inputFocus && isDesktop,
                  'w-full border-[#1F6EAC] bg-[#F7F6F8] ': isMobile,
                },
              )}
              placeholder={t('common:searchseo.placeholder')}
              icon={<IconSearchWhite />}
            />
          </FormItem>
        </Form>
        <div className='absolute right-[20px] top-[50%] translate-y-[-50%] desktop:right-[10px]'>
          {isLogin && loading && <Loading />}
        </div>

        {/* Khi nhập input show button close clear data */}
        {!loading && valueInput && (
          <>
            <button
              onClick={removeFormSearch}
              className='absolute right-[10px] top-[50%] flex h-[40px] w-[40px] translate-y-[-50%] items-center justify-center desktop:right-[0px]'
            >
              <img
                src='/static/icons/iconClose.svg'
                alt='Search icon'
                className='m-auto h-[14px] w-[14px]'
              />
            </button>
          </>
        )}
        {/* End Khi nhập input show button close clear data */}

        {/* Show search recent */}
        <Fade
          visible={showRecent && listRecent?.length > 0 && isLogin && !valueInput}
          className={classNames(
            styles.boxShadown,
            'absolute left-0 right-0 top-[calc(100%+0px)] z-10 flex max-h-[490px] min-h-[144px] w-full flex-col gap-y-[12px] bg-white px-[16px] py-[24px] desktop:top-[calc(100%+8px)] desktop:rounded-lg',
          )}
        >
          {listRecent?.length > 0 && (
            <Text type='body-16-semibold' className='leading-5 text-[#0D0D0D]'>
              {t('common:searchseo.txtRecent')}
            </Text>
          )}
          {listRecent?.slice(0, 5)?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className='relative flex cursor-pointer gap-x-[10px] p-[8px] hover:bg-[#F7F6F8]'
              >
                <div
                  className='flex-auto text-[#1F6EAC]'
                  onClick={() => onClickRecent(item?.textSearch)}
                >
                  {item?.textSearch}
                </div>
                <button
                  className='btn__close absolute right-[0px] top-[50%] flex h-[33px] w-[33px] translate-y-[-50%] items-center justify-center'
                  onClick={() => removeItemRecent(item?.id)}
                >
                  <img
                    src='/static/icons/iconClose.svg'
                    alt='Search icon'
                    className='m-auto h-[14px] w-[14px]'
                  />
                </button>
              </div>
            );
          })}
        </Fade>

        {/* Show search result */}
        <Fade
          visible={showPopup}
          className={classNames(
            styles.boxShadown,
            'absolute left-0 right-0 top-[calc(100%+0px)] z-10 flex max-h-[490px] min-h-[144px] w-full flex-col gap-y-[32px] overflow-x-auto bg-white px-[16px] py-[24px] desktop:top-[calc(100%+8px)] desktop:rounded-lg',
          )}
        >
          {!companiesL && !usersL && !postsL && !newsL && !mediaL ? (
            <>
              <Text type='body-16-regular' className='text-center leading-5 text-[#999]'>
                {t('common:searchseo.txtEmpty')} {query}
              </Text>
            </>
          ) : (
            <>
              {companiesL && (
                <div className='flex flex-col gap-y-[16px]'>
                  <Text type='body-20-semibold' className='leading-7 text-[#0D0D0D]'>
                    {t('common:searchseo.tab.company')}
                  </Text>
                  {companies?.slice(0, 3)?.map((company: any, index: number) => {
                    return <CompanyItem key={`company-${index}`} data={company} />;
                  })}
                </div>
              )}
              {usersL && (
                <div className='flex flex-col gap-y-[16px]'>
                  <Text type='body-20-semibold' className='leading-7 text-[#0D0D0D]'>
                    {t('common:searchseo.tab.people')}
                  </Text>
                  {newUsers?.slice(0, 3)?.map((item: any, index: number) => (
                    <UserItem data={item} key={index} />
                  ))}
                </div>
              )}
              {postsL && (
                <div className='flex flex-col'>
                  <Text type='body-20-semibold' className='mb-[16px] leading-7 text-[#0D0D0D]'>
                    {t('common:searchseo.tab.posts')}
                  </Text>
                  {posts?.slice(0, 3)?.map((post: any) => {
                    return <NewsFeed key={`explore-search-${post?.id}`} data={post} />;
                  })}
                </div>
              )}
              {newsL && (
                <div className='flex flex-col gap-y-[16px]'>
                  <Text type='body-20-semibold' className='leading-7 text-[#0D0D0D]'>
                    {t('common:searchseo.tab.news')}
                  </Text>
                  {news?.slice(0, 3)?.map((item: any) => {
                    return <NewsItem key={`new-items-${item?.id}`} data={item} />;
                  })}
                </div>
              )}
              {mediaL && (
                <div className='flex flex-col gap-y-[16px]'>
                  <Text type='body-20-semibold' className='leading-7 text-[#0D0D0D]'>
                    {t('common:searchseo.tab.media')}
                  </Text>
                </div>
              )}
              <ExploreButton className='' onClick={handleSubmit}>
                <Text type='body-14-bold' color='primary-2'>
                  See all results
                </Text>
              </ExploreButton>
            </>
          )}
        </Fade>
        {/* End Show search result */}
      </div>
    </>
  );
};
export default FormSearch;
