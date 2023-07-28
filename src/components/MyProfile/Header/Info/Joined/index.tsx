import React from 'react';

import { useTranslation } from 'next-i18next';

const Joined = ({ year }: { year: number }) => {
  const { t } = useTranslation('profile');
  return (
    <p className='mt-[8px] text-right text-[12px] text-primary_gray'>
      {t('joined')} <span>{year}</span>
    </p>
  );
};
export default Joined;
