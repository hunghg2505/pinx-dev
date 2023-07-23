import React from 'react';

import { useTranslation } from 'next-i18next';

import ModalPeopleYouKnow from '@components/Explore/ModalPeopleYouKnow';

const NotFound = () => {
  const { t } = useTranslation('profile');
  return (
    <div className='flex  w-full flex-wrap justify-center gap-[48px] rounded-[12px] bg-primary_bgblue_2 p-[24px] text-center'>
      <img
        src={'/static/images/hand chat connect.png'}
        height={433}
        width={412}
        alt="Don't have any result"
        className=' mb-[12px] h-[330px] w-[full] object-contain tablet:h-[240px] tablet:w-[312px]'
      />
      <div className='align-center flex w-full  items-center justify-center rounded-[12px] bg-[#edf6fe] py-[44px] tablet:w-[287px]'>
        <div className='mx-auto my-auto w-fit'>
          <p className=' line-[28px]  mb-[30px]  max-w-[225px] text-[20px] font-[600]'>
            {t('following_empty')}
          </p>
          <ModalPeopleYouKnow>
            <button
              className='
              line-[18px]
          block
          w-full
          max-w-[260px]
          rounded-[8px] bg-gradient-to-l
          from-[#1D6CAB]
        to-[#589DC0]
        px-[24px]
        py-[12px]
        text-[14px]
        font-[600]
        text-white
        '
            >
              {t('explore')}
            </button>
          </ModalPeopleYouKnow>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
