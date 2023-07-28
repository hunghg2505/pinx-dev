import React from 'react';

import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { ROUTE_PATH } from '@utils/common';

const EditDeskTop = () => {
  const { t } = useTranslation('profile');
  return (
    <div className='hidden text-right tablet:bottom-0 tablet:right-0 tablet:block'>
      <Link
        href={ROUTE_PATH.EDIT_MY_PROFILE}
        className='text-[14px] font-[700] text-primary_blue hover:text-primary_blue'
      >
        <div className='flex cursor-pointer flex-row items-center justify-center rounded-[8px] bg-blue_light  px-[12px] py-[10px] tablet:flex'>
          {t('edit_profile')}
        </div>
      </Link>
    </div>
  );
};
export default EditDeskTop;
