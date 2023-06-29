import React from 'react';

import { useCountDown } from 'ahooks';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Text from '@components/UI/Text';

const Redirect = () => {
  const [targetDate, setTargetDate] = React.useState<number>();
  const router = useRouter();
  const url = router?.query?.url;
  const onContinute = () => {
    url && window.open(`${url}`, '_self');
  };
  React.useEffect(() => {
    setTargetDate(Date.now() + 50_000_000);
  }, []);
  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      url && window.open(`${url}`, '_self');
    },
  });

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <div className='header relative mb-[37px] border-b border-solid border-[#D8EBFC] mobile:h-auto desktop:h-[60px]'>
        <Text type='body-16-bold' color='primary-5' className='py-[16px] text-center '>
          Redirect
        </Text>
        <Image
          src='/static/icons/iconBack.svg'
          alt=''
          width={32}
          height={32}
          className='absolute left-[16px] top-2/4 h-[32px] w-[32px] -translate-y-1/2 transform cursor-pointer'
          onClick={handleGoBack}
        />
      </div>

      <div className='flex flex-col items-center mobile:px-[30px]'>
        <Image
          src='/static/images/redirect.png'
          alt=''
          width={0}
          height={0}
          sizes='100vw'
          className='mobile:w-[250px] tablet:w-[329px]'
        />
        <Text type='body-28-bold' color='neutral-2' className='mt-[40px]'>
          Redirecting you in {Math.round(countdown / 1000)}s...
        </Text>
        <div className='mt-[20px] flex'>
          <Image
            src='/static/icons/iconWarning.svg'
            alt=''
            width={0}
            height={0}
            className='mr-[10px] w-[24px]'
          />
          <Text
            type='body-14-regular'
            color='neutral-4'
            className='text-center tablet:!text-[20px] tablet:!leading-[28px]'
          >
            You are leaving PineX. Please do not share your log-in information to any 3rd party
          </Text>
        </div>
        <Text
          type='body-14-regular'
          color='neutral-4'
          className='mt-[24px] text-center tablet:!text-[20px] tablet:!leading-[28px]'
        >
          Not being directed? Use the ‘Continue’ button below
        </Text>
        <div className='mt-[24px] flex'>
          <div className='mr-[4px] flex items-center rounded-bl-[8px] rounded-br-none rounded-tl-[8px] rounded-tr-none border-[1px] border-solid border-[#CCC] bg-[#FFF] px-[12px] mobile:py-[9px] tablet:py-[17px]'>
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
              className='inline-block overflow-hidden  overflow-ellipsis whitespace-nowrap mobile:max-w-[189px] tablet:max-w-[393px]'
            >
              {url}
            </Text>
          </div>
          <div
            className='cursor-pointer rounded-bl-none rounded-br-[8px] rounded-tl-none rounded-tr-[8px] bg-[#1F6EAC] px-[24px] mobile:py-[9px] tablet:py-[17px]'
            onClick={onContinute}
          >
            <Text type='body-14-semibold' color='neutral-9' className='tablet:text-[16px]'>
              Continue
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};
export default Redirect;
