import React, { useEffect } from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import Notifications from '@layout/components/MainHeader/Notifications';
import Profile from '@layout/components/MainHeader/Profile';
import SearchInput from '@layout/components/MainHeader/SearchInput';
import SideBar from '@layout/MainLayout/SideBar';
import { ROUTE_PATH, disableScroll, enableScroll } from '@utils/common';

export const IconCloseMenu = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='23' height='24' viewBox='0 0 23 24' fill='none'>
    <path d='M20 20.5L3 3.5' stroke='#589DC0' strokeWidth='2.6' strokeLinecap='round' />
    <path d='M3 20.5L20 3.5' stroke='#589DC0' strokeWidth='2.6' strokeLinecap='round' />
  </svg>
);

const MenuMobile = () => {
  const [isShowNavigate, setIsShowNavigate] = React.useState(false);

  useEffect(() => {
    if (isShowNavigate) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isShowNavigate]);

  const onShowNavigate = () => {
    setIsShowNavigate(!isShowNavigate);
  };

  return (
    <>
      <span className='flex cursor-pointer items-center desktop:hidden' onClick={onShowNavigate}>
        {isShowNavigate ? (
          <IconCloseMenu />
        ) : (
          <img
            src='/static/icons/icon-bar-mobile.svg'
            alt='Icon bar'
            className='h-[32px] w-[32px] object-contain'
          />
        )}
      </span>
      <div
        className={classNames(
          'absolute  left-[-100%]  top-[55px] z-[9999] h-[calc(100vh-115px)] w-full bg-[#fff]  [transition:0.3s] desktop:hidden ',
          {
            'left-[0]': isShowNavigate,
          },
        )}
      >
        <div className='mt-[12px]'>
          <SideBar />
        </div>
      </div>
    </>
  );
};

const MainHeader = () => {
  const router = useRouter();

  const isHideHeaderOpenAppOnMobile = [
    ROUTE_PATH.REDIRECT,
    ROUTE_PATH.SETTING,
    ROUTE_PATH.SETTING_CHANGE_PASSWORD,
    ROUTE_PATH.SETTING_CHANGE_USERNAME,
    ROUTE_PATH.SETTING_CHANGE_PASSWORD_VERIFICATION,
    ROUTE_PATH.SETTING_CHANGE_USERNAME_VERIFICATION,
    ROUTE_PATH.PROFILE_VERIFICATION,
  ].includes(router?.pathname);

  return (
    <>
      <div className=' sticky left-0 top-0 z-[99] h-[56px] border-b-[1px] border-solid border-[#EBEBEB] bg-white'>
        {!isHideHeaderOpenAppOnMobile && (
          <div className='flex justify-between bg-[#EAF4FB] p-[10px] tablet:hidden'>
            <div className='flex flex-row'>
              <img src='/static/icons/logo.svg' alt='' width='0' height='0' className='w-[35px]' />
              <div className='ml-[8px]'>
                <Text type='body-14-regular' color='primary-5'>
                  Try full experience on
                </Text>
                <CustomLink href='https://onelink.to/cgarrk'>
                  <Text type='body-14-medium' color='primary-5'>
                    Mobile App
                  </Text>
                </CustomLink>
              </div>
            </div>
            <CustomLink href='https://onelink.to/cgarrk'>
              <div className='flex h-[38px] w-[101px] items-center justify-center rounded-[41px] bg-[linear-gradient(247.96deg,_#1D6CAB_14.41%,_#589DC0_85.59%)] [box-shadow:0px_4px_16px_rgba(88,_157,_192,_0.24)]'>
                <Text type='body-14-bold' color='neutral-9'>
                  Open App
                </Text>
              </div>
            </CustomLink>
          </div>
        )}

        <div className='relative mx-auto flex h-[56px] max-w-[1355px] flex-row items-center justify-between px-[10px]'>
          <div className='flex items-center gap-[16px]'>
            <CustomLink href={ROUTE_PATH.HOME}>
              <img
                src='/static/icons/logo.svg'
                alt=''
                className='h-[40px] w-[40px] object-contain'
              />
            </CustomLink>

            <MenuMobile />
          </div>

          <div className='flex items-center gap-[12px]'>
            <SearchInput />

            <Notifications />

            <Profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
