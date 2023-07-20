import React, { useEffect, useMemo, useRef } from 'react';

import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
// import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Tabs, { TabPane } from 'rc-tabs';

import FooterSignUp from '@components/FooterSignup';
import { IPost } from '@components/Post/service';
import PopupAccessLimit from '@components/UI/Popup/PopupAccessLimit';
import PopupAuth from '@components/UI/Popup/PopupAuth';
import PopupLoginTerms from '@components/UI/Popup/PopupLoginTerms';
import PopupRegisterOtp from '@components/UI/Popup/PopupOtp';
import PopupRegisterCreateUsername from '@components/UI/Popup/PopupUsername';
import SkeletonLoading from '@components/UI/Skeleton';
import Text from '@components/UI/Text';
// import useGetMetaData from '@hooks/useGetMetaData';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { getAccessToken } from '@store/auth';
import { initialPopupStatus, popupStatusAtom } from '@store/popup/popup';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { ROUTE_PATH } from '@utils/common';

import ComposeButton from './ComposeButton';
import ContentRight from './ContentRight';
import ListTheme from './ListTheme';
import Market from './Market';
import ModalCompose from './ModalCompose';
import ModalFilter, { FILTER_TYPE } from './ModalFilter';
import {
  requestJoinIndex,
  requestLeaveIndex,
  socket,
  useGetListNewFeed,
  useGetWatchList,
  useSuggestPeople,
} from './service';

const Influencer = dynamic(() => import('./People/Influencer'));
const PeopleList = dynamic(() => import('./People/PeopleList'));
const Trending = dynamic(() => import('./Trending'));
const WatchList = dynamic(() => import('./WatchList'));
const NewsFeed = dynamic(() => import('../Post/NewsFeed'));

const Home = () => {
  const router = useRouter();
  const refModal: any = useRef();
  const { run: initUserProfile } = useProfileInitial();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { userType, isReadTerms } = useUserLoginInfo();
  socket.on('connect', function () {
    requestJoinIndex();
  });

  const onShowModal = () => {
    refModal?.current?.onVisible && refModal?.current?.onVisible();
  };
  const filterType = useMemo(() => router?.query?.filterType, [router?.query?.filterType]);
  const [selectTab, setSelectTab] = React.useState<string>('2');
  const refScroll = React.useRef(null);
  const [isPost, setIsPost] = React.useState(false);
  // const { t } = useTranslation('home');
  const [newFeed, setNewFeed] = React.useState<IPost[]>([]);
  const [lastNewFeed, setLastNewFeed] = React.useState<string>('');
  const { run, refresh, loading } = useGetListNewFeed({
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
  const { watchList } = useGetWatchList();
  const isLogin = !!getAccessToken();
  const { suggestionPeople, getSuggestFriend, refreshList } = useSuggestPeople();
  const { userLoginInfo } = useUserLoginInfo();
  React.useEffect(() => {
    window.addEventListener('scroll', loadMore);
    return () => {
      window.removeEventListener('scroll', loadMore);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastNewFeed]);
  const loadMore = () => {
    if (isPost) {
      setIsPost(false);
    }
    const heigtBottom = document?.scrollingElement?.scrollHeight || 0;
    const heightTop = window.innerHeight + document.documentElement?.scrollTop || 0;
    if (Math.floor(heightTop) === heigtBottom || Math.ceil(heightTop) === heigtBottom) {
      run(filterType || FILTER_TYPE.MOST_RECENT, lastNewFeed);
    }
  };
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isHaveStockWatchList) {
      setSelectTab('1');
    }
  }, [isHaveStockWatchList]);
  const onCloseModal = () => {
    setPopupStatus(initialPopupStatus);
  };
  useEffect(() => {
    if (!!userType && !isReadTerms) {
      setPopupStatus({
        ...popupStatus,
        popupLoginTerms: true,
      });
    }
    initUserProfile();
  }, [userType, isReadTerms]);
  // const metaData = useGetMetaData();

  if (loading && lastNewFeed === '') {
    return <SkeletonLoading />;
  }
  return (
    <>
      {popupStatus.popupAccessLinmit && (
        <PopupAccessLimit visible={popupStatus.popupAccessLinmit} onClose={onCloseModal} />
      )}
      {popupStatus.popupLoginTerms && (
        <PopupLoginTerms visible={popupStatus.popupLoginTerms} onClose={onCloseModal} />
      )}
      {popupStatus.popupAuth && (
        <PopupAuth visible={popupStatus.popupAuth} onClose={onCloseModal} />
      )}
      {popupStatus.popupRegisterOtp && (
        <PopupRegisterOtp visible={popupStatus.popupRegisterOtp} onClose={onCloseModal} />
      )}
      {popupStatus.popupRegisterUsername && (
        <PopupRegisterCreateUsername
          visible={popupStatus.popupRegisterUsername}
          onClose={onCloseModal}
        />
      )}

      <div className='flex desktop:bg-[#F8FAFD]'>
        <div
          className='mobile:mr-0 mobile:w-full tablet:mr-[15px] tablet:w-[calc(100%_-_265px)] laptop:w-[calc(100%_-_365px)] desktop:mr-[24px] desktop:w-[calc(100%_-_350px)] xdesktop:w-[750px]'
          ref={refScroll}
        >
          <div className='bg-[#F8FAFD] mobile:pt-[10px] desktop:pt-0'>
            <div className='mx-[auto] my-[0] mobile-max:w-full tablet:w-full'>
              <div className='relative bg-[#ffffff] pb-[12px] pt-[26px] mobile:block tablet:hidden'>
                {selectTab === '1' && watchList?.[0]?.stocks?.length > 0 && (
                  <button className='absolute right-[16px] top-[26px] flex flex-row items-center'>
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

              {isLogin && (
                <div className='rounded-[8px] bg-[#FFFFFF] p-[20px] [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)] mobile:hidden tablet:mb-[20px] tablet:block'>
                  <div className='flex items-center'>
                    {userLoginInfo?.avatar && (
                      <img
                        src={userLoginInfo?.avatar}
                        alt=''
                        width={0}
                        height={0}
                        sizes='100vw'
                        className='mr-[10px] h-[56px] w-[56px] rounded-full '
                      />
                    )}

                    <Text type='body-16-semibold'>{userLoginInfo?.displayName}</Text>
                  </div>
                  <div className='mt-[5px] pl-[61px]'>
                    <textarea
                      onClick={onShowModal}
                      placeholder='What is in your mind?'
                      className='w-full rounded-[5px] bg-[#EFF2F5] pl-[10px] pt-[10px] focus:outline-none desktop:h-[70px]'
                    />
                  </div>
                  <div className='mt-[15px] flex items-center justify-between pl-[61px]'>
                    <div className='flex items-center'>
                      <img
                        src='/static/icons/iconImage.svg'
                        alt=''
                        width={0}
                        height={0}
                        className='mr-[8px] w-[28px]'
                      />
                      <img
                        src='/static/icons/iconLinkHome.svg'
                        alt=''
                        width={0}
                        height={0}
                        className='mr-[8px] w-[20px]'
                      />
                      <img
                        src='/static/icons/iconEmotion.svg'
                        alt=''
                        width={0}
                        height={0}
                        className='mr-[8px] w-[25px]'
                      />
                      <img
                        src='/static/icons/iconPool.svg'
                        alt=''
                        width={0}
                        height={0}
                        className='w-[22px]'
                      />
                    </div>
                    <div className='flex h-[32px] w-[72px] flex-row items-center justify-center rounded-[5px] bg-[linear-gradient(225deg,_rgba(29,_108,_171,_0.99)_0%,_rgba(88,_157,_192,_0.99)_100%)] [box-shadow:0px_2px_4px_0px_rgba(53,_157,_217,_0.30)]'>
                      <Text type='body-14-medium' color='cbwhite'>
                        Post
                      </Text>
                    </div>
                  </div>
                </div>
              )}
              <div className='flex items-center pl-[16px] filter mobile:py-[12px] mobile-max:[border-top:1px_solid_#EAF4FB] desktop:mb-[20px]'>
                <Text
                  type='body-16-bold'
                  color='neutral-2'
                  className='mr-[12px] mobile:text-[16px] desktop:!text-[24px]'
                >
                  News feed
                </Text>

                <ModalFilter run={onFilter} type={filterType} />
              </div>
              <div className='relative rounded-[8px] bg-[#FFFFFF] [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)] mobile:p-0 desktop:p-[20px]'>
                <div className='absolute left-0 top-[17px] h-[5px] w-full bg-[#ffffff] mobile:hidden tablet:block'></div>
                <div className='mobile:px-[16px] desktop:px-[20px]'>
                  {newFeed?.slice(0, 1)?.map((item: IPost, index: number) => {
                    return (
                      <NewsFeed
                        key={index}
                        data={item}
                        id={item.id}
                        refresh={refresh}
                        onHidePost={onHidePost}
                      />
                    );
                  })}
                </div>

                <div className='bg-[#ffffff] px-[16px] [border-top:1px_solid_#EAF4FB] mobile:block desktop:hidden'>
                  <div className='pb-[13px] pt-[10px] '>
                    <Trending />
                  </div>
                </div>
                <div className='bg-[#ffffff] pl-[16px] [border-top:1px_solid_#EAF4FB] mobile:pr-[16px] desktop:pr-[0]'>
                  <Text
                    type='body-16-bold'
                    color='neutral-2'
                    className='mb-[14px] mobile:pt-[20px] desktop:pt-[16px]'
                  >
                    People in spotlight
                  </Text>
                  <Influencer />
                  <div className='mt-[16px] w-full tablet:pr-[16px]'>
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
                <div className='mobile:px-[16px] desktop:px-[20px]'>
                  {newFeed?.slice(1, 4)?.map((item: IPost, index: number) => {
                    return (
                      <NewsFeed
                        key={index}
                        data={item}
                        id={item.id}
                        refresh={refresh}
                        onHidePost={onHidePost}
                      />
                    );
                  })}
                </div>
                <div className='mb-[8px] block h-[2px] w-full bg-[#EEF5F9]'></div>
                <div className='bg-[#ffffff] pl-[16px]'>
                  <Text type='body-16-bold' color='neutral-2' className='py-[16px]'>
                    Economy in the themes
                  </Text>
                  <ListTheme />
                </div>
                <div className='mobile:px-[16px] desktop:px-[20px]'>
                  {newFeed?.slice(5)?.map((item: IPost, index: number) => {
                    return (
                      <NewsFeed
                        key={index}
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
        </div>
        <div className='mobile:hidden tablet:block tablet:w-[250px] tablet:pr-[2px] laptop:w-[350px]'>
          <ContentRight />
        </div>
      </div>
      {loading && lastNewFeed !== '' && (
        <div className='mt-[10px]'>
          <SkeletonLoading />
          <SkeletonLoading />
        </div>
      )}
      <ComposeButton />
      <ModalCompose ref={refModal} refresh={addPostSuccess} />
      {!isLogin && <FooterSignUp />}
    </>
  );
};

export default Home;
