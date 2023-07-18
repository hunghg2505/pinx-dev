import React from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const BackLayout = ({ children, title }: any) => {
  const { t } = useTranslation('common');
  const router = useRouter();

  return (
    <>
      <header className='flex px-[16px] py-[16px] align-middle text-[16px]'>
        <img
          src='/static/icons/arrow-left.svg'
          alt='avatar'
          className='absolute left-[16px] top-[16px] inline w-[18.67px] rounded-full'
          width={18.67}
          height={18.67}
          onClick={() => {
            router.back();
          }}
        />
        <b className='bold mx-auto '>{t(title)}</b>
      </header>
      <main>{children}</main>
    </>
  );
};

export default BackLayout;
