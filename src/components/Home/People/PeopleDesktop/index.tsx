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
    return <></>;
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
