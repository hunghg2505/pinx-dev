import React, { useEffect } from 'react';

import Image from 'next/image';
// import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import Text from '@components/UI/Text';

import ListTheme from './ListTheme';
import ModalFilter, { FILTER_TYPE } from './ModalFilter';
import Influencer from './People/Influencer';
import PeopleList from './People/PeopleList';
import { useGetInfluencer, useGetListNewFeed } from './service';
import Trending from './Trending';
import WatchList from './WatchList';
import NewsFeed from '../Post/NewsFeed';

function Home() {
  // const { t } = useTranslation('home');
  const { listNewFeed, run } = useGetListNewFeed();
  const { KOL } = useGetInfluencer();
  console.log('🚀 ~ file: index.tsx:25 ~ Home ~ KOL:', KOL);
  useEffect(() => {
    run(FILTER_TYPE.MOST_RECENT);
  }, []);
  console.log('🚀 ~ file: index.tsx:25 ~ Home ~ listNewFeed:', listNewFeed);
  return (
    <div className='bg-[#F8FAFD] pt-[10px]'>
      <div className='mx-[auto] my-[0] w-[375px]'>
        <div className='relative bg-[#ffffff] pb-[12px] pt-[26px]'>
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
          <Tabs defaultActiveKey='1' className='tabHome'>
            <TabPane tab='Watchlist' key='1'>
              <WatchList />
            </TabPane>
            <TabPane tab='Market' key='2'>
              Market
            </TabPane>
          </Tabs>
        </div>
        <div className='my-[12px] flex items-center pl-[16px] filter'>
          <Text type='body-16-bold' color='neutral-2' className='mr-[12px]'>
            News feed
          </Text>
          <ModalFilter run={run} />
        </div>
        <div>
          <NewsFeed />
        </div>
        <div className='mt-[2px] bg-[#ffffff] px-[16px] py-[10px]'>
          <Trending />
        </div>
        <div className='mt-[2px] bg-[#ffffff] px-[16px]'>
          <Text type='body-16-bold' color='neutral-2' className='mb-[14px] pt-[20px]'>
            People in spotlight
          </Text>
          <div className='flex gap-[15px] pb-[15px]'>
            <Influencer />
            <Influencer />
          </div>
          <button className='h-[45px] w-full rounded-[8px] bg-[#F0F7FC]'>
            <Text type='body-14-bold' color='primary-2'>
              Explore influencer
            </Text>
          </button>
          <div className='mt-[15px] flex flex-row items-center'>
            <Image
              src='/static/icons/iconPeople.svg'
              alt=''
              width='0'
              height='0'
              className='mr-2 w-[14px]'
            />
            <Text type='body-12-regular'>People you may know</Text>
          </div>
        </div>
        <div className='bg-[#ffffff] pl-[6px] pt-[15px]'>
          <PeopleList />
        </div>
        <div className='bg-[#ffffff] pl-[16px]'>
          <Text type='body-16-bold' color='neutral-2' className='py-[16px]'>
            Economy in the themes
          </Text>
          <ListTheme />
        </div>
      </div>
    </div>
  );
}

export default Home;
