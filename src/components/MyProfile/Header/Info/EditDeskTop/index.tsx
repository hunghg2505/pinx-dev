import React, { useMemo } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import { ROUTE_PATH } from '@utils/common';

const EditDeskTop = () => {
  const router = useRouter();
  const { profileSlug }: any = router.query;
  const userId = useMemo(() => {
    return profileSlug.split('-').pop();
  }, [profileSlug]);

  const { t } = useTranslation('profile');
  return (
    <div className='hidden text-right tablet:bottom-0 tablet:right-0 tablet:block'>
      <CustomLink
        href={ROUTE_PATH.EDIT_MY_PROFILE_V2(userId)}
        className='text-[14px] font-[700] text-primary_blue hover:text-primary_blue'
      >
        <div className='flex cursor-pointer flex-row items-center justify-center rounded-[8px] bg-blue_light  px-[12px] py-[10px] tablet:flex'>
          {t('edit_profile')}
        </div>
      </CustomLink>
    </div>
  );
};
export default EditDeskTop;
