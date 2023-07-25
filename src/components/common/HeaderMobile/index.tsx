import Link from 'next/link';

import Text from '@components/UI/Text';

const HeaderMobile = () => {
  return (
    <div className='flex justify-between bg-[#EAF4FB] py-[12px] mobile:px-[16px] tablet:hidden'>
      <div className='flex flex-row'>
        <img src='/static/icons/logo.svg' alt='' width='0' height='0' className='w-[35px]' />
        <div className='ml-[8px]'>
          <Text type='body-14-regular' color='primary-5'>
            Try full experience on
          </Text>
          <Link href='https://onelink.to/cgarrk'>
            <Text type='body-14-medium' color='primary-5'>
              Mobile App
            </Text>
          </Link>
        </div>
      </div>
      <Link href='https://onelink.to/cgarrk'>
        <div className='flex h-[38px] w-[101px] items-center justify-center rounded-[41px] bg-[linear-gradient(247.96deg,_#1D6CAB_14.41%,_#589DC0_85.59%)] [box-shadow:0px_4px_16px_rgba(88,_157,_192,_0.24)]'>
          <Text type='body-14-bold' color='neutral-9'>
            Open App
          </Text>
        </div>
      </Link>
    </div>
  );
};
export default HeaderMobile;
