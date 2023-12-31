import React from 'react';

import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { DEEP_LINK } from 'src/constant';

const Mobile = () => {
  const { t } = useTranslation('profile');
  return (
    <div className='rounded-[12px] border border-dashed border-primary_light_blue bg-[#F0F7FC] p-[20px] text-center galaxy-max:mx-0'>
      <Text type='body-16-bold' color='primary-5' className='mb-[12px] galaxy-max:text-[14px]'>
        {t('asset_desktop')}
      </Text>

      <Text type='body-14-regular' color='primary-5' className='galaxy-max:text-[12px]'>
        {t('install_app')}
      </Text>

      <CustomLink href={DEEP_LINK.ASSETS} target='_blank'>
        <button className='mx-auto mt-[20px] block h-[38px] rounded-[41px] bg-gradient-to-r from-[#589DC0] to-[#1D6CAB] px-[16px]'>
          <Text type='body-14-bold' color='cbwhite' className='galaxy-max:text-[12px]'>
            {t('install')}
          </Text>
        </button>
      </CustomLink>
    </div>
  );
};
export default Mobile;
