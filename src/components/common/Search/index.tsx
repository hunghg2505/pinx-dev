import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import SearchIcon from './SearchIcon';

const Search = ({ fullName: fullNameParams }: { fullName: string }) => {
  const [fullName, setFullName] = useState(fullNameParams);
  const { t } = useTranslation('profile');
  const { push, query } = useRouter();
  const { tab } = query;

  useEffect(() => {
    return () => {
      fullName && setFullName('');
    };
  }, [tab]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (fullName) {
          push({ query: { ...query, fullName } });
        } else {
          delete query.fullName;
          push({ query: { ...query } });
        }
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
