import React from 'react';

import { useTranslation } from 'next-i18next';

const EditDeskTop = () => {
  const { t } = useTranslation('profile');
  return (
    <div className=' absolute bottom-[calc(100%+19px)] right-[16px]  text-right tablet:bottom-0 tablet:right-0 hidden tablet:block'>
      <div className='mr-[10px] flex h-[36px] w-[89px] cursor-pointer flex-row items-center justify-center  rounded-[5px] bg-blue_light tablet:flex'>
        <span className='ml-1 text-[12px] font-[700] text-primary_blue'>{t('edit_profile')}</span>
      </div>
    </div>
  );
};
export default EditDeskTop;
