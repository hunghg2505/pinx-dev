import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import ModalPeopleYouKnow from '@components/Explore/ModalPeopleYouKnow';
import MarketDesktop from '@components/Home/Market/MarketDesktop';
import PeopleDesktop from '@components/Home/People/PeopleDesktop';
import TrendingDesktop from '@components/Home/Trending/TrendingDesktop';
import { Button } from '@components/UI/Button';
import CustomLink from '@components/UI/CustomLink';
import IconPlus from '@components/UI/Icon/IconPlus';
import Text from '@components/UI/Text';
import ComponentWatchList from '@components/WatchList/ComponentWatchList';
import { getAccessToken } from '@store/auth';
import { ROUTE_PATH } from '@utils/common';

import { useSuggestPeople } from '../service';

const WatchList = () => {
  const { t } = useTranslation('common');

  return (
    <div className='rounded-[8px] bg-white '>
      <ComponentWatchList
        isEdit={false}
        page_size={5}
        footer={(list) => {
          if (list?.length) {
            return (
              <CustomLink href={ROUTE_PATH.WATCHLIST}>
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
  const { suggestionPeople, getSuggestFriend, refreshList } = useSuggestPeople();
  const { t } = useTranslation('common');
  const router = useRouter();
  const isPageWatchList = router?.pathname === ROUTE_PATH.WATCHLIST;

  const isLogin = !!getAccessToken();

  const isProfilePath = router?.pathname === ROUTE_PATH.MY_PROFILE;

  return (
    <div className='max-w-[350px]'>
      {!isProfilePath && <MarketDesktop />}

      {isLogin && !isPageWatchList && (
        <div className='box-shadow card-style mb-[25px] rounded-[8px] bg-[#FFFFFF] p-[20px] pt-[30px]'>
          <Text type='body-16-bold' color='cbblack' className='mb-4'>
            {t('user_watchlist')}
          </Text>
          <WatchList />
        </div>
      )}

      {!isProfilePath && (
        <div className='box-shadow card-style mb-[25px] rounded-[8px] bg-[#FFFFFF] p-[20px] pt-[30px]'>
          <Text type='body-16-bold' color='cbblack' className='mb-[15px]'>
            {t('trending')}
          </Text>
          <TrendingDesktop />
        </div>
      )}

      {isLogin && !isProfilePath && (
        <div className='box-shadow card-style mb-[25px] rounded-[8px] bg-[#FFFFFF] p-[20px] pt-[30px]'>
          <Text type='body-16-bold' color='cbblack' className='mb-[25px]'>
            {t('people_you_may_know')}
          </Text>
          <PeopleDesktop
            suggestionPeople={suggestionPeople}
            refreshList={refreshList}
            getSuggestFriend={getSuggestFriend}
          />
          <ModalPeopleYouKnow refreshList={refreshList}>
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
