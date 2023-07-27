/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo } from 'react';

import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import ModalPeopleYouKnow from '@components/Explore/ModalPeopleYouKnow';
import { FilterFake } from '@components/Home/HomeNewFeed/ModalFilter';
import PinPost from '@components/Home/HomeNewFeed/PinPost';
import UserPostingFake from '@components/Home/UserPosting/UserPostingFake';
import { IPost } from '@components/Post/service';
import SkeletonLoading from '@components/UI/Skeleton';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { getAccessToken } from '@store/auth';
import { popupStatusAtom } from '@store/popup/popup';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { ROUTE_PATH } from '@utils/common';

import { FILTER_TYPE } from '../ModalFilter';
import {
  requestJoinIndex,
  requestLeaveIndex,
  socket,
  useGetListNewFeed,
  useGetWatchList,
  useSuggestPeople,
} from '../service';
import useLoadMore from '../useLoadMore';

const UserPosting = dynamic(() => import('@components/Home/UserPosting/UserPosting'), {
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
// const PinPost = dynamic(() => import('@components/Home/HomeNewFeed/PinPost'), {
//   ssr: false,
//   loading: () => (
//     <>
//       <>
//         <SkeletonLoading />
//         <SkeletonLoading />
//       </>
//     </>
//   ),
// });
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
  const { userType, isReadTerms } = useUserLoginInfo();
  socket.on('connect', function () {
    requestJoinIndex();
  });

  const filterType = useMemo(() => router?.query?.filterType, [router?.query?.filterType]);
  const [selectTab, setSelectTab] = React.useState<string>('2');
  const refScroll = React.useRef(null);

  const [newFeed, setNewFeed] = React.useState<IPost[]>([]);
  const [lastNewFeed, setLastNewFeed] = React.useState<string>('');
  const { run, loading, listNewFeed } = useGetListNewFeed({
    onSuccess: (res) => {
      setLastNewFeed(res?.data?.last);
      setNewFeed(res?.data?.list ?? []);
    },
  });

  const { lastElementRef } = useLoadMore(filterType, listNewFeed, loading, run);
  const { watchList } = useGetWatchList();
  const { suggestionPeople, getSuggestFriend, refreshList } = useSuggestPeople();

  const onFilter = async (value: string) => {
    setNewFeed([]);
    setLastNewFeed('');
    router.push({
      pathname: ROUTE_PATH.HOME,
      query: { filterType: value },
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
    run(value);
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
    setNewFeed((prev) => {
      prev.unshift(newData);

      return [...prev];
    });
  };

  const isHaveStockWatchList = !!(watchList?.[0]?.stocks?.length > 0);

  useEffect(() => {
    const isLogin = !!getAccessToken();

    run(filterType || FILTER_TYPE.MOST_RECENT);
    if (isLogin) {
      getSuggestFriend();
    }
  }, []);

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

  return (
    <>
      <div className='px-[10px] ' ref={refScroll}>
        <div className='mobile:pt-[10px] desktop:pt-0'>
          <div className='relative mobile:block tablet:hidden'>
            {selectTab === '1' && watchList?.[0]?.stocks?.length > 0 && (
              <button
                className='absolute right-[0] top-[3px] z-50 flex flex-row items-center'
                onClick={() => router.push(ROUTE_PATH.WATCHLIST)}
              >
                <Text type='body-14-medium' color='primary-1'>
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
            )}

            <TabMobile selectTab={selectTab} onChangeTab={onChangeTab} />
          </div>

          <UserPosting onAddNewPost={onAddNewPost} />

          <HomeFeedFilter filterType={filterType as string} onFilter={onFilter as any} />

          <div className='relative'>
            <PinPost pinPostDataInitial={pinPostDataInitial} />

            <div>
              {newFeed?.slice(0, 1)?.map((item: IPost) => {
                return <NewsFeed key={`newFeed-${item.id}`} data={item} />;
              })}
            </div>

            <div className='bg-[#ffffff] px-[16px] [border-top:1px_solid_#EAF4FB] mobile:block desktop:hidden'>
              <div className='pb-[13px] pt-[10px] '>
                <Trending />
              </div>
            </div>

            <div className='mb-5 rounded-[12px] border-[1px] border-solid border-[#EBEBEB] bg-white p-[12px] desktop:p-[16px]'>
              <Text type='body-20-semibold' color='neutral-2' className='mb-[14px]'>
                {t('people_in_spotlight')}
              </Text>

              <Influencer />

              <div className='mt-[16px]'>
                <button
                  className='h-[45px] w-full rounded-[8px] bg-[#F0F7FC]'
                  onClick={() => router.push(ROUTE_PATH.PEOPLEINSPOTLIGHT)}
                >
                  <Text type='body-14-bold' color='primary-2'>
                    {t('explore_influencer')}
                  </Text>
                </button>
              </div>
            </div>

            {suggestionPeople && (
              <div className='mr-[16px] flex-row items-center mobile:flex desktop:hidden'>
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
            )}

            {suggestionPeople && (
              <div className='mobile:block desktop:hidden'>
                <div className='bg-[#ffffff] pl-[16px] pt-[15px]'>
                  <PeopleList data={suggestionPeople} refresh={refreshList} />
                </div>
                <div className='bg-[#ffffff] pb-[10px] pt-[15px] text-center'>
                  <ModalPeopleYouKnow>
                    <button className='mx-[auto] h-[45px] w-[calc(100%_-_32px)] rounded-[8px] bg-[#F0F7FC]'>
                      <Text type='body-14-bold' color='primary-2'>
                        {t('explore_people')}
                      </Text>
                    </button>
                  </ModalPeopleYouKnow>
                </div>
              </div>
            )}

            <div>
              {newFeed?.slice(1, 4)?.map((item: IPost) => {
                return <NewsFeed key={`newFeed-${item.id}`} data={item} />;
              })}
            </div>

            <div className='mb-5 rounded-[12px] border-[1px] border-solid border-[#EBEBEB] bg-white p-[12px] desktop:p-[16px]'>
              <Text type='body-20-semibold' color='neutral-2' className='mb-[14px]'>
                {t('economy_in_the_themes')}
              </Text>
              <ListTheme />
            </div>

            <div>
              {newFeed?.slice(5)?.map((item: IPost) => {
                return <NewsFeed key={`newFeed-${item.id}`} data={item} />;
              })}
            </div>
          </div>
        </div>
      </div>

      {loading && lastNewFeed !== '' && (
        <div className='mt-[10px]'>
          <SkeletonLoading />
          <SkeletonLoading />
        </div>
      )}
      <div ref={lastElementRef}></div>
    </>
  );
};

export default HomeNewFeed;
