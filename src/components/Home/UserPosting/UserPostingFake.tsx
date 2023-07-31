import React from 'react';

import { useTranslation } from 'next-i18next';

const UserPostingFake = () => {
  const { t } = useTranslation();

  return (
    <div className='box-shadow card-style rounded-[12px] bg-[#fff] mobile:hidden tablet:mb-[20px] tablet:block'>
      <div className='flex items-center'>
        <img
          src='/static/images/img-blur.png'
          alt=''
          width={0}
          height={0}
          sizes='100vw'
          className='mr-[10px] h-[56px] w-[56px] cursor-pointer rounded-full object-cover'
        />
        <input
          type='text'
          readOnly
          className='h-[36px] w-full flex-1 rounded-[5px] bg-[#fff] p-[10px] focus:outline-none'
          placeholder={t('what_is_on_your_mind')}
        />
      </div>
    </div>
  );
};

export default UserPostingFake;
