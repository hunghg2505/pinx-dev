import React from 'react';

import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { ROUTE_PATH } from '@utils/common';

const EditDeskTop = () => {
  const { t } = useTranslation('profile');
  return (
    <div className=' absolute bottom-[calc(100%+19px)] right-[16px]  hidden text-right tablet:bottom-0 tablet:right-0 tablet:block'>
      <div className='mr-[10px] flex h-[36px] w-[89px] cursor-pointer flex-row items-center justify-center  rounded-[5px] bg-blue_light tablet:flex'>
        <Link
          href={ROUTE_PATH.EDIT_MY_PROFILE}
          className='ml-1 text-[12px] font-[700] text-primary_blue'
        >
          {t('edit_profile')}
        </Link>
      </div>
    </div>
  );
};
export default EditDeskTop;
