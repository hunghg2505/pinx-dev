import React, { createContext } from 'react';

import { useTranslation } from 'next-i18next';

export const profileUserContext = createContext(undefined);

const Save = () => {
  const { t } = useTranslation('editProfile');
  return (
    <button type='submit' className='line-[18px] text-[14px] font-[700] text-primary_blue'>
      {t('save')}
    </button>
  );
};
export default Save;
