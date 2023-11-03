import React from 'react';

import FormSearch from '@layout/components/MainHeader/FormSearch';
import { useOpenSearch } from '@store/headerSearch/headerSearch';

const SearchInput = () => {
  const [isOpenSearch, setIsOpenSearch] = useOpenSearch();

  return <FormSearch setIsOpenSearch={setIsOpenSearch} isOpenSearch={isOpenSearch} />;
};

export default SearchInput;
