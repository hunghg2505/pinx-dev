/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo } from 'react';

import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Tabs, { TabPane } from 'rc-tabs';

import { FilterFake } from '@components/Home/HomeNewFeed/ModalFilter';
import PinPost from '@components/Home/HomeNewFeed/PinPost';
import UserPosting from '@components/Home/UserPosting/UserPosting';
import { IPost } from '@components/Post/service';
import SkeletonLoading from '@components/UI/Skeleton';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { getAccessToken } from '@store/auth';
import { popupStatusAtom } from '@store/popup/popup';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { ROUTE_PATH } from '@utils/common';

import ListTheme from '../ListTheme';
import Market from '../Market';
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

const WatchList = dynamic(() => import('../WatchList'));

const Filter = dynamic(() => import('@components/Home/HomeNewFeed/ModalFilter'), {
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
  const [isPost, setIsPost] = React.useState(false);

  const [newFeed, setNewFeed] = React.useState<IPost[]>([]);
  const [lastNewFeed, setLastNewFeed] = React.useState<string>('');
  const { run, refresh, loading, listNewFeed } = useGetListNewFeed({
    onSuccess: (res) => {
      setLastNewFeed(res?.data?.last);
      const newData = [...newFeed];
      const check = res?.data?.list;
      for (const item of check) {
        const index = newData.findIndex((fi) => fi.id === item.id);
        if (index < 0) {
          if (isPost) {
            newData.unshift(item);
          } else {
            newData.push(item);
          }
        }

        if (index >= 0) {
          newData.splice(index, 1, item);
        }
      }
      setNewFeed(newData);
    },
  });

  const addPostSuccess = () => {
    setIsPost(true);
    refresh();
  };

  const { lastElementRef } = useLoadMore(filterType, listNewFeed, loading, run);
  const { watchList } = useGetWatchList();
  const isLogin = !!getAccessToken();
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

  const onHidePost = (id: string) => {
    const newData = [...newFeed];
    const index = newData?.findIndex((item) => item.id === id);
    if (index >= 0) {
      newData.splice(index, 1);
    }
    setNewFeed(newData);
  };

  const isHaveStockWatchList = !!(watchList?.[0]?.stocks?.length > 0);

  useEffect(() => {
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
      <div className='desktop:bg-[#F8FAFD]' ref={refScroll}>
        <div className='bg-[#F8FAFD] mobile:pt-[10px] desktop:pt-0'>
          <div className='relative bg-[#ffffff] pb-[12px] pt-[26px] mobile:block tablet:hidden'>
            {selectTab === '1' && watchList?.[0]?.stocks?.length > 0 && (
              <button
                className='absolute right-[16px] top-[26px] z-50 flex flex-row items-center'
                onClick={() => router.push(ROUTE_PATH.WATCHLIST)}
              >
                <Text type='body-14-medium' color='primary-1'>
                  See all
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

            <Tabs
              defaultActiveKey='2'
              activeKey={selectTab}
              className='tabHome'
              onChange={onChangeTab}
            >
              {isLogin && (
                <TabPane tab='Watchlist' key='1'>
                  <WatchList />
                </TabPane>
              )}
              <TabPane tab='Market' key='2'>
                <Market />
              </TabPane>
            </Tabs>
          </div>

          <UserPosting addPostSuccess={addPostSuccess} />

          <Filter filterType={filterType as string} onFilter={onFilter as any} />

          <div className='relative rounded-[8px] bg-[#FFFFFF] [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)] mobile:p-0 desktop:p-[20px]'>
            <PinPost
              refresh={refresh}
              onHidePost={onHidePost}
              pinPostDataInitial={pinPostDataInitial}
            />

            <div className='bg-[#ffffff] px-[16px] [border-top:1px_solid_#EAF4FB] mobile:block desktop:hidden'>
              <div className='pb-[13px] pt-[10px] '>
                <Trending />
              </div>
            </div>

            <div className='bg-[#ffffff] [border-top:1px_solid_#EAF4FB] '>
              <Text
                type='body-16-bold'
                color='neutral-2'
                className='mb-[14px] mobile:pt-[20px] desktop:pt-[16px]'
              >
                People in spotlight
              </Text>

              <Influencer />

              <div className='mt-[16px]'>
                <button
                  className='mb-[15px] h-[45px] w-full rounded-[8px] bg-[#F0F7FC]'
                  onClick={() => router.push(ROUTE_PATH.PEOPLEINSPOTLIGHT)}
                >
                  <Text type='body-14-bold' color='primary-2'>
                    Explore influencer
                  </Text>
                </button>
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
                    People you may know
                  </Text>
                </div>
              )}
            </div>

            {suggestionPeople && (
              <div className='mobile:block desktop:hidden'>
                <div className='bg-[#ffffff] pl-[16px] pt-[15px]'>
                  <PeopleList data={suggestionPeople} refresh={refreshList} />
                </div>
                <div className='bg-[#ffffff] pb-[10px] pt-[15px] text-center'>
                  <button className='mx-[auto] h-[45px] w-[calc(100%_-_32px)] rounded-[8px] bg-[#F0F7FC]'>
                    <Text type='body-14-bold' color='primary-2'>
                      Explore people
                    </Text>
                  </button>
                </div>
              </div>
            )}

            <div className='mobile:px-[16px] desktop:px-[0]'>
              {newFeed?.slice(1, 4)?.map((item: IPost) => {
                return (
                  <NewsFeed
                    key={`newFeed-${item.id}`}
                    data={item}
                    id={item.id}
                    refresh={refresh}
                    onHidePost={onHidePost}
                  />
                );
              })}
            </div>
            <div className='mb-[8px] block h-[2px] bg-[#EEF5F9]'></div>
            <div className='bg-[#ffffff] pl-[16px]'>
              <Text type='body-16-bold' color='neutral-2' className='py-[16px]'>
                Economy in the themes
              </Text>
              <ListTheme />
            </div>

            <div className='mobile:px-[16px] desktop:px-[0]'>
              {newFeed?.slice(5)?.map((item: IPost) => {
                return (
                  <NewsFeed
                    key={`newFeed-${item.id}`}
                    data={item}
                    id={item.id}
                    refresh={refresh}
                    onHidePost={onHidePost}
                  />
                );
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
