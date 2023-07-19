import React from 'react';

import { useTranslation } from 'next-i18next';

const NotFound = () => {
  const { t } = useTranslation('profile');
  return (
    <div className='width-[100%]  border-pr justify-center rounded-[12px] border border-dashed border-primary_light_blue bg-primary_bgblue_2 p-[12px] py-[24px]'>
      <img
        src='/static/icons/Lotus-blue.svg'
        alt=''
        className='mx-auto mb-[10px] h-[24px] w-[24px]'
      />
      <p className='line-[16px] mx-auto w-[225px] text-center text-[12px] text-dark_grey'>
        {t('follower_notfound')}
      </p>
    </div>
  );
};
export default NotFound;
