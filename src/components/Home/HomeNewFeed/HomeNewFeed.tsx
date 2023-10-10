/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useRef } from 'react';

import { clearCache, useSize, useUpdateEffect } from 'ahooks';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import HomeFeedFilter from '@components/Home/HomeNewFeed/ModalFilter';
// import PinPost from '@components/Home/HomeNewFeed/PinPost';
// import PostList from '@components/Home/HomeNewFeed/PostList';
import { handleTrackingViewTicker } from '@components/Home/HomeNewFeed/utilts';
import { FILTER_TYPE } from '@components/Home/ModalFilter/modal-filter';
// import UserPosting from '@components/Home/UserPosting/UserPosting';
import LoadCompVisible from '@components/LoadCompVisible/LoadCompVisible';
import { IPost } from '@components/Post/service';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { popupStatusAtom } from '@store/popup/popup';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { usePostHomePage } from '@store/postHomePage/postHomePage';
import { ROUTE_PATH, getQueryFromUrl } from '@utils/common';
import {
  filterNewsTracking,
  getMoreInfoTracking,
  viewWatchListTracking,
} from 'src/mixpanel/mixpanel';

import { useGetWatchList } from '../service';

const TabMobile = dynamic(() => import('@components/Home/HomeNewFeed/TabMobile'), { ssr: false });
const PinPost = dynamic(() => import('@components/Home/HomeNewFeed/PinPost'));
const PostList = dynamic(() => import('@components/Home/HomeNewFeed/PostList'));
const UserPosting = dynamic(() => import('@components/Home/UserPosting/UserPosting'));

const HomeNewFeed = () => {
  const { t } = useTranslation('home');
  const router = useRouter();

  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const [postDetailStatus] = useAtom(postDetailStatusAtom);
  const { userType, isReadTerms } = useUserLoginInfo();

  const filterType = useMemo(() => router?.query?.filterType, [router?.query?.filterType]);

  const { watchList } = useGetWatchList();
  const isHaveStockWatchList = !!(watchList?.[0]?.stocks?.length > 0);
  const [selectTab, setSelectTab] = React.useState<string>('2');

  const { loadingPosts, dataPosts, run, runAsync, mutate, initialHomePostData } = usePostHomePage();

  const { firstPost, fourPost, postsNext } = useMemo(() => {
    return {
      firstPost: dataPosts?.list?.[0],
      fourPost: dataPosts?.list?.slice(1, 4),
      postsNext: dataPosts?.list?.slice(5),
    };
  }, [dataPosts]);

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
    filterNewsTracking();
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

  const handleTracking = () => {
    // tracking event view wl
    const stockCodes = isHaveStockWatchList
      ? watchList?.[0]?.stocks?.map((item: any) => item.stockCode)
      : [];

    viewWatchListTracking('Default', 'Normal WL', stockCodes, stockCodes.length, 'Home screen');

    // tracking event get more info
    getMoreInfoTracking('Home screen', 'Watchlist', 'My watchlist');
  };
  const size = useSize(() => document.querySelector('body'));

  const virtuoso = useRef<any>(null);

  useEffect(() => {
    const postIndex = sessionStorage?.getItem('postIndex');
    if (postIndex && virtuoso.current) {
      virtuoso.current.scrollToIndex({
        index: +postIndex,
        align: 'start',
        behavior: 'auto',
      });
      sessionStorage.removeItem('postIndex');
    }
  }, []);

  return (
    <div className='relative desktop:pt-0'>
      <div className='relative tablet:hidden'>
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

      <LoadCompVisible>
        <UserPosting onAddNewPost={onAddNewPost} />
      </LoadCompVisible>

      <LoadCompVisible>
        <HomeFeedFilter filterType={filterType as string} onFilter={onFilter as any} />
      </LoadCompVisible>

      <LoadCompVisible>
        <PinPost
          onTrackingViewTickerCmt={(stockCode: string) =>
            handleTrackingViewTicker(stockCode, 'Comment')
          }
        />
      </LoadCompVisible>

      <LoadCompVisible>
        {/* <PostList
          size={size}
          serviceLoadMorePost={serviceLoadMorePost}
          onCommentPost={onCommentPost}
          firstPost={firstPost}
          fourPost={fourPost}
          postsNext={postsNext}
          loadingPosts={loadingPosts}
          virtuoso={virtuoso}
        /> */}
      </LoadCompVisible>
    </div>
  );
};

export default HomeNewFeed;
