import Image from 'next/image';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { DEEP_LINK } from 'src/constant';
import { downloadPineXAppTracking } from 'src/mixpanel/mixpanel';

const HeaderMobile = () => {
  return (
    <div className='flex justify-between bg-[#EAF4FB] py-[12px] mobile:px-[16px] tablet:hidden'>
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
          <Text type='body-14-regular' className='galaxy-max:text-[10px]' color='primary-5'>
            Try full experience on
          </Text>
          <CustomLink
            href='https://onelink.to/cgarrk'
            onClick={() => downloadPineXAppTracking('CTA in App', 'HeaderMobile')}
          >
            <Text type='body-14-medium' color='primary-5'>
              Mobile App
            </Text>
          </CustomLink>
        </div>
      </div>
      <CustomLink
        href={DEEP_LINK.OPEN_APP}
        target='_blank'
        onClick={() => downloadPineXAppTracking('CTA in App', 'HeaderMobile')}
      >
        <div className='flex h-[38px] w-[101px] items-center justify-center rounded-[41px] bg-[linear-gradient(247.96deg,_#1D6CAB_14.41%,_#589DC0_85.59%)] [box-shadow:0px_4px_16px_rgba(88,_157,_192,_0.24)]'>
          <Text type='body-14-bold' color='neutral-9'>
            Open App
          </Text>
        </div>
      </CustomLink>
    </div>
  );
};
export default HeaderMobile;
