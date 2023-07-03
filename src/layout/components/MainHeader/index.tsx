/* eslint-disable unicorn/no-useless-spread */
import React, { useRef } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Form from 'rc-field-form';

import { AlphabetToColor } from '@components/Post/NewsFeed/NewFeedItem';
import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Text from '@components/UI/Text';
import { useContainerDimensions } from '@hooks/useDimensions';
import { getAccessToken } from '@store/auth';
import { useAuth } from '@store/auth/useAuth';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { ROUTE_PATH, toNonAccentVietnamese } from '@utils/common';
import { MOBILE_SCREEN_MAX_WIDTH } from 'src/constant';

const IconSearchWhite = () => (
  <svg width='16' height='16' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M8.94349 8.94354L11.3333 11.3333M10.3636 5.51513C10.3636 8.19287 8.19289 10.3636 5.51516 10.3636C2.83737 10.3636 0.666626 8.19287 0.666626 5.51513C0.666626 2.8374 2.83737 0.666668 5.51516 0.666668C8.19289 0.666668 10.3636 2.8374 10.3636 5.51513Z'
      stroke='#A6B0C3'
      strokeWidth='1.33333'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
const Header = () => {
  const router = useRouter();
  const { onLogout } = useAuth();
  const redirectToLogin = () => {
    router.push(ROUTE_PATH.LOGIN);
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
  const { requestGetProfile } = useProfileInitial();
  const headerRef = useRef(null);
  const { width } = useContainerDimensions(headerRef);

  const isHideHeaderOpenAppOnMobile = [ROUTE_PATH.REDIRECT].includes(router?.pathname);
  const isHideHeaderLoginOnMobile =
    (router?.pathname.startsWith(ROUTE_PATH.POST_DETAIL_PATH) ||
      [ROUTE_PATH.REDIRECT].includes(router?.pathname)) &&
    width <= MOBILE_SCREEN_MAX_WIDTH;
  const name =
    requestGetProfile?.displayName &&
    toNonAccentVietnamese(requestGetProfile?.displayName)?.charAt(0)?.toUpperCase();

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const renderColor = (str: string) => {
    switch (str) {
      case 'A': {
        return AlphabetToColor.A;
      }
      case 'B': {
        return AlphabetToColor.B;
      }
      case 'C': {
        return AlphabetToColor.C;
      }
      case 'D': {
        return AlphabetToColor.D;
      }
      case 'E': {
        return AlphabetToColor.E;
      }
      case 'F': {
        return AlphabetToColor.F;
      }
      case 'G': {
        return AlphabetToColor.G;
      }

      case 'I': {
        return AlphabetToColor.I;
      }
      case 'J': {
        return AlphabetToColor.J;
      }
      case 'K': {
        return AlphabetToColor.K;
      }
      case 'L': {
        return AlphabetToColor.L;
      }
      case 'M': {
        return AlphabetToColor.M;
      }
      case 'N': {
        return AlphabetToColor.N;
      }
      case 'O': {
        return AlphabetToColor.O;
      }
      case 'P': {
        return AlphabetToColor.P;
      }
      case 'Q': {
        return AlphabetToColor.Q;
      }
      case 'R': {
        return AlphabetToColor.R;
      }
      case 'S': {
        return AlphabetToColor.S;
      }
      case 'T': {
        return AlphabetToColor.T;
      }
      case 'U': {
        return AlphabetToColor.U;
      }
      case 'V': {
        return AlphabetToColor.V;
      }
      case 'W': {
        return AlphabetToColor.W;
      }
      case 'X': {
        return AlphabetToColor.X;
      }
      case 'Y': {
        return AlphabetToColor.Y;
      }
      case 'Z': {
        return AlphabetToColor.Z;
      }
      default: {
        return AlphabetToColor.Z;
      }
    }
  };
  return (
    <div ref={headerRef}>
      {!isHideHeaderOpenAppOnMobile && (
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
      )}
      {!isHideHeaderLoginOnMobile && (
        <div className='flex flex-row items-center justify-between p-[16px] desktop:container desktop:px-[0px] desktop:py-[16px]'>
          <div className='flex flex-row items-center'>
            <Link href={ROUTE_PATH.HOME}>
              <img
                src='/static/icons/logo.svg'
                alt=''
                width='0'
                height='0'
                className='mr-[16px] w-[35px]'
              />
            </Link>

            <div className='mobile:block desktop:hidden'>
              {[...new Array(3)].map((_, index) => (
                <span className='mb-1 block h-[3px] w-[24px] bg-[#438BB9]' key={index}></span>
              ))}
            </div>
          </div>
          <div className='flex flex-row  items-center'>
            <div className='mr-[21px] w-[18px] cursor-pointer mobile:block desktop:hidden'>
              <img src='/static/icons/iconSearch.svg' alt='' width={18} height={18} />
            </div>
            <div className='mr-[12px] mobile:hidden desktop:block'>
              <Form>
                <FormItem name='search'>
                  <Input
                    className='h-[40px] w-[220px] rounded-[8px] bg-[#EFF2F5] pl-[36px] pr-[12px] outline-none'
                    placeholder='Search'
                    icon={<IconSearchWhite />}
                  />
                </FormItem>
              </Form>
            </div>
            {isLogin ? (
              <>
                <button onClick={() => onLogout()}>
                  <img
                    src='/static/icons/iconLogout.svg'
                    alt='Icon logout'
                    width={24}
                    height={24}
                    className='mr-[21px] h-[24px] w-[24px] object-contain'
                  />
                </button>
                {requestGetProfile?.avatar ? (
                  <img
                    src={requestGetProfile?.avatar}
                    alt=''
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='h-[36px] w-[36px] rounded-full mobile:block desktop:hidden'
                  />
                ) : (
                  <div
                    className='mr-2 flex items-center justify-center rounded-full object-contain mobile:h-[44px] mobile:w-[44px] desktop:h-[56px] desktop:w-[56px]'
                    style={{ backgroundColor: renderColor(name) }}
                  >
                    <Text type='body-24-regular' color='cbwhite'>
                      {name}
                    </Text>
                  </div>
                )}
              </>
            ) : (
              <button
                className='h-[36px] rounded-[4px] bg-[#EAF4FB] mobile:w-[90px] desktop:mr-[13px] desktop:w-[122px]'
                onClick={redirectToLogin}
              >
                <Text type='body-14-bold' color='primary-2'>
                  Log in
                </Text>
              </button>
            )}
            {isLogin ? (
              <div className='ml-[20px] items-center mobile:hidden desktop:flex'>
                <Text type='body-20-medium' color='neutral-1'>
                  {requestGetProfile?.displayName}
                </Text>
                <img
                  src={requestGetProfile?.avatar}
                  alt=''
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='ml-[10px] h-[52px] w-[52px] rounded-full'
                />
              </div>
            ) : (
              <button
                className='h-[36px] rounded-[4px] bg-[linear-gradient(230.86deg,_rgba(29,_108,_171,_0.99)_0%,_rgba(88,_157,_192,_0.99)_100%)] mobile:hidden desktop:block desktop:w-[122px]'
                onClick={redirectToSignUp}
              >
                <Text type='body-14-bold' color='cbwhite'>
                  Sign up
                </Text>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
