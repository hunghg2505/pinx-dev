import React, { useRef } from 'react';

import { useClickAway, useDebounceFn, useFocusWithin, useRequest } from 'ahooks';
import classNames from 'classnames';
import { router } from 'next/client';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';
import { toast } from 'react-hot-toast';

import { API_PATH } from '@api/constant';
import { requestCommunity } from '@api/request';
import CompanyItem from '@components/Explore/Search/CompanyItem';
import NewsItem from '@components/Explore/Search/NewsItem';
import UserItem from '@components/Explore/Search/UserItem';
import NewsFeed from '@components/Post/NewsFeed';
import styles from '@components/SearchSeo/index.module.scss';
import MediaItem from '@components/SearchSeo/MediaItem';
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
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';
import { removeHashTag } from '@utils/removeHashTag';

const FormSearch = ({ className, isOpenSearch, setIsOpenSearch }: any) => {
  const { t } = useTranslation(['search-seo', 'common']);
  const { isDesktop, isMobile } = useResponsive();
  const { isLogin } = useAuth();
  const searchParams = useSearchParams();
  const search = searchParams.get('keyword') || '';
  const [form] = Form.useForm();
  const ref = React.useRef(null);
  const searchResultPopupRef = useRef<HTMLDivElement | null>(null);
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
    form.setFieldValue('search', search);
    runRecent();
  }, [search]);

  useFocusWithin(ref, {
    onFocus: () => {
      refresh();
      refreshSearchRecent();
      setInputFocus(true);
      setShowRecent(true);
      const value = form.getFieldValue('search');
      if (value === '' || value === undefined) {
        setShowPopup(false);
      } else {
        setShowPopup(true);
      }
    },
  });

  useClickAway(() => {
    setInputFocus(false);
    setShowRecent(false);
  }, ref);

  useClickAway((e: any) => {
    const main: any = document?.querySelector('main');
    if (main.contains(e.srcElement)) {
      setShowPopup(false);
    }
  }, searchResultPopupRef);

  const handleSubmit = async () => {
    const value = await form.getFieldValue('search')?.trim().replaceAll(/\s\s+/g, ' ');
    setQuery(value);
    cancel();
    if (value === '' || value === undefined) {
      setInputFocus(true);
      setShowRecent(true);
      setShowPopup(false);
    } else {
      const payloads = {
        textSearch: query.trim(),
      };
      requestSearch.run(payloads);
    }
  };

  const requestSearch = useCreateSearch({
    onSuccess: () => {
      router.push({
        pathname: ROUTE_PATH.SEARCHSEO,
        query: { keyword: query, tab: 'company' },
      });
      setInputFocus(false);
      setShowRecent(false);
      setShowPopup(false);
    },
    onError: (e: any) => {
      toast(() => <Notification type='error' message={e?.error} />);
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

  const { run, cancel } = useDebounceFn(
    () => {
      const value = form.getFieldValue('search')?.trim().replaceAll(/\s\s+/g, ' ');
      setQuery(value);
      if (value === '' || value === undefined || value.length < 2) {
        setShowPopup(false);
        setShowRecent(true);
      } else {
        setShowRecent(false);
        setShowPopup(true);
        setInputFocus(true);
        refresh();
        searchPublic({
          textSearch: removeHashTag(value),
        });
      }
    },
    {
      wait: 300,
    },
  );

  const onClickRecent = async (data: any) => {
    await form.setFieldValue('search', data);
    setQuery(data);
    form.submit();
    isDesktop && form.submit();
    isMobile && form.submit();
  };

  const companies = data?.data?.companyList?.list || [];
  const users = data?.data?.customerList?.list || [];
  const posts = data?.data?.postList?.list || [];
  const news = data?.data?.newsList?.list || [];
  const media = data?.data?.listMedia || [];
  const image = data?.data?.listImage || [];

  // map api do trả thiếu id
  const newUsers = users?.map((item: any) => ({ ...item, id: item.customerId }));

  const companiesL = companies?.length > 0;
  const usersL = users?.length > 0;
  const postsL = posts?.length > 0;
  const newsL = news?.length > 0;
  const mediaL = media?.length > 0;

  // Lọc loại bỏ data ko có hình ảnh (Yêu cầu của BA)
  const mediaFilter = media?.filter(
    (item: any) =>
      item?.post?.metadataList[0]?.images[0]?.length > 0 ||
      item?.post?.metadataList[0]?.url?.length > 0,
  );
  const imageFilter = image?.filter(
    (item: any) => item?.post?.seoMetadata?.imageSeo?.urlImage?.length > 0,
  );

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
      <div className={classNames(className)} ref={searchResultPopupRef}>
        <div ref={ref}>
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
              'absolute left-0 right-0 top-[calc(100%+0px)] z-10 flex max-h-[490px] w-full flex-col gap-y-[12px] bg-white px-[16px] py-[24px] desktop:top-[calc(100%+8px)] desktop:rounded-lg',
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
        </div>
        {/* Show search result */}
        <Fade
          visible={showPopup}
          className={classNames(
            styles.boxShadown,
            'absolute left-0 right-0 top-[calc(100%+0px)] z-10 flex max-h-[490px] w-full flex-col gap-y-[32px] overflow-x-auto bg-white px-[16px] py-[24px] desktop:top-[calc(100%+8px)] desktop:rounded-lg',
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
                    return (
                      <CompanyItem
                        key={`company-${index}`}
                        data={company}
                        setShowPopup={setShowPopup}
                      />
                    );
                  })}
                </div>
              )}
              {usersL && (
                <div className='flex flex-col gap-y-[16px]'>
                  <Text type='body-20-semibold' className='leading-7 text-[#0D0D0D]'>
                    {t('common:searchseo.tab.people')}
                  </Text>
                  {newUsers?.slice(0, 3)?.map((item: any, index: number) => (
                    <UserItem
                      data={item}
                      key={index}
                      setShowPopup={setShowPopup}
                      refreshSearch={refresh}
                    />
                  ))}
                </div>
              )}
              {postsL && (
                <div className='flex flex-col'>
                  <Text type='body-20-semibold' className='mb-[16px] leading-7 text-[#0D0D0D]'>
                    {t('common:searchseo.tab.posts')}
                  </Text>
                  {posts?.slice(0, 3)?.map((post: any) => {
                    return (
                      <NewsFeed
                        key={`explore-search-${post?.id}`}
                        data={post}
                        isNewFeedExplore={false}
                        hiddenComment={true}
                        setShowPopup={setShowPopup}
                        refreshSearch={refresh}
                      />
                    );
                  })}
                </div>
              )}
              {newsL && (
                <div className='flex flex-col gap-y-[16px]'>
                  <Text type='body-20-semibold' className='leading-7 text-[#0D0D0D]'>
                    {t('common:searchseo.tab.news')}
                  </Text>
                  {news?.slice(0, 3)?.map((item: any) => {
                    return (
                      <NewsItem
                        key={`new-items-${item?.id}`}
                        data={item}
                        setShowPopup={setShowPopup}
                        showComment
                      />
                    );
                  })}
                </div>
              )}
              {(imageFilter?.length > 0 || mediaFilter?.length > 0) && (
                <div className='flex flex-col gap-y-[16px]'>
                  <Text type='body-20-semibold' className='leading-7 text-[#0D0D0D]'>
                    {t('common:searchseo.tab.media')}
                  </Text>
                  <div className='grid grid-cols-1 gap-[16px] tablet:grid-cols-2'>
                    {imageFilter?.slice(0, 3)?.map((item: any) => {
                      return (
                        <MediaItem
                          key={`media-item-${item?.id}`}
                          data={item}
                          type='image'
                          setShowPopup={setShowPopup}
                        />
                      );
                    })}
                    {mediaFilter?.slice(0, 3)?.map((item: any) => {
                      return (
                        <MediaItem
                          key={`media-item-${item?.id}`}
                          data={item}
                          setShowPopup={setShowPopup}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
              <ExploreButton className='' onClick={handleSubmit}>
                <Text type='body-14-bold' color='primary-2'>
                  {t('common:searchseo.txtBtnAll')}
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
