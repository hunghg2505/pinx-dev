import React from 'react';

import { useTranslation } from 'next-i18next';

const NotFound = ({ type }: { type: number }) => {
  const { t } = useTranslation('profile');
  return (
    <div className='width-[100%]  border-pr justify-center rounded-[12px] border border-dashed border-primary_light_blue bg-primary_bgblue_2 p-[12px] py-[24px]'>
      <img
        src='/static/icons/Lotus-blue.svg'
        alt=''
        className='mx-auto mb-[10px] h-[24px] w-[24px]'
      />
      <p className='line-[16px] mx-auto w-[203] text-center text-[10px] text-dark_grey tablet:w-[250px] tablet:text-[12px]'>
        {type === 1 && t('watchlist_notfound1')}
        {type === 2 && t('watchlist_notfound2')}
        {type === 3 && t('watchlist_notfound3')}
        {type === 4 && t('watchlist_notfound4')}
      </p>
    </div>
  );
};
export default NotFound;
