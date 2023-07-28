import React from 'react';

import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { ONE_LINK_DOWNLOAD } from 'src/constant';

const Mobile = () => {
  const { t } = useTranslation('profile');
  return (
    <div className='mx-[16px] rounded-[12px] border border-dashed border-primary_light_blue bg-[#F0F7FC] p-[20px] text-center'>
      <Text type='body-16-bold' color='primary-5' className='mb-[12px]'>
        {t('asset_desktop')}
      </Text>

      <Text type='body-14-regular' color='primary-5'>
        {t('install_app')}
      </Text>

      <Link href={ONE_LINK_DOWNLOAD}>
        <button className='mx-auto mt-[20px] block h-[38px] rounded-[41px] bg-gradient-to-r from-[#589DC0] to-[#1D6CAB] px-[16px]'>
          <Text type='body-14-bold' color='cbwhite'>
            {t('install')}
          </Text>
        </button>
      </Link>
    </div>
  );
};
export default Mobile;
