import React from 'react';

import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';

const Empty = ({ keyword }: { keyword: string; loading?: boolean }) => {
  const { t } = useTranslation(['search-seo', 'common']);
  // if (loading) {
  //   return <></>;
  // }
  return (
    <div className='flex flex-col items-center gap-y-[24px] text-center'>
      <div></div>
      <img
        src='/static/icons/icon_robot.svg'
        alt='Robot icon'
        className='m-auto h-[163px] w-[209px]'
      />
      <div className='flex flex-col items-center gap-y-[8px]'>
        <Text type='body-22-bold' className='text-[#333]'>
          {t('common:searchseo.txtEmpty')} “{keyword}”
        </Text>
        <Text type='body-14-regular' className='text-[#333]'>
          {t('common:searchseo.descEmpty')}
        </Text>
      </div>
      <div></div>
    </div>
  );
};
export default Empty;
