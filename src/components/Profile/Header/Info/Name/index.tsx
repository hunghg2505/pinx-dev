import React, { useContext } from 'react';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { profileUserContext } from '@components/Profile';

const Name = () => {
  const { t } = useTranslation('profile');
  const profileUser = useContext<any>(profileUserContext);
  return (
    <>
      <div className='mb-[4px] flex gap-[16px] tablet:absolute  tablet:bottom-[calc(100%+32px)]'>
        <h3 className='text-[20px] font-[600]'>{profileUser?.displayName}</h3>
        {profileUser?.isKol && (
          <span className='flex items-center gap-[4px] rounded-[4px] border border-solid border-light_orange py-[2px] pl-[4px] pr-[7px] text-light_orange'>
            <Image
              src='/static/icons/iconStarFollow.svg'
              width={16}
              height={16}
              alt='star'
              className='h-[16px] w-[16px]'
            />
            {t('star')}
          </span>
        )}
      </div>
    </>
  );
};
export default Name;
