import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
// import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';
import { Toaster } from 'react-hot-toast';

import ModalLoginTerms from '@components/Auth/Login/ModalLoginTerms';
import FooterSignUp from '@components/FooterSignup';
import { IPost } from '@components/Post/service';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { getAccessToken } from '@store/auth';
import { useProfileInitial } from '@store/profile/useProfileInitial';

import ComposeButton from './ComposeButton';
import ContentRight from './ContentRight';
import ListTheme from './ListTheme';
import Market from './Market';
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
  const { userType, isReadTerms } = useUserLoginInfo();
  socket.on('connect', function () {
    requestJoinIndex();
  });

  const [selectTab, setSelectTab] = React.useState<string>('2');

  // const { t } = useTranslation('home');
  const [newFeed, setNewFeed] = React.useState<IPost[]>([]);
  const [lastNewFeed, setLastNewFeed] = React.useState<string>('');
  const { run, refresh } = useGetListNewFeed({
    onSuccess: (res) => {
      setLastNewFeed(res?.data?.last);
      const newData = [...newFeed];
      const check = res?.data?.list;
      for (const item of check) {
        const index = newData.findIndex((fi) => fi.id === item.id);

        if (index < 0) {
          newData.push(item);
        }

        if (index >= 0) {
          newData.splice(index, 1, item);
        }
      }
      setNewFeed(newData);
    },
  });
  const { watchList } = useGetWatchList();
  const isLogin = !!getAccessToken();
  const { suggestionPeople, getSuggestFriend, refreshList } = useSuggestPeople();
  const { requestGetProfile } = useProfileInitial();
  const [showModalLoginTerms, setShowModalLoginTerms] = useState<boolean>(
    !!userType && !isReadTerms,
  );

  React.useEffect(() => {
    window.addEventListener('scroll', loadMore);
    return () => {
      window.removeEventListener('scroll', loadMore);
    };
  }, [lastNewFeed]);
  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement?.scrollTop - 0.5 ===
      document.scrollingElement?.scrollHeight
    ) {
      run(FILTER_TYPE.MOST_RECENT, lastNewFeed);
    }
  };
  const onFilter = async (value: string) => {
    setNewFeed([]);
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

  // console.log('🚀 ~ file: index.tsx:95 ~ Home ~ bgTheme:', bgTheme);
  const isHaveStockWatchList = !!(watchList?.[0]?.stocks?.length > 0);
  useEffect(() => {
    run(FILTER_TYPE.MOST_RECENT);
    if (isLogin) {
      getSuggestFriend();
    }
  }, []);
  useEffect(() => {
    if (isHaveStockWatchList) {
      setSelectTab('1');
    }
  }, [isHaveStockWatchList]);
  const onToggleModalLoginTerms = () => {
    setShowModalLoginTerms(!showModalLoginTerms);
  };
  return (
    <>
      <ModalLoginTerms
        visible={showModalLoginTerms}
        onToggle={onToggleModalLoginTerms}
        userType={userType}
      />
      <Toaster />
      <div className='flex desktop:bg-[#F8FAFD]'>
        <div className='mobile:mr-0 tablet:mr-[15px] tablet:w-[calc(100%_-_265px)] desktop:mr-[24px] desktop:w-[750px]'>
          <div className='bg-[#F8FAFD] mobile:pt-[10px] desktop:pt-0'>
            <div className='mx-[auto] my-[0] mobile:w-[375px] tablet:w-full'>
              <div className='relative bg-[#ffffff] pb-[12px] pt-[26px] mobile:block tablet:hidden'>
                {selectTab === '1' && watchList?.[0]?.stocks?.length > 0 && (
                  <button className='absolute right-[16px] top-[26px] flex flex-row items-center'>
                    <Text type='body-14-medium' color='primary-1'>
                      See all
                    </Text>
                    <Image
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
                    {requestGetProfile?.avatar && (
                      <Image
                        src={requestGetProfile?.avatar || '/static/logo/logoPintree.svg'}
                        alt=''
                        width={0}
                        height={0}
                        sizes='100vw'
                        className='mr-[10px] h-[56px] w-[56px] rounded-full '
                      />
                    )}

                    <Text type='body-16-semibold'>{requestGetProfile?.displayName}</Text>
                  </div>
                  <div className='mt-[5px] pl-[61px]'>
                    <textarea
                      placeholder='What is in your mind?'
                      className='w-full rounded-[5px] bg-[#EFF2F5] pl-[10px] pt-[10px] focus:outline-none desktop:h-[70px]'
                    />
                  </div>
                  <div className='mt-[15px] flex items-center justify-between pl-[61px]'>
                    <div className='flex items-center'>
                      <Image
                        src='/static/icons/iconImage.svg'
                        alt=''
                        width={0}
                        height={0}
                        className='mr-[8px] w-[28px]'
                      />
                      <Image
                        src='/static/icons/iconLinkHome.svg'
                        alt=''
                        width={0}
                        height={0}
                        className='mr-[8px] w-[20px]'
                      />
                      <Image
                        src='/static/icons/iconEmotion.svg'
                        alt=''
                        width={0}
                        height={0}
                        className='mr-[8px] w-[25px]'
                      />
                      <Image
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
              <div className='flex items-center pl-[16px] filter mobile:py-[12px] mobile:[border-top:1px_solid_#EAF4FB] desktop:mb-[20px]'>
                <Text
                  type='body-16-bold'
                  color='neutral-2'
                  className='mr-[12px] mobile:text-[16px] desktop:!text-[24px]'
                >
                  News feed
                </Text>

                <ModalFilter run={onFilter} />
              </div>
              <div className='relative rounded-[8px] bg-[#FFFFFF] [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)] mobile:p-0 desktop:p-[20px]'>
                <div className='absolute left-0 top-[17px] h-[5px] w-full bg-[#ffffff] mobile:hidden tablet:block'></div>
                {newFeed?.slice(0, 1)?.map((item: IPost, index: number) => {
                  return <NewsFeed key={index} data={item} id={item.id} refresh={refresh} />;
                })}
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
                    <button className='mb-[15px] h-[45px] w-full rounded-[8px] bg-[#F0F7FC]'>
                      <Text type='body-14-bold' color='primary-2'>
                        Explore influencer
                      </Text>
                    </button>
                  </div>

                  {suggestionPeople && (
                    <div className='mr-[16px] flex-row items-center mobile:flex desktop:hidden'>
                      <Image
                        src='/static/icons/iconPeople.svg'
                        alt=''
                        width='0'
                        height='0'
                        className='mr-2 w-[14px]'
                      />
                      <Text type='body-12-regular'>People you may know</Text>
                    </div>
                  )}
                </div>
                {suggestionPeople && (
                  <div className='mobile:block desktop:hidden'>
                    <div className='bg-[#ffffff] pl-[6px] pt-[15px]'>
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

                {newFeed?.slice(1, 4)?.map((item: IPost, index: number) => {
                  return <NewsFeed key={index} data={item} id={item.id} refresh={refresh} />;
                })}
                <div className='bg-[#ffffff] pl-[16px]'>
                  <Text type='body-16-bold' color='neutral-2' className='py-[16px]'>
                    Economy in the themes
                  </Text>
                  <ListTheme />
                </div>
                {newFeed?.slice(5)?.map((item: IPost, index: number) => {
                  return <NewsFeed key={index} data={item} id={item.id} refresh={refresh} />;
                })}
              </div>
            </div>
          </div>
        </div>
        <ContentRight />
      </div>

      <ComposeButton />
      {!isLogin && <FooterSignUp />}
    </>
  );
};

export default Home;
