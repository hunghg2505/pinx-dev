import React from 'react';

import { useTranslation } from 'next-i18next';

const Back = ({ close }: { close: () => void }) => {
  const { t } = useTranslation('common');
  return (
    <>
      <header className='relative mb-[24px] flex px-[16px] py-[16px] align-middle text-[16px] tablet:mb-0'>
        <img
          src='/static/icons/back_icon.svg'
          alt='avatar'
          className='absolute left-[16px] top-[16px] inline h-[28px] w-[28px] rounded-full'
          onClick={close}
        />
        <b className='bold ml-[30px] mr-auto mt-[2px] hidden tablet:block'>{t('my_profile')}</b>
      </header>
    </>
  );
};
export default Back;
