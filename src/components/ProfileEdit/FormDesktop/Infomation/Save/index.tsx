import React, { createContext } from 'react';

import { useTranslation } from 'next-i18next';

export const profileUserContext = createContext(undefined);

const Save = () => {
  const { t } = useTranslation('editProfile');
  return (
    <div className='flex justify-end mt-[20px]'>
      <button
        type='submit'
        className='line-[18px] ml-auto rounded-[8px] bg-gradient-to-r from-[#589DC0] to-[#1D6CAB] px-[24px] py-[12px] text-[14px] font-[700]
       text-white'
      >
        {t('save')}
      </button>
    </div>
  );
};
export default Save;
