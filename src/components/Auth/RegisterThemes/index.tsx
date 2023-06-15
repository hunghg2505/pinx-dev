import React from 'react';

import Image from 'next/image';

import Text from '@components/UI/Text';

const RegisterThemes = () => {
  return (
    <>
      <div className='mx-auto flex flex-col  items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <div className='companyCardmd:mt-0 w-full rounded-lg bg-white sm:max-w-md xl:p-0'>
          <div className='flex w-full'>
            <Image
              src='/static/icons/back_icon.svg'
              alt=''
              width='0'
              height='0'
              className={'h-[20px] w-[20px]'}
            />
          </div>
          <div className='flex flex-col items-center justify-center max-sm:mt-6'>
            <div className='w-[227px]'>
              <Text type='body-14-medium' className='mt-6'>
                See the economic in innovative way
              </Text>
              <div className='neutral-4 mt-6 flex flex-col items-center text-[body-14-medium]'>
                <Text type='body-14-regular'>
                  Choose your favourite Themes crafted for your desired interests
                </Text>
              </div>
            </div>
          </div>
          <div
            className={'mt-9 flex w-full flex-wrap items-center justify-center gap-y-[16px]'}
          ></div>

          <button
            type='submit'
            className='!mt-10 w-full rounded-[10px] bg-[linear-gradient(238.35deg,_#1D6CAB_7.69%,_#589DC0_86.77%)] py-[14px] text-center text-[17px] font-[700] text-white'
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterThemes;
