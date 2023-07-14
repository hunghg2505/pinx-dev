import React from 'react';

import { useTranslation } from 'next-i18next';

const PreViewStory = ({ content }: { content: string }) => {
  const { t } = useTranslation('profile');
  return (
    <div className='rounded-[8px] bg-primary_bgblue_2 px-[16px] py-[12px]'>
      <p className='mb-[13px] w-full text-[12px] line-clamp-2'>{content}</p>
      <button className='flex items-center text-[12px]'>
        <span className='text-[12px] font-[600] text-primary_blue'>{t('my_story')}</span>
        <svg
          className='h-[18px] w-[18px]'
          width='28'
          height='28'
          viewBox='0 0 28 28'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10.5 21L17.5 14L10.5 7'
            stroke='#1F6EAC'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </div>
  );
};
export default PreViewStory;
