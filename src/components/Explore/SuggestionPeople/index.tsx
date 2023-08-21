import React from 'react';

import { useTranslation } from 'next-i18next';

import PeopleList from '@components/Home/People/PeopleList';
import { useSuggestPeople } from '@components/Home/service';
import { ExploreButton } from '@components/UI/Button';
import Text from '@components/UI/Text';
import { getAccessToken } from '@store/auth';

import ModalPeopleYouKnow from '../ModalPeopleYouKnow';

const SuggestionPeople = () => {
  const { t } = useTranslation(['theme', 'explore']);
  const isLogin = !!getAccessToken();
  const { suggestionPeople, getSuggestFriend, refreshList } = useSuggestPeople();
  React.useEffect(() => {
    if (isLogin) {
      getSuggestFriend();
    }
  }, []);
  if (!suggestionPeople) {
    return <></>;
  }
  return (
    <div className='box-shadow card-style tablet:hidden'>
      <>
        <div className='mr-[16px] flex flex-row items-center'>
          <img
            src='/static/icons/iconPeople.svg'
            alt=''
            width={20}
            height={20}
            className='mr-[8px] h-[20px] w-[20px] object-contain'
          />
          <Text type='body-16-bold' color='neutral-2'>
            {t('people_you_may_know')}
          </Text>
        </div>

        <div className='block'>
          <div className='mb-[16px] bg-[#ffffff] pt-[15px]'>
            <PeopleList data={suggestionPeople} refresh={refreshList} />
          </div>
          <ModalPeopleYouKnow refreshList={refreshList}>
            <ExploreButton>
              <Text type='body-14-bold' color='primary-2'>
                {t('explore_people')}
              </Text>
            </ExploreButton>
          </ModalPeopleYouKnow>
          <div className='mb-[18px] block w-full'></div>
        </div>
      </>
    </div>
  );
};
export default SuggestionPeople;
