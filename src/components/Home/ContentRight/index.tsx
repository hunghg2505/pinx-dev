import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import StickyBox from 'react-sticky-box';

import ModalPeopleYouKnow from '@components/Explore/ModalPeopleYouKnow';
import MarketDesktop from '@components/Home/Market/MarketDesktop';
import PeopleDesktop from '@components/Home/People/PeopleDesktop';
import TrendingDesktop from '@components/Home/Trending/TrendingDesktop';
import { Button } from '@components/UI/Button';
import CustomLink from '@components/UI/CustomLink';
import Fade from '@components/UI/Fade';
import IconPlus from '@components/UI/Icon/IconPlus';
import Text from '@components/UI/Text';
import ComponentWatchList from '@components/WatchList/ComponentWatchList';
import { useAuth } from '@store/auth/useAuth';
import { StockSocketLocation, stockSocketAtom } from '@store/stockStocket';
import { ROUTE_PATH } from '@utils/common';
import { ViewWatchlist } from '@utils/dataLayer';

import { useGetInfluencer, useSuggestPeople } from '../service';

const WatchList = () => {
  const { t } = useTranslation('common');
  const watchList = useAtomValue(stockSocketAtom);

  // tracking event view watch list
  const handleTracking = () => {
    const listStockCodes =
      watchList.find((item) => item.location === StockSocketLocation.WATCH_LIST_COMPONENT_LAYOUT)
        ?.stocks || [];

    ViewWatchlist(
      'Default',
      'Normal WL',
      listStockCodes,
      listStockCodes.length,
      'Right sidebar layout',
    );
  };

  return (
    <div className='rounded-[8px] bg-white '>
      <ComponentWatchList
        isEdit={false}
        page_size={5}
        footer={(list) => {
          if (list?.length) {
            return (
              <CustomLink href={ROUTE_PATH.WATCHLIST} onClick={handleTracking}>
                <Button className='mt-4 h-[40px] w-full rounded-[5px] bg-[#F0F7FC]'>
                  <Text type='body-14-bold' color='primary-2'>
                    {t('view_more')}
                  </Text>
                </Button>
              </CustomLink>
            );
          }

          return (
            <CustomLink href={ROUTE_PATH.REGISTER_COMPANY}>
              <Button className='mt-4 flex h-[68px] w-full items-center justify-center gap-[10px] rounded-[12px] border-[1px] border-dashed border-[var(--primary-lightblue,#589DC0)] bg-[#FFF] [box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
                <IconPlus />
                <Text color='primary-2'>{t('add_favorite_stock')}</Text>
              </Button>
            </CustomLink>
          );
        }}
      />
    </div>
  );
};

const ContentRight = () => {
  const { suggestionPeople, getSuggestFriend, refreshList } = useSuggestPeople({
    // staleTime: -1,
    cacheKey: 'data-suggestionPeople',
  });
  const { refresh } = useGetInfluencer({ cacheKey: 'data-influencer' });

  const { t } = useTranslation('common');
  const router = useRouter();
  const isPageWatchList = router?.pathname === ROUTE_PATH.WATCHLIST;
  const { isLogin } = useAuth();

  const isProfilePath = router?.pathname === ROUTE_PATH.MY_PROFILE;

  return (
    <StickyBox offsetTop={110} offsetBottom={20}>
      <div className='max-w-[350px]'>
        <Fade visible={!isProfilePath}>
          <MarketDesktop />
        </Fade>

        <Fade visible={isLogin && !isPageWatchList}>
          <div className='box-shadow card-style mb-[25px] rounded-[8px] bg-[#FFFFFF] p-[20px] pt-[30px]'>
            <Text element='h2' type='body-16-bold' color='cbblack' className='mb-4'>
              {t('user_watchlist')}
            </Text>
            <WatchList />
          </div>
        </Fade>

        <Fade visible={!isProfilePath}>
          <div className='box-shadow card-style mb-[25px] rounded-[8px] bg-[#FFFFFF] p-[20px] pt-[30px]'>
            <Text element='h5' type='body-16-bold' color='cbblack' className='mb-[15px]'>
              {t('trending')}
            </Text>
            <TrendingDesktop />
          </div>
        </Fade>

        <Fade visible={isLogin && !isProfilePath}>
          <div className='box-shadow card-style mb-[25px] rounded-[8px] bg-[#FFFFFF] p-[20px] pt-[30px]'>
            <Text element='h6' type='body-16-bold' color='cbblack' className='mb-[25px]'>
              {t('people_you_may_know')}
            </Text>
            <PeopleDesktop
              suggestionPeople={suggestionPeople}
              refreshList={refreshList}
              getSuggestFriend={getSuggestFriend}
              refresh={refresh}
            />
            {suggestionPeople?.length && (
              <ModalPeopleYouKnow refreshList={refreshList}>
                <div className='mt-[15px] flex h-[40px] w-full flex-row items-center justify-center rounded-[5px] bg-[#F0F7FC]'>
                  <Text type='body-14-bold' color='primary-2'>
                    {t('view_more')}
                  </Text>
                </div>
              </ModalPeopleYouKnow>
            )}
          </div>
        </Fade>
      </div>
    </StickyBox>
  );
};
export default ContentRight;
