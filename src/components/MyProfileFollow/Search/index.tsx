import React, { useRef } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import SearchIcon from './SearchIcon';

const Search = () => {
  const { t } = useTranslation('profile');
  const { push, query } = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <label className='mb-[20px] flex border-b-2 border-solid border-neutral_07 px-[8px] py-[10px]'>
      <input
        ref={inputRef}
        className='flex-1 outline-none'
        type='text'
        placeholder={t('search_placeholder')}
      />
      <button
        onClick={() => {
          if (inputRef?.current?.value) {
            push({ query: { ...query, search: inputRef?.current?.value } });
          } else {
            delete query.search;
            push({ query: { ...query } });
          }
        }}
      >
        <SearchIcon />
      </button>
    </label>
  );
};
export default Search;
