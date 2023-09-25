import React from 'react';

import FormSearch from '@layout/components/MainHeader/FormSearch';
import { useOpenSearch } from '@store/headerSearch/headerSearch';

const SearchInput = () => {
  const [isOpenSearch, setIsOpenSearch] = useOpenSearch();

  return (
    <>
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

      <FormSearch setIsOpenSearch={setIsOpenSearch} isOpenSearch={isOpenSearch} />
    </>
  );
};

export default SearchInput;
