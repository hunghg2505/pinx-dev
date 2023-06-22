/* eslint-disable unicorn/no-useless-spread */
import React from 'react';

import Image from 'next/image';

import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';

const Header = () => {
  const { userLoginInfo } = useUserLoginInfo();
  const isLogin = !!userLoginInfo.token;
  return (
    <>
      <div className='flex justify-between bg-[#EAF4FB] px-[16px] py-[12px]'>
        <div className='flex flex-row'>
          <Image src='/static/icons/logo.svg' alt='' width='0' height='0' className='w-[35px]' />
          <div className='ml-[8px]'>
            <Text type='body-14-regular' color='primary-5'>
              Try full experience on
            </Text>
            <Text type='body-14-medium' color='primary-5'>
              Mobile App
            </Text>
          </div>
        </div>
        <div className='flex h-[38px] w-[101px] items-center justify-center rounded-[41px] bg-[linear-gradient(247.96deg,_#1D6CAB_14.41%,_#589DC0_85.59%)] [box-shadow:0px_4px_16px_rgba(88,_157,_192,_0.24)]'>
          <Text type='body-14-bold' color='neutral-9'>
            Open App
          </Text>
        </div>
      </div>
      <div className=' flex flex-row items-center justify-between p-[16px]'>
        <div className='flex flex-row items-center'>
          <Image
            src='/static/icons/logo.svg'
            alt=''
            width='0'
            height='0'
            className='mr-[16px] w-[35px]'
          />
          <div className=''>
            {[...new Array(3)].map((_, index) => (
              <span className='mb-1 block h-[3px] w-[24px] bg-[#438BB9]' key={index}></span>
            ))}
          </div>
        </div>
        {isLogin && (
          <div className='flex flex-row  items-center'>
            <div className='mr-[21px] w-[18px] cursor-pointer'>
              <Image src='/static/icons/iconSearch.svg' alt='' width={18} height={18} />
            </div>
            <button className='h-[34px] w-[90px] rounded-[4px] bg-[#EAF4FB] '>
              <Text type='body-14-bold' color='primary-2'>
                Log in
              </Text>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
