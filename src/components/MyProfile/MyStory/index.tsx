import React, { useContext } from 'react';

import { useTranslation } from 'next-i18next';

import ModalStory from '@components/Profile/MyStory/ModalStory';

import { profileUserContext } from '..';

const MyStory = () => {
  const { t } = useTranslation('profile');
  const profileUser = useContext<any>(profileUserContext);
  return (
    <>
      {profileUser?.caption && (
        <div className='mb-[24px] px-[16px] tablet:px-0'>
          <div className='relative rounded-[8px] bg-primary_blue_light px-[16px] py-[12px]'>
            <span className='absolute bottom-[100%] left-[28px] h-0 w-[24px] border-b-[12px] border-l-[12px] border-r-[12px] border-t-0 border-solid border-primary_blue_light border-l-[transparent] border-r-[transparent]'></span>
            <p className='mb-[13px] line-clamp-2 w-full whitespace-pre-line text-[12px]'>
              {profileUser?.caption}
            </p>
            <ModalStory profileUser={profileUser}>
              <button className='flex items-center text-[12px]'>
                <span className='text-[12px] font-[600] text-primary_blue'>{t('my_story')}</span>
                <svg
                  className='h-[18px] w-[18px]'
                  width='28'
                  height='28'
                  viewBox='0 0 28 28'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10.5 21L17.5 14L10.5 7'
                    stroke='#1F6EAC'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </ModalStory>
          </div>
        </div>
      )}
    </>
  );
};
export default MyStory;
