// import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { DEEP_LINK } from 'src/constant';
import { downloadPineXAppTracking } from 'src/mixpanel/mixpanel';

const DownloadApp = () => {
  const { t } = useTranslation('common');

  return (
    <div className='flex justify-between bg-[#EAF4FB] p-[10px] tablet:hidden'>
      <div className='flex flex-row'>
        <Image
          loading='lazy'
          src='/static/logo/logo.png'
          alt=''
          width='0'
          height='0'
          sizes='100vw'
          className='h-[35px] w-[35px]'
        />
        <div className='ml-[8px]'>
          <Text type={'body-10-regular'} color='primary-5'>
            {t('try_full_experience_on')}
          </Text>
          <CustomLink
            href='https://onelink.to/cgarrk'
            onClick={() => downloadPineXAppTracking('CTA in App', 'Header')}
          >
            <Text type='body-14-medium' color='primary-5'>
              {t('mobile_app')}
            </Text>
          </CustomLink>
        </div>
      </div>
      <CustomLink
        href={DEEP_LINK.OPEN_APP}
        target='_blank'
        onClick={() => downloadPineXAppTracking('CTA in App', 'Header')}
      >
        <div className='flex h-[38px] w-[101px] items-center justify-center rounded-[41px] bg-[linear-gradient(247.96deg,_#1D6CAB_14.41%,_#589DC0_85.59%)] [box-shadow:0px_4px_16px_rgba(88,_157,_192,_0.24)]'>
          <Text type='body-14-bold' color='neutral-9'>
            {t('open_app')}
          </Text>
        </div>
      </CustomLink>
    </div>
  );
};

export default DownloadApp;
