import React from 'react';

import { ISuggestionPeople } from '@components/Home/service';
import { getAccessToken } from '@store/auth';

import ItemPeople from './ItemPeople';
import PeopleDesktopLoading from './Skeleton';

interface IPeopleDesktopProps {
  suggestionPeople: any;
  getSuggestFriend: () => void;
  refreshList: () => void;
}

const PeopleDesktop = ({
  suggestionPeople,
  getSuggestFriend,
  refreshList,
}: IPeopleDesktopProps) => {
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
        <div className='mb-[25px] h-[200px] w-full rounded-[8px] bg-[#fff]  '>
          <PeopleDesktopLoading />
          <PeopleDesktopLoading />
          <PeopleDesktopLoading />
        </div>
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
