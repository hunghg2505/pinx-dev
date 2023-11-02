import { useMemo } from 'react';

import { useSize } from 'ahooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
// import lazyLoadComponent from 'next-lazy-component';
import StickyBox from 'react-sticky-box';

// import MarketDesktop from '@components/Home/Market/MarketDesktop';
// import PeopleDesktop from '@components/Home/People/PeopleDesktop';
// import TrendingDesktop from '@components/Home/Trending/TrendingDesktop';
// import { lazyLoadComponent } from '@components/LoadCompVisible';
import lazyLoadHydrate from '@components/LazyComp/LazyComp';
import Fade from '@components/UI/Fade';
import Text from '@components/UI/Text';
import { useUserType } from '@hooks/useUserType';
import { useLogin } from '@store/auth/hydrateAuth';
import { PROFILE_PATH, WATCHLIST } from 'src/constant/route';
import { getMoreInfoTracking } from 'src/mixpanel/mixpanel';

// import WatchList from './WatchList';
import { useGetInfluencer, useSuggestPeople } from '../service';

const ModalPeopleYouKnow = lazyLoadHydrate(
  () => import('@components/Explore/ModalPeopleYouKnow'),
  false,
);
const WatchList = lazyLoadHydrate(() => import('./WatchList'), false);
const MarketDesktop = lazyLoadHydrate(() => import('../Market/MarketDesktop'), false);
const PeopleDesktop = lazyLoadHydrate(() => import('@components/Home/People/PeopleDesktop'), false);
const TrendingDesktop = lazyLoadHydrate(
  () => import('@components/Home/Trending/TrendingDesktop'),
  false,
);

// tracking event get more info
const handleTrackingGetMore = () => {
  getMoreInfoTracking('Right sidebar layout', 'User', 'People you may know');
};
const ContentRight = () => {
  const { suggestionPeople, getSuggestFriend, refreshList } = useSuggestPeople({
    // staleTime: -1,
    cacheKey: 'data-suggestionPeople',
  });
  const { refresh } = useGetInfluencer({ cacheKey: 'data-influencer', manual: true });
  const { t } = useTranslation('common');
  const { userId: userIdLogin } = useUserType();
  const router = useRouter();
  const { profileSlug }: any = router.query;
  const isPageWatchList = router?.pathname === WATCHLIST;
  const { isLogin } = useLogin();

  const isProfilePath = useMemo(() => {
    const userId = profileSlug?.split('-').pop();

    return router?.pathname === PROFILE_PATH && +userId === +userIdLogin;
  }, [router, userIdLogin]);

  const size = useSize(document.querySelector('body'));

  return size && size.width < 768 ? null : (
    <StickyBox offsetTop={110} offsetBottom={20}>
      <div className='max-w-[350px]'>
        <Fade visible={!isProfilePath}>
          <MarketDesktop />
        </Fade>

        <Fade visible={isLogin && !isPageWatchList}>
          <div className='box-shadow card-style mb-[25px] rounded-[8px] bg-[#FFFFFF] p-[20px] pt-[30px]'>
            <Text type='body-16-bold' color='cbblack' className='mb-4'>
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
                <div
                  onClick={handleTrackingGetMore}
                  className='mt-[15px] flex h-[40px] w-full flex-row items-center justify-center rounded-[5px] bg-[#F0F7FC]'
                >
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
