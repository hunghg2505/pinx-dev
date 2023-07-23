import React from 'react';

import { useTranslation } from 'next-i18next';

const NotFound = () => {
  const { t } = useTranslation('profile');
  return (
    <div className='width-[100%] border-pr justify-center rounded-[12px] border border-dashed border-primary_light_blue bg-[#F0F7FC] p-[12px] py-[24px] mt-[41px]'>
      <img src='/static/icons/chat.svg' alt='' className='mx-auto mb-[10px] h-[24px] w-[24px]' />
      <p className='line-[16px] mx-auto w-[203px] text-center text-[10px] text-dark_grey tablet:w-[270px] tablet:text-[12px]'>
        {t('post_notfound')}
      </p>
    </div>
  );
};
export default NotFound;
