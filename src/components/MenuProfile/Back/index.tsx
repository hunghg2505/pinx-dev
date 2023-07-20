import React from 'react';

import { useTranslation } from 'next-i18next';

const Back = ({ close }: { close: () => void }) => {
  const { t } = useTranslation('common');
  return (
    <>
      <header className='relative flex px-[16px] py-[16px] align-middle text-[16px]'>
        <img
          src='/static/icons/arrow-left.svg'
          alt='avatar'
          className='absolute left-[16px] top-[16px] inline w-[18.67px] rounded-full'
          width={18.67}
          height={18.67}
          onClick={close}
        />
        <b className='bold mx-auto '>{t('my_profile')}</b>
      </header>
    </>
  );
};
export default Back;
