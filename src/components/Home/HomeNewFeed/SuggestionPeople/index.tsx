import React from 'react';

import { useTranslation } from 'next-i18next';

import ModalPeopleYouKnow from '@components/Explore/ModalPeopleYouKnow';
import PeopleList from '@components/Home/People/PeopleList';
import { useSuggestPeople } from '@components/Home/service';
import Text from '@components/UI/Text';
import { getAccessToken } from '@store/auth';

const SuggestionPeople = () => {
  const { t } = useTranslation('home');
  const { suggestionPeople, getSuggestFriend, refreshList, loading } = useSuggestPeople();
  React.useEffect(() => {
    const isLogin = !!getAccessToken();

    if (isLogin) {
      getSuggestFriend();
    }
  }, []);
  return (
    <>
      {suggestionPeople && (
        <div className='box-shadow card-style tablet:hidden'>
          <div className='mr-[16px] flex flex-row items-center'>
            <img
              src='/static/icons/iconPeople.svg'
              alt=''
              width={20}
              height={20}
              className='mr-[8px] h-[20px] w-[20px] object-contain'
            />
            <Text type='body-16-bold' color='neutral-2'>
              {t('People_you_may_know')}
            </Text>
          </div>

          <div>
            <div className='bg-[#ffffff] pl-[16px] pt-[15px] galaxy-max:pl-0'>
              <PeopleList loading={loading} data={suggestionPeople} refresh={refreshList} />
            </div>
            <div className='bg-[#ffffff] pb-[10px] pt-[15px] text-center'>
              <ModalPeopleYouKnow refreshList={refreshList}>
                <button className='mx-[auto] h-[45px] w-[calc(100%_-_32px)] rounded-[8px] bg-[#F0F7FC] galaxy-max:w-full'>
                  <Text type='body-14-bold' color='primary-2'>
                    {t('explore_people')}
                  </Text>
                </button>
              </ModalPeopleYouKnow>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SuggestionPeople;
