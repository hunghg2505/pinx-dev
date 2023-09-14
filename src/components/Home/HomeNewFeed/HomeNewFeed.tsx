import React, { useEffect, useMemo } from 'react';

import { clearCache, useUpdateEffect } from 'ahooks';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import HomeFeedFilter from '@components/Home/HomeNewFeed/ModalFilter';
import TabMobile from '@components/Home/HomeNewFeed/TabMobile';
import UserPosting from '@components/Home/UserPosting/UserPosting';
import NewsFeedSkeleton from '@components/Post/NewsFeed/NewsFeedSkeleton';
import { IPost } from '@components/Post/service';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import useObserver from '@hooks/useObserver';
import { useResponsive } from '@hooks/useResponsive';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { popupStatusAtom } from '@store/popup/popup';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { usePostHomePage } from '@store/postHomePage/postHomePage';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { ROUTE_PATH, getQueryFromUrl } from '@utils/common';
import { ViewTickerInfo, ViewWatchlist } from '@utils/dataLayer';

import SuggestionPeople from './SuggestionPeople';
import { FILTER_TYPE } from '../ModalFilter';
import { useGetPinedPost, useGetWatchList } from '../service';

const ListTheme = dynamic(() => import('@components/Home/ListTheme'), {
  ssr: false,
});
const PinPost = dynamic(() => import('@components/Home/HomeNewFeed/PinPost'), {
  ssr: false,
  loading: () => (
    <>
      <NewsFeedSkeleton />
      <NewsFeedSkeleton />
      <NewsFeedSkeleton />
    </>
  ),
});
const Trending = dynamic(() => import('../Trending'), {
  ssr: false,
});
const Influencer = dynamic(() => import('../People/Influencer'), {
  ssr: false,
});

const NewsFeed = dynamic(() => import('../../Post/NewsFeed'), {
  ssr: false,
});

// tracking event view ticker info
const handleTrackingViewTicker = (stockCode: string, locationDetail: string) => {
  ViewTickerInfo(stockCode, 'Home screen', locationDetail, 'Stock');
};

const HomeNewFeed = () => {
  const { t } = useTranslation('home');
  const router = useRouter();
  const { run: initUserProfile } = useProfileInitial();
  const { pinedPost, refresh, loading } = useGetPinedPost();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const [postDetailStatus] = useAtom(postDetailStatusAtom);
  const { userType, isReadTerms } = useUserLoginInfo();
  const { isMobile } = useResponsive();
  // socket.on('connect', requestJoinIndex);
  const filterType = useMemo(() => router?.query?.filterType, [router?.query?.filterType]);

  const { watchList } = useGetWatchList();
  const isHaveStockWatchList = !!(watchList?.[0]?.stocks?.length > 0);
  const [selectTab, setSelectTab] = React.useState<string>('2');

  const { refLastElement } = useObserver();
  const { loadingPosts, dataPosts, run, runAsync, mutate, initialHomePostData } = usePostHomePage();
  const { firstPost, fourPost, postsNext } = useMemo(() => {
    return {
      firstPost: dataPosts?.list?.[0],
      fourPost: dataPosts?.list?.slice(1, 4),
      postsNext: dataPosts?.list?.slice(5),
    };
  }, [dataPosts]);
  useEffect(() => {
    const scrollPosition = globalThis?.sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo({ left: 0, top: Number.parseInt(scrollPosition, 10), behavior: 'smooth' });
      globalThis?.sessionStorage.removeItem('scrollPosition');
    }
  }, []);
  useUpdateEffect(() => {
    const query: any = getQueryFromUrl();
    clearCache('data-pin-post');
    run('', query?.filterType || FILTER_TYPE.MOST_RECENT);
  }, [filterType]);
  React.useEffect(() => {
    if (postDetailStatus?.isRefreshHome) {
      initialHomePostData();
    }
  }, [postDetailStatus?.isRefreshHome]);
  useEffect(() => {
    if (isHaveStockWatchList) {
      setSelectTab('1');
    }
  }, [isHaveStockWatchList]);

  useEffect(() => {
    if (!!userType && !isReadTerms) {
      setPopupStatus({
        ...popupStatus,
        popupLoginTerms: true,
      });
    }
    initUserProfile();
  }, [userType, isReadTerms]);

  const serviceLoadMorePost = async () => {
    if (!dataPosts?.nextId || loadingPosts) {
      return;
    }

    const newData: any = await runAsync(dataPosts?.nextId, dataPosts?.type);

    if (newData?.list?.length) {
      mutate({
        // @ts-ignore
        list: [...dataPosts?.list, ...newData?.list],
        nextId: newData?.nextId,
        type: dataPosts?.type,
      });
    }
  };

  const onFilter = async (value: string) => {
    router.push({
      pathname: ROUTE_PATH.HOME,
      query: { filterType: value },
    });
  };

  const onChangeTab = (key: string) => {
    setSelectTab(key);
    // if (key === '1') {
    //   requestLeaveIndex();
    // }
    // if (key === '2') {
    //   requestJoinIndex();
    // }
  };

  const onAddNewPost = (newData: IPost) => {
    mutate({
      // @ts-ignore
      list: [newData, ...dataPosts?.list],
      nextId: dataPosts?.nextId,
      type: dataPosts?.type,
    });
  };

  const onCommentPost = (postData: IPost) => {
    const newList = dataPosts.list?.map((post: IPost) =>
      postData.id === post.id ? postData : post,
    );
    mutate({
      list: newList,
      nextId: dataPosts.nextId,
      type: dataPosts.type,
    });
  };

  React.useEffect(() => {
    const findIndex = dataPosts?.list?.findIndex(
      (item) => item?.id === postDetailStatus?.themeWatchlist?.id,
    );
    if (findIndex === -1 && postDetailStatus?.themeWatchlist) {
      onAddNewPost(postDetailStatus?.themeWatchlist);
    }
  }, [postDetailStatus?.themeWatchlist]);

  React.useEffect(() => {
    // after follow stock
    const findIndex = dataPosts?.list?.findIndex(
      (item) => item?.id === postDetailStatus?.stockWatchList?.id,
    );
    if (findIndex === -1 && postDetailStatus?.stockWatchList) {
      onAddNewPost(postDetailStatus?.stockWatchList);
    }
  }, [postDetailStatus.stockWatchList]);
  React.useEffect(() => {
    if (postDetailStatus.idPostDetail !== '') {
      const newData =
        dataPosts?.list &&
        [...dataPosts?.list].filter((item) => item.id !== postDetailStatus.idPostDetail);
      mutate({
        list: newData,
      });
    }
  }, [postDetailStatus.idPostDetail]);

  const handleTracking = () => {
    const stockCodes = isHaveStockWatchList
      ? watchList?.[0]?.stocks?.map((item: any) => item.stockCode)
      : [];

    ViewWatchlist('Default', 'Normal WL', stockCodes, stockCodes.length, 'Home screen');
  };

  return (
    <div className='relative desktop:pt-0'>
      {isMobile && (
        <div className='relative laptop:hidden'>
          {selectTab === '1' && isHaveStockWatchList && (
            <CustomLink href={ROUTE_PATH.WATCHLIST} onClick={handleTracking}>
              <button className='absolute right-[0] top-[3px] z-50 flex flex-row items-center'>
                <Text
                  type='body-12-medium'
                  className='galaxy-max:hidden tablet:text-[14px]'
                  color='primary-1'
                >
                  {t('see_all')}
                </Text>
                <img
                  src='/static/icons/iconNext.svg'
                  width={5}
                  height={5}
                  alt=''
                  className='ml-[11px] w-[10px]'
                />
              </button>
            </CustomLink>
          )}

          <TabMobile selectTab={selectTab} onChangeTab={onChangeTab} />
        </div>
      )}

      <UserPosting onAddNewPost={onAddNewPost} />

      <HomeFeedFilter filterType={filterType as string} onFilter={onFilter as any} />

      <PinPost
        onTrackingViewTickerCmt={(stockCode: string) =>
          handleTrackingViewTicker(stockCode, 'Comment')
        }
        pinedPost={pinedPost}
        refresh={refresh}
        loading={loading}
      />

      <NewsFeed
        onTrackingViewTickerCmt={(stockCode) => handleTrackingViewTicker(stockCode, 'Comment')}
        onTrackingViewTicker={(stockCode) => handleTrackingViewTicker(stockCode, 'News feed')}
        key={`home-post-item-${firstPost?.id}`}
        data={firstPost as any}
        onCommentPost={onCommentPost}
      />

      <div className='box-shadow card-style tablet:hidden'>
        <div className='pb-[13px] pt-[10px] '>
          <Trending />
        </div>
      </div>

      <div className='box-shadow card-style'>
        <Text
          element='h2'
          type='body-16-semibold'
          color='neutral-2'
          className='mb-[14px] tablet:text-[20px]'
        >
          {t('people_in_spotlight')}
        </Text>
        <Influencer />

        <CustomLink href={ROUTE_PATH.PEOPLEINSPOTLIGHT}>
          <div className='mt-[16px]'>
            <button className='h-[45px] w-full rounded-[8px] bg-[#F0F7FC]'>
              <Text type='body-14-bold' color='primary-2'>
                {t('explore_influencer')}
              </Text>
            </button>
          </div>
        </CustomLink>
      </div>
      <SuggestionPeople />

      {fourPost?.map((item: IPost) => {
        return (
          <NewsFeed
            key={`home-post-item-${item?.id}`}
            onTrackingViewTickerCmt={(stockCode) => handleTrackingViewTicker(stockCode, 'Comment')}
            onTrackingViewTicker={(stockCode) => handleTrackingViewTicker(stockCode, 'News feed')}
            loading={loadingPosts}
            data={item}
            onCommentPost={onCommentPost}
          />
        );
      })}

      <div className='box-shadow card-style'>
        <Text
          element='h2'
          type='body-16-semibold'
          color='neutral-2'
          className='mb-[14px] tablet:text-[20px]'
        >
          {t('economy_in_the_themes')}
        </Text>
        <ListTheme />
      </div>

      {postsNext?.map((item: IPost, idx: number) => {
        if (idx === postsNext?.length - 1) {
          return (
            <div
              key={`home-post-item-${item?.id}`}
              ref={(node: any) => refLastElement(node, serviceLoadMorePost)}
            >
              <NewsFeed
                onTrackingViewTicker={(stockCode) =>
                  handleTrackingViewTicker(stockCode, 'News feed')
                }
                onTrackingViewTickerCmt={(stockCode) =>
                  handleTrackingViewTicker(stockCode, 'Comment')
                }
                data={item}
                onCommentPost={onCommentPost}
              />
            </div>
          );
        }

        return (
          <NewsFeed
            key={`home-post-item-${item?.id}`}
            onTrackingViewTicker={(stockCode) => handleTrackingViewTicker(stockCode, 'News feed')}
            onTrackingViewTickerCmt={(stockCode) => handleTrackingViewTicker(stockCode, 'Comment')}
            data={item}
            onCommentPost={onCommentPost}
          />
        );
      })}

      {loadingPosts && (
        <div className='mt-[10px]'>
          <NewsFeedSkeleton />
          <NewsFeedSkeleton />
          <NewsFeedSkeleton />
        </div>
      )}
    </div>
  );
};

export default HomeNewFeed;
