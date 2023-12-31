import React, { useRef } from 'react';

import { useClickAway, useDebounceFn, useFocusWithin, useRequest, clearCache } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';
import { toast } from 'react-hot-toast';

import { PUBLIC_SEARCH_SEO_DELETE } from '@api/constant';
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
import { useLogin } from '@store/auth/hydrateAuth';
import { searchSeoAtom } from '@store/searchSeo/searchSeo';
import { removeSpecialCharacter } from '@utils/removeSpecialChar';
import { SEARCHSEO } from 'src/constant/route';
import {
  getMoreInfoTracking,
  searchTracking,
  viewStockListTracking,
  viewTickerInfoTracking,
} from 'src/mixpanel/mixpanel';

import styles1 from './index.module.scss';

const handleTrackingViewStockList = () => {
  viewStockListTracking('List company', '', 'Search seo', 'Header in layout');
};

// tracking event view ticker info
const handleTrackingViewStockInfo = (stockCode: string, location: string) => {
  viewTickerInfoTracking(stockCode, 'Search seo box', location, 'Stock');
};

// tracking event get more info
const handleTrackingGetMoreInfo = (infoGr: string, infoDetail: string) => {
  getMoreInfoTracking('Search seo box', infoGr, infoDetail);
};

const FormSearch = ({ isOpenSearch, setIsOpenSearch }: any) => {
  const { t } = useTranslation(['search-seo', 'common']);
  const { isDesktop, isMobile } = useResponsive();
  const { isLogin } = useLogin();
  const searchParams = useSearchParams();
  const search = searchParams.get('keyword') || '';
  const [form] = Form.useForm();
  const ref = React.useRef(null);
  const refForm = React.useRef(null);
  const searchResultPopupRef = useRef<HTMLDivElement | null>(null);
  const valueInput = form.getFieldValue('search');
  const router = useRouter();

  const [checkRouter, setCheckRouter] = React.useState(router.pathname || '');

  React.useEffect(() => {
    if (router.pathname !== checkRouter) {
      setCheckRouter(router.pathname);
      setSearchSeo(false);
    }
  }, [router.pathname]);

  // Call API
  const { listRecent, runRecent, refreshSearchRecent } = useGetSearchRecent();
  const {
    data,
    run: searchPublic,
    loading,
    refresh,
    mutate,
  } = useSearchPublic({
    onSuccess: (res, params) => {
      // tracking search event
      const total = Object.keys(res?.data)?.reduce((total, key) => {
        const totalRes = res?.data?.[key]
          ? res?.data?.[key]?.totalElements || res?.data?.[key]?.list?.length
          : 0;
        total += totalRes;

        return total;
      }, 0);

      const value = removeSpecialCharacter(params?.[0]?.textSearch);

      if (value) {
        searchTracking(value, '', total, 'Search seo box');
      }
    },
  });
  const [inputFocus, setInputFocus] = React.useState(false);
  const [searchSeo, setSearchSeo] = useAtom(searchSeoAtom);
  // const [showRecent, setShowRecent] = React.useState(false);
  const [showRecent] = React.useState(false);

  // Remove value input search when refresh open new page
  React.useEffect(() => {
    runRecent();
    form.setFieldsValue({
      search,
    });
  }, [search]);

  useFocusWithin(ref, {
    onFocus: () => {
      refreshSearchRecent();
      setInputFocus(true);
      // setShowRecent(true);
      const value = form.getFieldValue('search');
      if (value === '' || value === undefined) {
        setSearchSeo(false);
      } else {
        setSearchSeo(true);
        refresh();
        run();
      }
    },
  });

  useClickAway(() => {
    setInputFocus(false);
  }, ref);

  useClickAway((e: any) => {
    const main: any = document?.querySelector('main');
    if (main.contains(e.srcElement)) {
      setSearchSeo(false);
    }
  }, searchResultPopupRef);

  const handleSubmit = async () => {
    const value = form.getFieldValue('search')?.trim().replaceAll(/\s\s+/g, ' ');
    cancel();
    if (value === '' || value === undefined) {
      setInputFocus(true);
      setSearchSeo(false);
    } else {
      const payloads = {
        textSearch: value,
      };
      requestSearch.run(payloads);
    }
  };

  const requestSearch = useCreateSearch({
    onSuccess: () => {
      const value = form.getFieldValue('search');
      router.push({
        pathname: SEARCHSEO,
        query: { keyword: value },
      });
      clearCache('data-pin-post');
      setInputFocus(false);
      setSearchSeo(false);
    },
    onError: (e: any) => {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const removeFormSearch = () => {
    form.setFieldValue('search', '');
    run();
  };

  const useRemoveItemRecent = useRequest(
    (code) => {
      return requestCommunity.delete(PUBLIC_SEARCH_SEO_DELETE(code));
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
      if (value === '' || value === undefined) {
        setSearchSeo(false);
      } else {
        setSearchSeo(true);
        setInputFocus(true);
        refresh();
        clearCache('search-seo');
        searchPublic({
          textSearch: removeSpecialCharacter(value),
        });
      }
    },
    {
      wait: 300,
    },
  );

  const onClickRecent = (data: any) => {
    form.setFieldValue('search', data);
    form.submit();
  };
  const onRemoveData = (postId: any) => () => {
    // mutate
    mutate({
      data: {
        ...data.data,
        postList: {
          ...data.data.postList,
          list: posts?.filter((item: any) => item?.id !== postId),
        },
      },
    });
  };

  const companies = data?.data?.companyList?.list || [];
  const users = data?.data?.customerList?.list || [];
  const posts = data?.data?.postList?.list || [];
  const news = data?.data?.newsList?.list || [];
  const listMedia = data?.data?.listMediaAndImageSeo?.list;
  const media = listMedia?.map((item: any) => {
    return {
      type: 'media',
      timeString: item.timeString,
      ...item,
    };
  });

  // map api do trả thiếu id
  const newUsers = users?.map((item: any) => {
    return {
      id: item.customerId,
      ...item,
    };
  });
  const companiesL = companies?.length > 0;
  const usersL = users?.length > 0;
  const postsL = posts?.length > 0;
  const newsL = news?.length > 0;
  const mediaL = media?.length > 0;

  let fillterMediaSort: any = [];

  if (mediaL) {
    fillterMediaSort = [...media];
  }

  const onSeeMore = (tab: string) => {
    setSearchSeo(false);
    const value = form.getFieldValue('search');
    router.push({
      pathname: SEARCHSEO,
      query: { keyword: value, tab },
    });
  };
  const refreshSearch = () => {
    clearCache('search-seo');
    refresh();
  };
  return (
    <div
      className={classNames('relative flex w-full items-center transition-all', {
        [styles1.formSearch]: isOpenSearch,
        [styles1.formSearchHide]: !isOpenSearch,
      })}
    >
      <div
        className='w-[60px] cursor-pointer laptop:hidden'
        onClick={() => setIsOpenSearch(!isOpenSearch)}
      >
        <img
          src='/static/icons/arrow-left.svg'
          alt='Search icon'
          className='m-auto h-[32px] w-[32px]'
        />
      </div>

      <div className='w-full laptop:relative' ref={searchResultPopupRef}>
        <div className='absolute right-[20px] top-[50%] z-10 translate-y-[-50%] laptop:right-[10px]'>
          {isLogin && loading && (companiesL || usersL || postsL || newsL || mediaL) && <Loading />}
        </div>

        {/* Khi nhập input show button close clear data */}
        {!loading && valueInput && (
          <>
            <button
              onClick={removeFormSearch}
              className='absolute right-[10px] top-[50%] z-10 flex h-[40px] w-[40px] translate-y-[-50%] items-center justify-center laptop:right-0'
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
        <div>
          <Form
            ref={refForm}
            className={classNames('pr-[10px] laptop:pr-0', {
              'w-full': isMobile,
            })}
            form={form}
            onFinish={handleSubmit}
            onValuesChange={run}
            // onFieldsChange={handleOnchange}
          >
            <FormItem name='search'>
              <Input
                ref={ref}
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
                    className='mr-[32px] flex-auto text-[#1F6EAC]'
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

          <Fade
            visible={searchSeo}
            className={classNames(
              styles.boxShadown,
              'absolute left-0 right-0 top-[calc(100%+0px)] z-10 flex max-h-[490px] w-full flex-col gap-y-[32px] overflow-x-auto bg-white px-[16px] py-[24px] desktop:top-[calc(100%+8px)] desktop:rounded-lg',
            )}
          >
            {loading && !companiesL && !usersL && !postsL && !newsL && !mediaL && (
              <Loading className='mx-auto' />
            )}
            {!companiesL && !usersL && !postsL && !newsL && !mediaL && !loading ? (
              <>
                <Text type='body-16-regular' className='text-center leading-5 text-[#999]'>
                  {t('common:searchseo.txtEmpty')} {form.getFieldValue('search')}
                </Text>
              </>
            ) : (
              <>
                {companiesL && (
                  <>
                    <div className='flex flex-col gap-y-[16px]'>
                      <Text type='body-20-semibold' className='leading-7 text-[#0D0D0D]'>
                        {t('common:searchseo.tab.company')}
                      </Text>
                      {companies?.slice(0, 3)?.map((company: any, index: number) => {
                        return (
                          <CompanyItem
                            key={`company-${index}`}
                            data={company}
                            // setShowPopup={setSearchSeo}
                            isSearchSeo
                            onTrackingEventViewStockInfo={(stockCode) =>
                              handleTrackingViewStockInfo(stockCode, 'List company')
                            }
                          />
                        );
                      })}
                    </div>
                    {companies?.length > 3 && (
                      <ExploreButton
                        className='-mt-[10px]'
                        onClick={() => {
                          onSeeMore('company');
                          handleTrackingViewStockList();
                          handleTrackingGetMoreInfo('Company', 'List company');
                        }}
                      >
                        <Text type='body-14-bold' color='primary-2'>
                          {t('common:searchseo.txtBtnAll')}
                        </Text>
                      </ExploreButton>
                    )}
                  </>
                )}

                {usersL && (
                  <>
                    <div className='flex flex-col gap-y-[16px]'>
                      <Text type='body-20-semibold' className='leading-7 text-[#0D0D0D]'>
                        {t('common:searchseo.tab.people')}
                      </Text>
                      {newUsers?.slice(0, 3)?.map((item: any, index: number) => (
                        <UserItem
                          data={item}
                          key={index}
                          // setShowPopup={setSearchSeo}
                          refreshSearch={refresh}
                        />
                      ))}
                    </div>
                    {users?.length > 3 && (
                      <ExploreButton
                        className='-mt-[10px]'
                        onClick={() => {
                          onSeeMore('people');
                          handleTrackingGetMoreInfo('User', 'List user');
                        }}
                      >
                        <Text type='body-14-bold' color='primary-2'>
                          {t('common:searchseo.txtBtnAll')}
                        </Text>
                      </ExploreButton>
                    )}
                  </>
                )}

                {postsL && (
                  <>
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
                            // setShowPopup={setSearchSeo}
                            refreshSearch={refreshSearch}
                            isSearchSeoBox={true}
                            onTrackingViewTicker={(stockCode) =>
                              handleTrackingViewStockInfo(stockCode, 'Post')
                            }
                            onRemoveData={onRemoveData(post.id)}
                            currentLocation='Search seo box'
                          />
                        );
                      })}
                    </div>
                    {posts?.length > 3 && (
                      <ExploreButton
                        className='-mt-[10px]'
                        onClick={() => {
                          onSeeMore('posts');
                          handleTrackingGetMoreInfo('Post', 'List post');
                        }}
                      >
                        <Text type='body-14-bold' color='primary-2'>
                          {t('common:searchseo.txtBtnAll')}
                        </Text>
                      </ExploreButton>
                    )}
                  </>
                )}

                {newsL && (
                  <>
                    <div className='flex flex-col gap-y-[16px]'>
                      <Text type='body-20-semibold' className='leading-7 text-[#0D0D0D]'>
                        {t('common:searchseo.tab.news')}
                      </Text>
                      {news?.slice(0, 3)?.map((item: any) => {
                        return (
                          <NewsItem
                            key={`new-items-${item?.id}`}
                            data={item}
                            // setShowPopup={setSearchSeo}
                            showComment
                            isForceNavigate
                            currentLocation='Search seo box'
                          />
                        );
                      })}
                    </div>
                    {news?.length > 3 && (
                      <ExploreButton
                        className='-mt-[10px]'
                        onClick={() => {
                          onSeeMore('news');
                          handleTrackingGetMoreInfo('News', 'List news');
                        }}
                      >
                        <Text type='body-14-bold' color='primary-2'>
                          {t('common:searchseo.txtBtnAll')}
                        </Text>
                      </ExploreButton>
                    )}
                  </>
                )}

                {fillterMediaSort?.length > 0 && (
                  <>
                    <div className='flex flex-col gap-y-[16px]'>
                      <Text type='body-20-semibold' className='leading-7 text-[#0D0D0D]'>
                        {t('common:searchseo.tab.media')}
                      </Text>
                      <div className='grid grid-cols-1 gap-[16px] tablet:grid-cols-2'>
                        {fillterMediaSort?.slice(0, 4)?.map((item: any) => {
                          return (
                            <MediaItem
                              key={`media-item-${item?.id}`}
                              data={item}
                              type={item?.type}
                              // setShowPopup={setSearchSeo}
                              onTrackingViewTicker={(stockCode) =>
                                handleTrackingViewStockInfo(stockCode, 'Media')
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                    {fillterMediaSort?.length > 4 && (
                      <ExploreButton
                        className='-mt-[10px]'
                        onClick={() => {
                          onSeeMore('media');
                          handleTrackingGetMoreInfo('Media', 'List media');
                        }}
                      >
                        <Text type='body-14-bold' color='primary-2'>
                          {t('common:searchseo.txtBtnAll')}
                        </Text>
                      </ExploreButton>
                    )}
                  </>
                )}
              </>
            )}
          </Fade>
        </div>
      </div>
    </div>
  );
};
export default FormSearch;
