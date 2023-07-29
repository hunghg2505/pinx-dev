import React from 'react';

import { useTranslation } from 'next-i18next';

const UserPostingFake = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className='box-shadow card-style rounded-[8px] bg-[#FFFFFF] p-[20px] mobile:hidden tablet:mb-[20px] tablet:block desktop:h-[174px]'>
        <div className='flex items-center'>
          <img
            src={'/static/images/img-blur.png'}
            alt=''
            width={0}
            height={0}
            sizes='100vw'
            className='mr-[10px] h-[56px] w-[56px] cursor-pointer rounded-full object-cover'
          />
        </div>
        <div className='mt-[5px] pl-[61px]'>
          <textarea
            placeholder={t('what_is_in_your_mind')}
            className='w-full rounded-[5px] bg-[#EFF2F5] pl-[10px] pt-[10px] focus:outline-none desktop:h-[70px]'
          />
        </div>
      </div>
    </>
  );
};

export default UserPostingFake;
