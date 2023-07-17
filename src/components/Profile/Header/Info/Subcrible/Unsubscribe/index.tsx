import React from 'react';

import { useTranslation } from 'next-i18next';

const Unsubscribe = () => {
  const { t } = useTranslation('profile');

  return (
    <>
      <div className='mr-[10px] flex h-[36px] w-[89px] flex-row items-center justify-center rounded-[5px]  bg-neutral_08 tablet:flex'>
        <span className='ml-1 text-[12px] font-[700] text-neutral_05'>{t('following')}</span>
      </div>
    </>
  );
};
export default Unsubscribe;
