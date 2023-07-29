import React from 'react';

import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';

const NotFound = () => {
  const { t } = useTranslation('profile');
  return (
    <div className='border-pr justify-center rounded-[12px] border border-dashed border-primary_light_blue bg-[#F0F7FC] p-[20px]'>
      <img
        src='/static/icons/Lotus-blue.svg'
        alt=''
        className='mx-auto mb-[10px] h-[24px] w-[24px] object-contain'
      />

      <Text type='body-14-regular' color='primary-5' className='text-center'>
        {t('follower_notfound')}
      </Text>
    </div>
  );
};
export default NotFound;
