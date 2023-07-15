import React, { useContext } from 'react';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { profileUserContext } from '@components/Profile';

const Info = () => {
  const { t } = useTranslation('profile');
  const profileUser = useContext<any>(profileUserContext);

  return (
    <div className='px-[16px]'>
      <div className='mb-[4px] flex gap-[16px]'>
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
            Star
          </span>
        )}
      </div>
      <p className='mb-[21px] text-[12px] font-[400]'>{profileUser?.position}</p>
      <div className='mb-[5px] flex gap-[8px]'>
        <p>
          <b className='mr-[8px]'>{profileUser?.totalFollower || 0}</b>
          {t('follower')}
        </p>
        <span>&bull;</span>
        <p>
          <b className='mr-[8px]'>{profileUser?.totalFollowing || 0}</b>
          {t('following')}
        </p>
      </div>
      <p className='text-[10px] text-primary_gray'>
        {t('joined', { year: new Date(profileUser?.createdAt)?.getFullYear() })}
      </p>
    </div>
  );
};
export default Info;
