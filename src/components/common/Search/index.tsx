import React, { useEffect, useState } from 'react';

import { useDebounce } from 'ahooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import SearchIcon from './SearchIcon';

interface ISearch {
  onSearchChange: (fullName: string) => void;
}

const Search = ({ onSearchChange }: ISearch) => {
  const { t } = useTranslation('profile');
  const [fullName, setFullName] = useState('');
  const debouncedValue = useDebounce(fullName, { wait: 500 });

  const router = useRouter();
  const { tab } = router.query;

  // useEffect(() => {
  //   return () => {
  //     fullName && setFullName('');
  //   };
  // }, [tab]);

  useEffect(() => {
    onSearchChange(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    fullName && setFullName('');
  }, [tab]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label className='mb-[20px] flex gap-[8px]  rounded-[8px] border-[1px] border-solid border-neutral_07 px-[8px] py-[10px] '>
        <button>
          <SearchIcon />
        </button>
        <input
          className='flex-1 outline-none'
          type='text'
          placeholder={t('search_placeholder')}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </label>
    </form>
  );
};
export default Search;
