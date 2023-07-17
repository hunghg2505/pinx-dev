import React, { useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import NotFound from './NotFound';
import Search from './Search';

const ProfileSearch = () => {
  const { t } = useTranslation('profile');
  const [states, setState] = useState({
    tab: 'follower',
  });

  return (
    <>
      <header className='mb-[24px] flex px-[16px] py-[16px] align-middle text-[16px]'>
        <img
          src='/static/icons/chevron-left.svg'
          alt='avatar'
          className='absolute left-[16px] top-[16px] inline w-[18.67px] rounded-full'
          width={18.67}
          height={18.67}
        />
      </header>
      <main className='px-[16px]'>
        <div className='mb-[20px] flex gap-[32px] '>
          <span
            className={classNames('text-[22px] font-[700] transition duration-300 ease-in-out', {
              'text-neutral_06': states.tab !== 'follower',
            })}
            onClick={() => {
              setState((prev_state) => ({ ...prev_state, tab: 'follower' }));
            }}
          >
            {t('follower')}
          </span>
          <span
            className={classNames('text-[22px] font-[700] transition duration-300 ease-in-out', {
              'text-neutral_06': states.tab !== 'following',
            })}
            onClick={() => {
              setState((prev_state) => ({ ...prev_state, tab: 'following' }));
            }}
          >
            {t('following')}
          </span>
        </div>
        <Search />
        <div>
          {states.tab === 'follower' && <>Followler Tabs</>}
          {states.tab === 'following' && <>Following Tabs</>}
        </div>
        <NotFound />
      </main>
    </>
  );
};
export default ProfileSearch;
