import React from 'react';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import { DEEP_LINK } from 'src/constant';

const Mobile = () => {
  const { t } = useTranslation('profile');
  return (
    <div className='pb-50px'>
      <div className='flex  w-full flex-wrap justify-center rounded-[12px] bg-primary_bgblue_2 p-[12px] text-center '>
        <Image
          sizes='100vw'
          src={'/static/images/rocket.png'}
          height={433}
          width={412}
          alt="Don't have any result"
          className=' mb-[12px] h-[330px] w-[full] object-contain tablet:h-[221px] tablet:w-[264px]'
        />
        <div className='w-full  rounded-[12px] bg-[#edf6fe]  py-[44px] galaxy-max:px-[16px] tablet:w-[287px]'>
          <div className='mx-auto w-fit'>
            <p className=' line-[28px] mb-[20px] max-w-[260px]  text-[20px] font-[600] galaxy-max:text-[18px] '>
              {t('start_investment')}
            </p>
            <CustomLink
              href={DEEP_LINK.ASSETS}
              target='_blank'
              className='line-[18px] block max-w-[260px] rounded-[8px] bg-gradient-to-l from-[#1D6CAB] to-[#589DC0] px-[24px] py-[12px] text-[14px] font-[600] text-white hover:text-white galaxy-max:text-[12px]'
            >
              {t('invest_now')}
            </CustomLink>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Mobile;
