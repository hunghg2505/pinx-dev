import React, { useContext } from 'react';

import { useTranslation } from 'next-i18next';

import { profileUserContext } from '@components/Profile';

import CloseIcon from '../CloseIcon';

const Normal = ({ closeStory }: { closeStory: () => void }) => {
  const profileUser = useContext<any>(profileUserContext);
  const { t } = useTranslation('profile');
  return (
    <article className='min-[375px] w-screen max-w-[min(calc(100vw-32px),375px)] overflow-hidden rounded-[12px] bg-white'>
      <header className='relative '>
        <h1 className='pt-[20px] text-center text-[20px] font-[600]'>{t('story')}</h1>
        <button className='absolute right-[20px] top-[20px] stroke-neutral_05' onClick={closeStory}>
          <CloseIcon />
        </button>
      </header>
      <hr className='mb-[24px] mt-[12px] border-neutral_07' />
      <main className='  px-[12px] pb-[20px] '>
        <p className='liner-[21px] mb-[16px] h-[268px] w-full overflow-auto text-[16px] text-neutral_black whitespace-pre-line'>
          {profileUser?.caption}
        </p>
      </main>
    </article>
  );
};
export default Normal;
