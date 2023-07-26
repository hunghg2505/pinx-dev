import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import ModalPeopleYouKnow from '@components/Explore/ModalPeopleYouKnow';
import MarketDesktop from '@components/Home/Market/MarketDesktop';
import PeopleDesktop from '@components/Home/People/PeopleDesktop';
import TrendingDesktop from '@components/Home/Trending/TrendingDesktop';
import { Button } from '@components/UI/Button';
import IconPlus from '@components/UI/Icon/IconPlust';
import Text from '@components/UI/Text';
import ComponentWatchList from '@components/WatchList/ComponentWatchList';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { getAccessToken } from '@store/auth';
import { ROUTE_PATH } from '@utils/common';

const WatchList = () => {
  const router = useRouter();

  return (
    <div className='rounded-[8px] bg-white '>
      <ComponentWatchList
        isEdit={false}
        page_size={5}
        footer={(list) => {
          if (list?.length) {
            return (
              <Button
                className='mt-4 h-[40px] w-full rounded-[5px] bg-[#F0F7FC]'
                onClick={() => router.push(ROUTE_PATH.WATCHLIST)}
              >
                <Text color='primary-2'>View more</Text>
              </Button>
            );
          }

          return (
            <Button
              className='mt-4 flex h-[68px] w-full items-center justify-center gap-[10px] rounded-[12px] border-[1px] border-dashed border-[var(--primary-lightblue,#589DC0)] bg-[#FFF] [box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'
              onClick={() => router.push(ROUTE_PATH.REGISTER_COMPANY)}
            >
              <IconPlus />
              <Text color='primary-2'>Add favorite stock</Text>
            </Button>
          );
        }}
      />
    </div>
  );
};

const ContentRight = () => {
  const { t } = useTranslation('common');
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
          <Text type='body-16-bold' color='cbblack' className='mb-4'>
            {userLoginInfo?.displayName}
            {t('user_watchlist')}
          </Text>
          <WatchList />
        </div>
      )}

      {!isProfilePath && (
        <div className='mb-[25px] rounded-[8px] bg-[#FFFFFF] p-[20px] pt-[30px] [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)]'>
          <Text type='body-16-bold' color='cbblack' className='mb-[15px]'>
            {t('trending')}
          </Text>
          <TrendingDesktop />
        </div>
      )}

      {isLogin && !isProfilePath && (
        <div className='mb-[25px] rounded-[8px] bg-[#FFFFFF] p-[20px] pt-[30px] [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)]'>
          <Text type='body-16-bold' color='cbblack' className='mb-[25px]'>
            {t('people_you_may_know')}
          </Text>
          <PeopleDesktop />
          <ModalPeopleYouKnow>
            <div className='mt-[15px] flex h-[40px] w-full flex-row items-center justify-center rounded-[5px] bg-[#F0F7FC]'>
              <Text type='body-14-bold' color='primary-2'>
                {t('view_more')}
              </Text>
            </div>
          </ModalPeopleYouKnow>
        </div>
      )}
    </div>
  );
};
export default ContentRight;
