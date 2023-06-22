import React from 'react';

import Image from 'next/image';
import Form from 'rc-field-form';
import Text from '@components/UI/Text';
import { useRouter } from 'next/router';
import { PATH } from '@utils/constant';
import { getAccessToken } from '@store/auth';
import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import { ROUTE_PATH } from '@utils/common';
const IconSearchWhite = () => (
  <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M8.94349 8.94354L11.3333 11.3333M10.3636 5.51513C10.3636 8.19287 8.19289 10.3636 5.51516 10.3636C2.83737 10.3636 0.666626 8.19287 0.666626 5.51513C0.666626 2.8374 2.83737 0.666668 5.51516 0.666668C8.19289 0.666668 10.3636 2.8374 10.3636 5.51513Z'
      stroke='#A6B0C3'
      strokeWidth='1.33333'
      stroke-miterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
const Header = () => {
  const router = useRouter();
  const redirectToLogin = () => {
    router.push(PATH.AUTH_LOGIN);
  };
  const redirectToSignUp = () => {
    router.push({
      pathname: ROUTE_PATH.LOGIN,
      query: {
        type: 'register',
      },
    });
  };
  const isLogin = !!getAccessToken();
  return (
    <>
      <div className='flex justify-between bg-[#EAF4FB] py-[12px] mobile:px-[16px]'>
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
      <div className='flex flex-row items-center justify-between p-[16px] desktop:container desktop:px-[0px] desktop:py-[16px]'>
        <div className='flex flex-row items-center'>
          <Image
            src='/static/icons/logo.svg'
            alt=''
            width='0'
            height='0'
            className='mr-[16px] w-[35px]'
          />
          <div className='mobile:block desktop:hidden'>
            {[...new Array(3)].map((_, index) => (
              <span className='mb-1 block h-[3px] w-[24px] bg-[#438BB9]' key={index}></span>
            ))}
          </div>
        </div>
        {!isLogin && (
          <div className='flex flex-row  items-center'>
            <div className='mr-[21px] w-[18px] cursor-pointer mobile:block desktop:hidden'>
              <Image src='/static/icons/iconSearch.svg' alt='' width={18} height={18} />
            </div>
            <div className='mr-[12px] mobile:hidden desktop:block'>
              <Form>
                <FormItem name='search'>
                  <Input
                    className='h-[36px] w-[220px] rounded-[8px] bg-[#EFF2F5] placeholder:pl-[28px]'
                    placeholder='Search'
                    icon={<IconSearchWhite />}
                  />
                </FormItem>
              </Form>
            </div>
            <button
              className='h-[36px] rounded-[4px] bg-[#EAF4FB] mobile:w-[90px] desktop:mr-[13px] desktop:w-[122px]'
              onClick={redirectToLogin}
            >
              <Text type='body-14-bold' color='primary-2'>
                Log in
              </Text>
            </button>
            <button
              className='h-[36px] rounded-[4px] bg-[linear-gradient(230.86deg,_rgba(29,_108,_171,_0.99)_0%,_rgba(88,_157,_192,_0.99)_100%)] mobile:w-[90px] desktop:w-[122px]'
              onClick={redirectToSignUp}
            >
              <Text type='body-14-bold' color='cbwhite'>
                Sign up
              </Text>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
