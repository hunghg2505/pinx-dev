import React, { useEffect, useLayoutEffect, useMemo } from 'react';

import { useUpdateEffect } from 'ahooks';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import ModalPeopleYouKnow from '@components/Explore/ModalPeopleYouKnow';
import { FilterFake } from '@components/Home/HomeNewFeed/ModalFilter';
import PinPost from '@components/Home/HomeNewFeed/PinPost';
import UserPostingFake from '@components/Home/UserPosting/UserPostingFake';
import { IPost } from '@components/Post/service';
import CustomLink from '@components/UI/CustomLink';
import SkeletonLoading from '@components/UI/Skeleton';
import Text from '@components/UI/Text';
import useObserver from '@hooks/useObserver';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { getAccessToken } from '@store/auth';
import { popupStatusAtom } from '@store/popup/popup';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { usePostHomePage } from '@store/postHomePage/postHomePage';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { ROUTE_PATH, getQueryFromUrl } from '@utils/common';

import { FILTER_TYPE } from '../ModalFilter';
import {
  requestJoinIndex,
  requestLeaveIndex,
  socket,
  useGetWatchList,
  useSuggestPeople,
} from '../service';

const UserPosting = dynamic(() => import('@components/Home/UserPosting/UserPosting'), {
  ssr: false,
  loading: () => <UserPostingFake />,
});
const ListTheme = dynamic(() => import('@components/Home/ListTheme'), {
  ssr: false,
});
const TabMobile = dynamic(() => import('@components/Home/HomeNewFeed/TabMobile'), {
  ssr: false,
});

const HomeFeedFilter = dynamic(() => import('@components/Home/HomeNewFeed/ModalFilter'), {
  ssr: false,
  loading: () => <FilterFake />,
});
const Trending = dynamic(() => import('../Trending'), {
  ssr: false,
});
const Influencer = dynamic(() => import('../People/Influencer'), {
  ssr: false,
});
const PeopleList = dynamic(() => import('../People/PeopleList'), {
  ssr: false,
});
const NewsFeed = dynamic(() => import('../../Post/NewsFeed'), {
  ssr: false,
});

const HomeNewFeed = ({ pinPostDataInitial }: any) => {
  const { t } = useTranslation('home');
  const router = useRouter();
  const { run: initUserProfile } = useProfileInitial();

  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const [postDetailStatus] = useAtom(postDetailStatusAtom);
  const { userType, isReadTerms } = useUserLoginInfo();

  socket.on('connect', requestJoinIndex);

  const filterType = useMemo(() => router?.query?.filterType, [router?.query?.filterType]);

  const [selectTab, setSelectTab] = React.useState<string>('2');

  const { watchList } = useGetWatchList();
  const { suggestionPeople, getSuggestFriend, refreshList } = useSuggestPeople();

  const { refLastElement } = useObserver();

  const { loadingPosts, dataPosts, run, runAsync, mutate } = usePostHomePage();

  const { firstPost, fourPost, postsNext } = useMemo(() => {
    return {
      firstPost: dataPosts?.list?.[0],
      fourPost: dataPosts?.list?.slice(1, 4),
      postsNext: dataPosts?.list?.slice(5),
    };
  }, [dataPosts]);

  useUpdateEffect(() => {
    const query: any = getQueryFromUrl();

    run('', query?.filterType || FILTER_TYPE.MOST_RECENT);
  }, [filterType]);

  useEffect(() => {
    const isLogin = !!getAccessToken();

    if (isLogin) {
      getSuggestFriend();
    }
  }, []);

  const isHaveStockWatchList = !!(watchList?.[0]?.stocks?.length > 0);

  useLayoutEffect(() => {
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
    if (key === '1') {
      requestLeaveIndex();
    }
    if (key === '2') {
      requestJoinIndex();
    }
  };

  const onAddNewPost = (newData: IPost) => {
    mutate({
      // @ts-ignore
      list: [newData, ...dataPosts?.list],
      nextId: dataPosts?.nextId,
      type: dataPosts?.type,
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
    if (postDetailStatus.idPostDetail !== '') {
      const newData =
        dataPosts?.list &&
        [...dataPosts?.list].filter((item) => item.id !== postDetailStatus.idPostDetail);
      mutate({
        list: newData,
      });
    }
  }, [postDetailStatus.idPostDetail]);

  return (
    <div className='relative desktop:pt-0'>
      <div className='relative mobile:block tablet:hidden'>
        {selectTab === '1' && watchList?.[0]?.stocks?.length > 0 && (
          <CustomLink href={ROUTE_PATH.WATCHLIST}>
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

      <UserPosting onAddNewPost={onAddNewPost} />

      <HomeFeedFilter filterType={filterType as string} onFilter={onFilter as any} />

      <PinPost pinPostDataInitial={pinPostDataInitial} />

      <NewsFeed key={`home-post-item-${firstPost?.id}`} data={firstPost as any} />

      <div className='box-shadow card-style tablet:hidden'>
        <div className='pb-[13px] pt-[10px] '>
          <Trending />
        </div>
      </div>

      <div className='box-shadow card-style'>
        <Text type='body-16-semibold' color='neutral-2' className='mb-[14px] tablet:text-[20px]'>
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

      {suggestionPeople && (
        <div className='box-shadow card-style tablet:hidden'>
          <div className='mr-[16px] flex flex-row items-center'>
            <img
              src='/static/icons/iconPeople.svg'
              alt=''
              width={20}
              height={20}
              className='mr-[8px] h-[20px] w-[20px] object-contain'
            />
            <Text type='body-16-bold' color='neutral-2'>
              {t('People_you_may_know')}
            </Text>
          </div>

          <div>
            <div className='bg-[#ffffff] pl-[16px] pt-[15px] galaxy-max:pl-0'>
              <PeopleList data={suggestionPeople} refresh={refreshList} />
            </div>
            <div className='bg-[#ffffff] pb-[10px] pt-[15px] text-center'>
              <ModalPeopleYouKnow refreshList={refreshList}>
                <button className='mx-[auto] h-[45px] w-[calc(100%_-_32px)] rounded-[8px] bg-[#F0F7FC] galaxy-max:w-full'>
                  <Text type='body-14-bold' color='primary-2'>
                    {t('explore_people')}
                  </Text>
                </button>
              </ModalPeopleYouKnow>
            </div>
          </div>
        </div>
      )}

      {fourPost?.map((item: IPost) => {
        return <NewsFeed key={`home-post-item-${item?.id}`} data={item} />;
      })}

      <div className='box-shadow card-style'>
        <Text type='body-16-semibold' color='neutral-2' className='mb-[14px] tablet:text-[20px]'>
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
              <NewsFeed data={item} />
            </div>
          );
        }

        return <NewsFeed key={`home-post-item-${item?.id}`} data={item} />;
      })}

      {loadingPosts && (
        <div className='mt-[10px]'>
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </div>
      )}
    </div>
  );
};

export default HomeNewFeed;
