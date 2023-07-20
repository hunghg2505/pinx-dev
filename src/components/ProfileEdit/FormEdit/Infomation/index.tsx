import React, { createContext } from 'react';

import { useTranslation } from 'next-i18next';

import Bio from './Bio';
import DisplayName from './DisplayName';
import JobsTitle from './JobsTitle';

export const profileUserContext = createContext(undefined);

const Info = () => {
  const { t } = useTranslation('editProfile');
  return (
    <div className='bg-white px-[16px] pb-[24px] pt-[16px]'>
      <h1 className='line-[700]  mb-[24px] text-[22px] font-[700] text-neutral_black'>
        {t('information')}
      </h1>
      <DisplayName />
      <JobsTitle />
      <Bio />
    </div>
  );
};
export default Info;
