/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { clearCache, useUpdateEffect } from 'ahooks';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import HomeFeedFilter from '@components/Home/HomeNewFeed/ModalFilter';
import { handleTrackingViewTicker } from '@components/Home/HomeNewFeed/utilts';
import { FILTER_TYPE } from '@components/Home/ModalFilter/modal-filter';
import lazyLoadHydrate from '@components/LazyComp/LazyComp';
import { IPost } from '@components/Post/service';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { popupStatusAtom } from '@store/popup/popup';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { usePostHomePage } from '@store/postHomePage/postHomePage';
import { ROUTE_PATH, getQueryFromUrl, removeCurClickedHomePostId } from '@utils/common';
import {
  filterNewsTracking,
  getMoreInfoTracking,
  viewWatchListTracking,
} from 'src/mixpanel/mixpanel';

import TabMobileSkeleton from './TabMobileSkeleton';
import { useGetWatchList } from '../service';

const PinPost = dynamic(() => import('@components/Home/HomeNewFeed/PinPost'));
const PostList = lazyLoadHydrate(() => import('@components/Home/HomeNewFeed/PostList'));

const TabMobile = lazyLoadHydrate(
  () => import('@components/Home/HomeNewFeed/TabMobile'),
  false,
  () => <TabMobileSkeleton />,
);
const UserPosting = lazyLoadHydrate(
  () => import('@components/Home/UserPosting/UserPosting'),
  false,
  () => <></>,
);

const HomeNewFeed = () => {
  const { t } = useTranslation('home');
  const router = useRouter();

  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const [postDetailStatus] = useAtom(postDetailStatusAtom);
  const { userType, isReadTerms } = useUserLoginInfo();

  const filterType = useMemo(() => router?.query?.filterType, [router?.query?.filterType]);

  const { watchList } = useGetWatchList();
  const isHaveStockWatchList = !!(watchList?.[0]?.stocks?.length > 0);
  const [selectTab, setSelectTab] = useState<string>('2');

  const { loadingPosts, dataPosts, run, runAsync, mutate, initialHomePostData } = usePostHomePage();
  const { firstPost, fourPost, postsNext } = useMemo(() => {
    return {
      firstPost: dataPosts?.list?.[0],
      fourPost: dataPosts?.list?.slice(1, 4),
      postsNext: dataPosts?.list?.slice(5),
    };
  }, [dataPosts]);

  useEffect(() => {
    const curClickedHomePostId = globalThis?.sessionStorage?.getItem('curClickedHomePostId');
    const element = curClickedHomePostId // eslint-disable-next-line unicorn/prefer-query-selector
      ? document.getElementById(`post-${curClickedHomePostId}`)
      : null;
    if (element) {
      element?.scrollIntoView({
        block: 'center',
        inline: 'center',
      });
      setTimeout(() => {
        removeCurClickedHomePostId();
      }, 500);
    }
  });

  useEffect(() => {
    const curClickedHomePostId = globalThis?.sessionStorage?.getItem('curClickedHomePostId');
    if (!curClickedHomePostId) {
      window.scrollTo(0, 0);
    }
  }, []);

  useUpdateEffect(() => {
    const query: any = getQueryFromUrl();
    clearCache('data-pin-post');
    run('', query?.filterType || FILTER_TYPE.MOST_RECENT);
  }, [filterType]);
  // React.useEffect(() => {
  //   if (postDetailStatus?.isRefreshHome) {
  //     initialHomePostData();
  //   }
  // }, [postDetailStatus?.isRefreshHome]);
  useEffect(() => {
    if (postDetailStatus?.isRefreshHome) {
      // initialHomePostData();
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
    filterNewsTracking(value);
    router.push({
      pathname: ROUTE_PATH.HOME,
      query: { filterType: value },
    });
  };

  const onChangeTab = (key: string) => {
    setSelectTab(key);
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

  const handleTracking = useCallback(() => {
    // tracking event view wl
    const stockCodes = isHaveStockWatchList
      ? watchList?.[0]?.stocks?.map((item: any) => item.stockCode)
      : [];

    viewWatchListTracking(
      'Personal Watchlist',
      'Personal Watchlist',
      stockCodes,
      stockCodes.length,
      'Home screen',
    );

    // tracking event get more info
    getMoreInfoTracking('Home screen', 'Watchlist', 'My watchlist');
  }, []);

  return (
    <div className='relative desktop:pt-0'>
      <div className='relative tablet:hidden'>
        {selectTab === '1' && isHaveStockWatchList && (
          <CustomLink
            className='absolute right-[0] top-[3px] z-50 flex flex-row items-center'
            href={ROUTE_PATH.WATCHLIST}
            onClick={handleTracking}
          >
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
          </CustomLink>
        )}
        <TabMobile selectTab={selectTab} onChangeTab={onChangeTab} />
      </div>

      <>
        <UserPosting onAddNewPost={onAddNewPost} />
      </>

      <>
        <HomeFeedFilter filterType={filterType as string} onFilter={onFilter as any} />
      </>

      <>
        <PinPost
          onTrackingViewTickerCmt={(stockCode: string) =>
            handleTrackingViewTicker(stockCode, 'Comment')
          }
        />
      </>

      <PostList
        // size={size}
        serviceLoadMorePost={serviceLoadMorePost}
        onCommentPost={onCommentPost}
        firstPost={firstPost}
        fourPost={fourPost}
        postsNext={postsNext}
        loadingPosts={loadingPosts}
      />
    </div>
  );
};

export default HomeNewFeed;
