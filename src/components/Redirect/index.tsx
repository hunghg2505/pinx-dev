import Image from 'next/image';
import { useRouter } from 'next/router';

import Text from '@components/UI/Text';

const Redirect = () => {
  const router = useRouter();
  const url = router?.query?.url;
  console.log('🚀 ~ file: index.tsx:10 ~ Redirect ~ url:', url);
  return (
    <>
      <div className='flex flex-col items-center'>
        <Image
          src='/static/images/redirect.png'
          alt=''
          width={0}
          height={0}
          sizes='100vw'
          className='w-[329px]'
        />
        <Text type='body-28-bold' color='neutral-2' className='mt-[40px]'>
          Redirecting you in 5s...
        </Text>
        <div className='mt-[20px] flex'>
          <Image
            src='/static/icons/iconWarning.svg'
            alt=''
            width={0}
            height={0}
            className='mr-[10px] w-[24px]'
          />
          <Text type='body-20-medium' color='neutral-4'>
            You are leaving PineX. Please do not share your log-in information to any 3rd party
          </Text>
        </div>
        <Text type='body-20-medium' color='neutral-4' className='mt-[24px]'>
          Not being directed? Use the ‘Continue’ button below
        </Text>
        <div className='mt-[24px] flex'>
          <div className='mr-[4px] flex items-center rounded-bl-[8px] rounded-br-none rounded-tl-[8px] rounded-tr-none border-[1px] border-solid border-[#CCC] bg-[#FFF] px-[12px] py-[16px]'>
            <Image
              src='/static/icons/iconLink-02.svg'
              alt=''
              width={0}
              height={0}
              className='mr-[4px] w-[20px]'
            />
            <Text
              type='body-16-regular'
              color='primary-4'
              className='inline-block max-w-[393px] overflow-hidden overflow-ellipsis whitespace-nowrap'
            >
              https://www.domain.com/post12sdasdasdsasdasdsadsadsapost12sdasdasdsasdasdsadsadsapost12sdasdasdsasdasdsadsadsa
            </Text>
          </div>
          <div className='rounded-bl-none rounded-br-[8px] rounded-tl-none rounded-tr-[8px] bg-[#1F6EAC] px-[24px] py-[17px]'>
            <Text type='body-16-semibold' color='neutral-9'>
              Continue
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};
export default Redirect;
