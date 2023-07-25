/* eslint-disable unicorn/no-useless-spread */
import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Dropdown from 'rc-dropdown';
import Form from 'rc-field-form';
import Menu, { Item as MenuItem } from 'rc-menu';

import MenuProfile from '@components/MenuProfile';
import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Text from '@components/UI/Text';
import { useContainerDimensions } from '@hooks/useDimensions';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import SideBar from '@layout/MainLayout/SideBar';
import { getAccessToken } from '@store/auth';
import {
  ROUTE_PATH,
  calcUserStatusText,
  disableScroll,
  enableScroll,
  isUserVerified,
} from '@utils/common';
import { MOBILE_SCREEN_MAX_WIDTH } from 'src/constant';

export const IconSearchWhite = () => (
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
export const IconCloseMenu = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='23' height='24' viewBox='0 0 23 24' fill='none'>
    <path d='M20 20.5L3 3.5' stroke='#589DC0' strokeWidth='2.6' strokeLinecap='round' />
    <path d='M3 20.5L20 3.5' stroke='#589DC0' strokeWidth='2.6' strokeLinecap='round' />
  </svg>
);
const MainHeader = () => {
  const router = useRouter();
  const [isShowNavigate, setIsShowNavigate] = React.useState(false);
  const [avaDropdownVisible, setAvaDropdownVisible] = useState<boolean>(false);

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
  const { userLoginInfo } = useUserLoginInfo();
  const headerRef = useRef(null);
  const { width } = useContainerDimensions(headerRef);
  const isHideHeaderOpenAppOnMobile = [
    ROUTE_PATH.REDIRECT,
    ROUTE_PATH.SETTING,
    ROUTE_PATH.SETTING_CHANGE_PASSWORD,
    ROUTE_PATH.SETTING_CHANGE_USERNAME,
    ROUTE_PATH.SETTING_CHANGE_PASSWORD_VERIFICATION,
    ROUTE_PATH.SETTING_CHANGE_USERNAME_VERIFICATION,
    ROUTE_PATH.PROFILE_VERIFICATION,
  ].includes(router?.pathname);
  const isHideHeaderLoginOnMobile =
    (router?.pathname.startsWith(ROUTE_PATH.POST_DETAIL_PATH) ||
      [
        ROUTE_PATH.REDIRECT,
        '/theme/[id]',
        ROUTE_PATH.PEOPLEINSPOTLIGHT,
        ROUTE_PATH.THEME,
        ROUTE_PATH.TOP_WATCHING,
        ROUTE_PATH.TOPMENTION,
        ROUTE_PATH.PINEX_TOP_20,
        ROUTE_PATH.SEARCH,
        ROUTE_PATH.SETTING,
        ROUTE_PATH.SETTING_CHANGE_PASSWORD,
        ROUTE_PATH.SETTING_CHANGE_USERNAME,
        ROUTE_PATH.SETTING_CHANGE_PASSWORD_VERIFICATION,
        ROUTE_PATH.SETTING_CHANGE_USERNAME_VERIFICATION,
        ROUTE_PATH.PROFILE_VERIFICATION,
      ].includes(router?.pathname)) &&
    width <= MOBILE_SCREEN_MAX_WIDTH;

  const menuMobileRef = useRef<any>(null);

  useEffect(() => {
    setIsShowNavigate(false);
  }, [router?.pathname]);

  const goToMyProfile = () => {
    menuMobileRef.current.open();
  };

  const renderAvatarMobile = () => {
    return (
      isLogin && (
        <>
          <img
            src={userLoginInfo?.avatar}
            alt=''
            width={0}
            height={0}
            sizes='100vw'
            className='h-[40px] w-[40px] cursor-pointer rounded-full mobile:block tablet:hidden'
            onClick={goToMyProfile}
          />
        </>
      )
    );
  };

  const renderAvatarDesktop = () => {
    return isLogin ? (
      <div className='items-center mobile:hidden tablet:flex'>
        <Dropdown
          trigger={['click']}
          animation='slide-up'
          overlay={avatarDropdown}
          visible={avaDropdownVisible}
          onVisibleChange={(visible) => setAvaDropdownVisible(visible)}
        >
          <div className='relative h-[40px] w-[40px] cursor-pointer overflow-hidden rounded-full object-cover desktop:h-[52px] desktop:w-[52px]'>
            <img
              src={userLoginInfo?.avatar ?? '/static/images/img-blur.png'}
              alt=''
              className='h-[40px] w-[40px] overflow-hidden rounded-full object-cover desktop:h-[52px] desktop:w-[52px]'
            />

            <img
              src='/static/icons/arrow_down.svg'
              alt=''
              width={0}
              height={0}
              sizes='100vw'
              className='absolute bottom-[-1px] right-0 h-[20px] w-[20px] rounded-full bg-[#EFF2F5] shadow-[0px_6px_16px_0px_rgba(0,0,0,0.25),0px_3px_6px_-4px_rgba(0,0,0,0.5)]'
            />
          </div>
        </Dropdown>
      </div>
    ) : (
      <>
        <button
          className='h-[40px] rounded-[4px] bg-[linear-gradient(230.86deg,_rgba(29,_108,_171,_0.99)_0%,_rgba(88,_157,_192,_0.99)_100%)] mobile:hidden desktop:block desktop:w-[122px]'
          onClick={redirectToSignUp}
        >
          <Text type='body-14-bold' color='cbwhite'>
            Sign up
          </Text>
        </button>
      </>
    );
  };

  const onCloseDropdown = () => {
    setAvaDropdownVisible(false);
  };

  const avatarDropdown = (
    <Menu multiple className='w-[360px] rounded-e-lg border-none bg-white'>
      <MenuItem disabled>
        <div className=' flex items-center'>
          {isLogin ? (
            <img
              src={userLoginInfo?.avatar}
              alt=''
              width={0}
              height={0}
              sizes='100vw'
              className='my-6 mr-6 h-[72px] w-[72px] cursor-pointer rounded-full object-cover'
              onClick={() => {
                router.push(ROUTE_PATH.MY_PROFILE);
              }}
            />
          ) : (
            <img
              src='/static/images/guest_avatar.png'
              alt=''
              width={0}
              height={0}
              sizes='100vw'
              className='my-6 mr-6 h-[72px] w-[72px] cursor-pointer rounded-full object-cover'
            />
          )}
          {isLogin ? (
            <div className='flex flex-col gap-[6px]'>
              <Text type='body-16-semibold'>{userLoginInfo?.displayName}</Text>
              <div className='text-[12px] text-[#474D57]'>
                Joined since
                <span className='text-[12px] font-[600] text-neutral_black'> 2022</span>
              </div>
              <div className='flex gap-[50px]'>
                <div className='ga- flex flex-col'>
                  <Text type='body-12-regular' className='text-[#474D57]'>
                    Post
                  </Text>
                  <Text type='body-12-semibold'>0</Text>
                </div>
                <div className='flex flex-col'>
                  <Text type='body-12-regular' className='text-[#474D57]'>
                    Follower
                  </Text>
                  <Text type='body-12-semibold'>{userLoginInfo?.totalFollower}</Text>
                </div>
                <div className='flex flex-col'>
                  <Text type='body-12-regular' className='text-[#474D57]'>
                    Following
                  </Text>
                  <Text type='body-12-semibold'>{userLoginInfo?.totalFollowing}</Text>
                </div>
              </div>
            </div>
          ) : (
            <Text type='body-16-semibold'>Anonymous User</Text>
          )}
        </div>
      </MenuItem>
      <MenuItem disabled>
        {isLogin && (
          <>
            <hr className='border-neutral_07' />
            <Link
              href={ROUTE_PATH.PROFILE_VERIFICATION}
              className='flex items-center justify-between px-[20px] py-4'
              onClick={onCloseDropdown}
            >
              <div className='flex items-center'>
                <img
                  src='/static/icons/icon_profile.svg'
                  className='mr-[10px] h-[16px] w-[15px]'
                  alt='Profile Verification'
                />
                <span>Profile Verification</span>
              </div>
              <Text
                type='body-12-regular'
                className={classNames('text-[#EAA100]', {
                  'text-green': isUserVerified(userLoginInfo.acntStat),
                })}
              >
                {calcUserStatusText(userLoginInfo.acntStat || '')}
              </Text>
            </Link>
          </>
        )}

        <hr className='border-neutral_07' />
        {isLogin && (
          <Link
            href='/watchlist'
            className='flex items-center px-[20px] py-4'
            onClick={onCloseDropdown}
          >
            <img
              src='/static/icons/iconTV.svg'
              className='mr-[10px] h-[14px] w-[15px] object-contain'
              alt='Watchlist and theme'
            />
            <span>Watchlist and theme</span>
          </Link>
        )}
      </MenuItem>
    </Menu>
  );

  const onShowNavigate = () => {
    setIsShowNavigate(!isShowNavigate);
  };

  useEffect(() => {
    if (isShowNavigate) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isShowNavigate]);

  return (
    <>
      <div
        ref={headerRef}
        className='sticky left-0 top-0 z-[99] border-b-[1px] border-solid border-[#EBEBEB] bg-white desktop:h-[84px]'
      >
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
          <div className='mx-auto flex h-[56px] max-w-[1355px] flex-row items-center justify-between px-[16px] desktop:h-[84px] desktop:px-[0]'>
            <div className='flex flex-row items-center'>
              <Link href={ROUTE_PATH.HOME}>
                <img
                  src='/static/icons/logo.svg'
                  alt=''
                  width='0'
                  height='0'
                  className='mr-[16px] h-[40px] w-[40px] object-contain tablet:ml-[8px] desktop:h-[52px] desktop:w-[52px]'
                />
              </Link>

              <div
                className='cursor-pointer mobile:block desktop:hidden'
                onClick={() => onShowNavigate()}
              >
                {isShowNavigate ? (
                  <IconCloseMenu />
                ) : (
                  <img
                    src='/static/icons/icon-bar-mobile.svg'
                    alt='Icon bar'
                    className='h-[32px] w-[32px] object-contain'
                  />
                )}
              </div>
            </div>
            <div className='flex flex-row items-center'>
              <button className='mr-[12px] flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#F8F8F8] mobile:block tablet:hidden'>
                <img
                  src='/static/icons/search-gray.svg'
                  alt='Search icon'
                  className='m-auto h-[22px] w-[22px]'
                />
              </button>

              <div className='mr-[32px] mobile:hidden tablet:block'>
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

              <div className='mr-[12px] hidden h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#F8F8F8]'>
                <img
                  src='/static/icons/iconBell.svg'
                  alt='Icon notification'
                  className='object-contain mobile:h-[22px] mobile:w-[22px] tablet:h-[28px] tablet:w-[28px]'
                />
              </div>

              {!isLogin && (
                <button
                  className='h-[40px] rounded-[4px] border border-[--primary-6] bg-[#EAF4FB] mobile:w-[90px] desktop:mr-[13px] desktop:w-[122px]'
                  onClick={redirectToLogin}
                >
                  <Text type='body-14-bold' color='primary-2'>
                    Log in
                  </Text>
                </button>
              )}
              {renderAvatarMobile()}
              {renderAvatarDesktop()}
            </div>
          </div>
        )}

        <div
          className={classNames(
            'fixed left-0 top-[84px] z-[9999] h-[150vh] w-full -translate-x-full transform bg-[#ffffff] [transition:0.5s] mobile:px-[10px] tablet-max:top-[130px] desktop:px-0',
            {
              'translate-x-[0px]': isShowNavigate,
            },
          )}
        >
          <div className='mt-[12px]'>
            <SideBar />
          </div>
        </div>
      </div>
      <MenuProfile ref={menuMobileRef} />
    </>
  );
};

export default MainHeader;
