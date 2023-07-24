import React from 'react';

import { ISuggestionPeople, useSuggestPeople } from '@components/Home/service';
import { getAccessToken } from '@store/auth';

import ItemPeople from './ItemPeople';

const PeopleDesktop = () => {
  const { suggestionPeople, getSuggestFriend, refreshList } = useSuggestPeople();

  React.useEffect(() => {
    const isLogin = !!getAccessToken();

    if (isLogin) {
      getSuggestFriend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!suggestionPeople?.length) {
    return (
      <>
        <div className='mb-[25px] h-[496px] w-full rounded-[8px] bg-[#f3f3f3]  px-[30x] py-[20px]  [box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'></div>
      </>
    );
  }

  return (
    <>
      {suggestionPeople?.slice(0, 3)?.map((item: ISuggestionPeople, index: number) => {
        return <ItemPeople data={item} key={index} refreshList={refreshList} />;
      })}
    </>
  );
};
export default PeopleDesktop;
