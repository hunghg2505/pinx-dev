import React from 'react';

import { useTranslation } from 'next-i18next';

const IsFeatureProfile = () => {
  const { t } = useTranslation('profile');
  return (
    <>
      <span className='flex items-center gap-[4px] rounded-[4px] border border-solid border-light_orange py-[2px] pl-[4px] pr-[7px] text-light_orange'>
        <img
          src='/static/icons/iconStarFollow.svg'
          width={16}
          height={16}
          alt='star'
          className='h-[16px] w-[16px]'
        />
        {t('star')}
      </span>
    </>
  );
};
export default IsFeatureProfile;
