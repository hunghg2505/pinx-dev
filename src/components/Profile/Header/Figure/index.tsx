import React, { useContext } from 'react';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { profileUserContext } from '@components/Profile';

import Back from './Back';

const Figure = ({ isMe }: { isMe: boolean }) => {
  const { t } = useTranslation('profile');
  const profileUser = useContext<any>(profileUserContext);

  return (
    <div className='tablet:pt-[72px]'>
      <div className='relative mb-[72px] w-full pt-[41%] tablet:pt-[20%]'>
        <Back />
        {profileUser?.coverImage && (
          <Image
            src={profileUser?.coverImage}
            alt='background cover'
            className='absolute h-full w-full object-cover tablet:rounded-[8px]'
            fill
          />
        )}
        {profileUser?.avatar && (
          <Image
            src={profileUser?.avatar}
            alt='background cover'
            className='absolute bottom-[0%] left-[16px] z-10 h-[113px] w-[113px] translate-y-[50%] rounded-full bg-white p-[5px]  tablet:left-[50px] tablet:h-[100px] tablet:w-[100px] tablet:p-[8px]'
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
    </div>
  );
};
export default Figure;
