import React from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import ModalPeopleYouKnow from '@components/Explore/ModalPeopleYouKnow';
import PeopleDesktop from '@components/Home/People/PeopleDesktop';
import Text from '@components/UI/Text';
import { getAccessToken } from '@store/auth';
import { ROUTE_PATH } from '@utils/common';

import { useSuggestPeople } from '../service';

const MarketDesktop = dynamic(() => import('@components/Home/Market/MarketDesktop'));
const TrendingDesktop = dynamic(() => import('@components/Home/Trending/TrendingDesktop'));
const WatchList = dynamic(() => import('@components/Home/WatchList'));
const ContentRight = () => {
  const router = useRouter();
  const isPageWatchList = router?.pathname === ROUTE_PATH.WATCHLIST;

  const { suggestionPeople, getSuggestFriend } = useSuggestPeople();
  const isLogin = !!getAccessToken();
  React.useEffect(() => {
    if (isLogin) {
      getSuggestFriend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className='w-full'>
        <div className='mb-[25px] rounded-[8px] bg-[#FFFFFF] p-[20px] pt-[30px] [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)]'>
          <Text type='body-16-bold' color='cbblack' className='mb-[25px]'>
            Market
          </Text>
          <MarketDesktop />
        </div>

        {isLogin && !isPageWatchList && (
          <div className='mb-[25px] rounded-[8px] bg-[#FFFFFF] p-[20px] pt-[30px] [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)]'>
            <Text type='body-16-bold' color='cbblack' className='mb-[25px]'>
              Watchlist
            </Text>
            <WatchList />
          </div>
        )}
        <div className='mb-[25px] rounded-[8px] bg-[#FFFFFF] p-[20px] pt-[30px] [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)]'>
          <Text type='body-16-bold' color='cbblack' className='mb-[15px]'>
            Trending
          </Text>
          <TrendingDesktop />
        </div>
        {isLogin && suggestionPeople && (
          <div className='mb-[25px] rounded-[8px] bg-[#FFFFFF] p-[20px] pt-[30px] [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)]'>
            <Text type='body-16-bold' color='cbblack' className='mb-[25px]'>
              People you may know
            </Text>
            <PeopleDesktop />
            <ModalPeopleYouKnow>
              <div className='mt-[15px] flex h-[40px] w-full flex-row items-center justify-center rounded-[5px] bg-[#F0F7FC]'>
                <Text type='body-14-bold' color='primary-2'>
                  View more
                </Text>
              </div>
            </ModalPeopleYouKnow>
          </div>
        )}
      </div>
    </>
  );
};
export default ContentRight;
