import React, { useRef } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import SearchIcon from './SearchIcon';

const Search = () => {
  const { t } = useTranslation('profile');
  const { push, query } = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <label className='mb-[20px] flex gap-[8px]  rounded-[8px] border-[1px] border-solid border-neutral_07 px-[8px] py-[10px] '>
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
      <input
        ref={inputRef}
        className='flex-1 outline-none'
        type='text'
        placeholder={t('search_placeholder')}
        onKeyPress={(k: any) => {
          if (k.key === 'Enter') {
            if (inputRef?.current?.value) {
              push({ query: { ...query, search: inputRef?.current?.value } });
            } else {
              delete query.search;
              push({ query: { ...query } });
            }
          }
        }}
      />
    </label>
  );
};
export default Search;
