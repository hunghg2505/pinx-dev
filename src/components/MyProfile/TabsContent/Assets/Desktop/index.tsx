import React from 'react';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { DEEP_LINK } from 'src/constant';

const Mobile = () => {
  const { t } = useTranslation('profile');
  return (
    <div className='flex  w-full flex-wrap justify-center gap-[56px] rounded-[12px] bg-primary_bgblue_2 p-[24px] text-center tablet:flex-nowrap'>
      <Image
        sizes='100vw'
        src={'/static/images/rocket.png'}
        height={433}
        width={412}
        alt="Don't have any result"
        className=' mb-[12px] h-[330px] w-[full] object-contain tablet:h-[221px] tablet:w-[264px]'
      />
      <div className='align-center flex w-full  items-center justify-center rounded-[12px] bg-[#edf6fe] px-[20px] py-[44px] tablet:w-[287px]'>
        <div className='mx-auto my-auto w-fit'>
          <p className=' line-[28px]  mb-[30px]  max-w-[260px] text-[20px] font-[600]'>
            {t('start_investment')}
          </p>
          <div className='flex justify-center gap-[23px]'>
            <Image
              width='0'
              height='0'
              sizes='100vw'
              src={'/static/images/googleplay.png'}
              alt="Don't have any result"
              className='h-[30px] w-[106px] cursor-pointer object-contain '
              onClick={() => window.open(DEEP_LINK.ASSETS)}
            />

            <Image
              width='0'
              height='0'
              sizes='100vw'
              src={'/static/images/appstore.png'}
              alt="Don't have any result"
              className='h-[30px] w-[106px] cursor-pointer object-contain '
              onClick={() => window.open(DEEP_LINK.ASSETS)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Mobile;
