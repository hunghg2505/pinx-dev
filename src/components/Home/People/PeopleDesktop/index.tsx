import React from 'react';

import { useAtom } from 'jotai';

import { ISuggestionPeople } from '@components/Home/service';
import LoadCompVisible from '@components/LoadCompVisible/LoadCompVisible';
import { getAccessToken } from '@store/auth';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';

import ItemPeople from './ItemPeople';
import PeopleDesktopLoading from './Skeleton';

interface IPeopleDesktopProps {
  suggestionPeople: any;
  getSuggestFriend: () => void;
  refreshList: () => void;
  refresh: () => void;
}

const PeopleDesktop = ({
  suggestionPeople,
  getSuggestFriend,
  refreshList,
  refresh,
}: IPeopleDesktopProps) => {
  const [postDetailStatus] = useAtom(postDetailStatusAtom);
  React.useEffect(() => {
    const isLogin = !!getAccessToken();

    if (isLogin) {
      getSuggestFriend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postDetailStatus?.idCustomerFollow]);

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
    <LoadCompVisible>
      {suggestionPeople?.slice(0, 3)?.map((item: ISuggestionPeople, index: number) => {
        return <ItemPeople data={item} key={index} refreshList={refreshList} refresh={refresh} />;
      })}
    </LoadCompVisible>
  );
};
export default PeopleDesktop;
