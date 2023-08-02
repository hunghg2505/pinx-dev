import React, { ChangeEvent, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import SearchIcon from './SearchIcon';

const Search = ({ fullName: fullNameProps }: { fullName: string }) => {
  const { t } = useTranslation('profile');
  const { push, query } = useRouter();
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fullName) {
      push({ query: { ...query, fullName } });
    } else {
      delete query.fullName;
      push({ query: { ...query } });
    }
  };

  useEffect(() => {
    setFullName(fullNameProps);
  }, [fullNameProps]);

  return (
    <form onSubmit={handleSubmit}>
      <label className='mb-[20px] flex border-b-2 border-solid border-neutral_07 px-[8px] py-[10px]'>
        <input
          className='flex-1 outline-none'
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder={t('search_placeholder')}
        />
        <button>
          <SearchIcon />
        </button>
      </label>
    </form>
  );
};
export default Search;
