import React from 'react';

import { useOpenSearch } from '@store/headerSearch/headerSearch';

const ButtonSearch = () => {
  const [isOpenSearch, setIsOpenSearch] = useOpenSearch();

  if (isOpenSearch) {
    return <></>;
  }

  return (
    <button
      onClick={() => setIsOpenSearch(!isOpenSearch)}
      className='h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#F8F8F8] laptop:hidden'
    >
      <img
        src='/static/icons/search-gray.svg'
        alt='Search icon'
        className='m-auto h-[22px] w-[22px]'
      />
    </button>
  );
};

export default ButtonSearch;
