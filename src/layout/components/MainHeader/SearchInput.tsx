import React from 'react';

import { useResponsive } from '@hooks/useResponsive';
import FormSearch from '@layout/components/MainHeader/FormSearch';

const SearchInput = ({
  isOpenSearch,
  setIsOpenSearch,
}: {
  isOpenSearch?: boolean;
  setIsOpenSearch?: any;
}) => {
  const { isDesktop } = useResponsive();

  return (
    <>
      <button
        onClick={() => setIsOpenSearch(!isOpenSearch)}
        className='mr-[0] flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#F8F8F8] mobile:block tablet:hidden desktop:mr-[12px]'
      >
        <img
          src='/static/icons/search-gray.svg'
          alt='Search icon'
          className='m-auto h-[22px] w-[22px]'
        />
      </button>

      {isDesktop && <FormSearch className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] mr-[32px] ' />}
    </>
  );
};

export default SearchInput;
