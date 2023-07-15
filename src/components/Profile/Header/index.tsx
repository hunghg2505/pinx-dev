import React, { useContext } from 'react';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { profileUserContext } from '..';

const Header = ({ isMe }: { isMe: boolean }) => {
  const { t } = useTranslation('profile');
  const profileUser = useContext<any>(profileUserContext);

  return (
    <header className='mb-[32px]'>
      <div className='relative mb-[72px] w-full pt-[41%]'>
        {profileUser?.coverImage && (
          <Image
            src={profileUser?.coverImage}
            alt='background cover'
            className='absolute h-full w-full object-cover'
            fill
          />
        )}
        {profileUser?.avatar && (
          <Image
            src={profileUser?.avatar}
            alt='background cover'
            className='absolute bottom-[0%] left-[16px] z-10 h-[113px] w-[113px] translate-y-[50%] rounded-full bg-white p-[5px]'
            width={113}
            height={113}
          />
        )}
        {!isMe && (
          <div className=' absolute bottom-[-66px] right-[16px] mb-[20px] text-right'>
            <>
              {!profileUser?.isFollowed && (
                <button className='ml-auto flex items-center justify-end gap-[8px] rounded-[100px] border border-solid border-primary_06 bg-primary_bgblue_2 px-[14px] py-[6px] text-primary_blue'>
                  <img
                    src='/static/icons/user-plus-02.svg'
                    alt=''
                    width={20}
                    height={20}
                    className='w-[20px] object-cover'
                  />
                  <span className='text-[12px] font-[600]'>{t('follow')}</span>
                </button>
              )}
            </>
          </div>
        )}
      </div>
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
    </header>
  );
};
export default Header;
