import React, { useContext } from 'react';

import { useTranslation } from 'next-i18next';

import ModalPeopleYouKnow from '@components/Explore/ModalPeopleYouKnow';
import { profileUserContext } from '@components/MyProfile';

const NotFound = () => {
  const { t } = useTranslation('profile');
  const profileUser = useContext<any>(profileUserContext);
  return (
    <div className='flex  w-full flex-wrap justify-center gap-[48px] rounded-[12px] bg-primary_bgblue_2 p-[24px] text-center tablet:flex-nowrap'>
      <div className='flex-2 flex  w-full items-center tablet:mb-[12px] '>
        <img
          src={'/static/images/hand chat connect.png'}
          alt="Don't have any result"
          className=' mb-[12px]  w-[full] object-contain '
        />
      </div>
      <div className=' flex-0 align-center flex w-full  items-center justify-center rounded-[12px] bg-[#edf6fe] py-[44px] '>
        <div className='mx-auto my-auto w-fit'>
          <p className=' line-[28px]  mb-[30px]  max-w-[225px] text-[20px] font-[600]'>
            {t('following_empty')}
          </p>
          <ModalPeopleYouKnow
            onClose={() => {
              profileUser.reload();
              profileUser.setState((prev: any) => ({ ...prev, followingKey: Date.now() }));
            }}
          >
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
