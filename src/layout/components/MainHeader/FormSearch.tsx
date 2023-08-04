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
import { useGetSearchRecent, useSearchPublic } from '@components/SearchSeo/service';
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
  const { t } = useTranslation('common');
  const { isDesktop, isMobile } = useResponsive();
  const isLogin = !!getAccessToken();

  const searchParams = useSearchParams();
  const search = searchParams.get('keyword') || '';
  const [form] = Form.useForm();
  const ref = React.useRef(null);
  const valueInput = form.getFieldValue('search');

  // Call API
  const { listRecent, runRecent, refreshSearchRecent, loadingSearchRecent } = useGetSearchRecent({
    onSuccess: () => {
      console.log('useGetSearchRecent',listRecent);
    },
  });
  const { data, searchPublic, loading, refresh } = useSearchPublic({
    onSuccess: () => {
      console.log('useSearchPublic',data);
    },
  });

  const [query, setQuery] = React.useState(search);
  const [inputFocus, setInputFocus] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);
  const [showRecent, setShowRecent] = React.useState(false);

  // Remove value input search when refresh open new page
  React.useEffect(() => {
    setQuery(search);
  }, [search]);

  useFocusWithin(ref, {
    onFocus: () => {
      setInputFocus(true);
      setShowRecent(true);
      runRecent();
    },
  });

  useClickAway(() => {
    setInputFocus(false);
    setShowRecent(false);
    setShowPopup(false);
  }, ref);

  // const handleParam =  () => setQuery(form.getFieldValue('search'));

  const handleSubmit = () => {
    router.push({
      pathname: ROUTE_PATH.SEARCHSEO,
      query: { keyword: query, tab: 'post' },
    });
    form.setFieldValue('search', '');
    setInputFocus(false);
    setShowRecent(false);
    setShowPopup(false);
  };

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
      if (value === '') {
        setShowPopup(false);
        // setInputFocus(false);
      } else {
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
    run();
  };

  const companies = data?.data?.companyList?.list;
  const users = data?.data?.customerList?.list;
  const posts = data?.data?.postList?.list;
  const news = data?.data?.newsList?.list;
  const media = data?.data?.listMedia?.list;

  console.log(media,loadingSearchRecent,refresh);

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
                'h-[40px] rounded-[8px] border pl-[36px] pr-[12px] outline-none transition-all duration-300 ease-in-out',
                {
                  'w-[414px] border-[#1F6EAC] bg-[#F7F6F8]': inputFocus && isDesktop,
                  'w-[220px] border-[#EFF2F5] bg-[#EFF2F5]': !inputFocus && isDesktop,
                  'w-full border-[#1F6EAC] bg-[#F7F6F8]': isMobile,
                },
              )}
              placeholder={t('search_uppercase')}
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
              Recent
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
            'absolute left-0 right-0 top-[calc(100%+0px)] z-10 flex max-h-[490px] min-h-[144px] w-full flex-col gap-y-[12px] bg-white px-[16px] py-[24px] desktop:top-[calc(100%+8px)] desktop:rounded-lg',
          )}
        >
          <div className='mb-[16px] mt-[16px] flex flex-col gap-y-[16px]'>
            {companies?.slice(0, 2)?.map((company: any, index: number) => {
              return <CompanyItem key={`company-${index}`} data={company} />;
            })}
          </div>

          <div className='mb-[16px] mt-[16px] flex flex-col gap-y-[16px]'>
            {users?.slice(0, 2)?.map((item: any, index: number) => (
              <UserItem data={item} key={index} />
            ))}
          </div>

          <div className='mt-[16px] flex flex-col'>
            {posts?.slice(0, 2)?.map((post: any) => {
              return (
                <NewsFeed
                  key={`explore-search-${post?.id}`}
                  data={post}
                />
              );
            })}
          </div>

          <div className='my-[16px] flex flex-col gap-y-[12px]'>
            {news?.slice(0, 2)?.map((item: any) => {
              return <NewsItem key={`new-items-${item?.id}`} data={item} />;
            })}
          </div>
        </Fade>
      </div>
    </>
  );
};
export default FormSearch;
