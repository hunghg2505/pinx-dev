import { useRouter } from 'next/router';

import ModalPeopleYouKnow from '@components/Explore/ModalPeopleYouKnow';
import MarketDesktop from '@components/Home/Market/MarketDesktop';
import PeopleDesktop from '@components/Home/People/PeopleDesktop';
import TrendingDesktop from '@components/Home/Trending/TrendingDesktop';
import { Button } from '@components/UI/Button';
import Text from '@components/UI/Text';
import ComponentWatchList from '@components/WatchList/ComponentWatchList';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { getAccessToken } from '@store/auth';
import { ROUTE_PATH } from '@utils/common';

const WatchList = () => {
  const router = useRouter();

  return (
    <div className='flex flex-col gap-y-[32px] rounded-[8px] bg-white '>
      <ComponentWatchList isEdit={false} />

      <Button
        className='h-[40px] w-full rounded-[5px] bg-[#F0F7FC]'
        onClick={() => router.push(ROUTE_PATH.WATCHLIST)}
      >
        <Text color='primary-2'>View more</Text>
      </Button>
    </div>
  );
};

const ContentRight = () => {
  const router = useRouter();
  const isPageWatchList = router?.pathname === ROUTE_PATH.WATCHLIST;
  const { userLoginInfo } = useUserLoginInfo();

  const isLogin = !!getAccessToken();

  const isProfilePath = router?.pathname === ROUTE_PATH.MY_PROFILE;

  return (
    <div className='max-w-[350px]'>
      {!isProfilePath && <MarketDesktop />}

      {isLogin && !isPageWatchList && (
        <div className='mb-[25px] rounded-[8px] bg-[#FFFFFF] p-[20px] pt-[30px] [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)]'>
          <Text type='body-16-bold' color='cbblack' className='mb-[25px]'>
            {userLoginInfo?.displayName}&apos;s Watchlist
          </Text>
          <WatchList />
        </div>
      )}

      {!isProfilePath && (
        <div className='mb-[25px] rounded-[8px] bg-[#FFFFFF] p-[20px] pt-[30px] [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)]'>
          <Text type='body-16-bold' color='cbblack' className='mb-[15px]'>
            Trending
          </Text>
          <TrendingDesktop />
        </div>
      )}

      {isLogin && !isProfilePath && (
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
  );
};
export default ContentRight;
