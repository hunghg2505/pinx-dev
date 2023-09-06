import React, { useEffect, useRef } from 'react';

import { useMount, useUpdateEffect } from 'ahooks';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { useRouteSetting } from '@hooks/useRouteSetting';
// import { userLoginInfoAtom } from '@hooks/useUserLoginInfo';
import FormSearch from '@layout/components/MainHeader/FormSearch';
// import Notifications from '@layout/components/MainHeader/Notifications';
import Profile from '@layout/components/MainHeader/Profile';
import SearchInput from '@layout/components/MainHeader/SearchInput';
import SideBar from '@layout/MainLayout/SideBar';
import { getAccessToken } from '@store/auth';
import { openProfileAtom } from '@store/profile/profile';
import { useSidebarMobile } from '@store/sidebarMobile/sidebarMobile';
import { ROUTE_PATH } from '@utils/common';
import { DownloadPineXApp } from '@utils/dataLayer';

export const IconCloseMenu = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='23' height='24' viewBox='0 0 23 24' fill='none'>
    <path d='M20 20.5L3 3.5' stroke='#589DC0' strokeWidth='2.6' strokeLinecap='round' />
    <path d='M3 20.5L20 3.5' stroke='#589DC0' strokeWidth='2.6' strokeLinecap='round' />
  </svg>
);

const MenuMobile = () => {
  const [isShowNavigate, setIsShowNavigate] = useSidebarMobile();
  const router = useRouter();
  const [, setOpenProfileMenu] = useAtom(openProfileAtom);
  const { isRouteSetting } = useRouteSetting();

  useMount(() => {
    router.events.on('routeChangeStart', () => {
      // @ts-ignore
      setIsShowNavigate(false);
    });
  });

  const onShowNavigate = () => {
    // @ts-ignore
    setIsShowNavigate(!isShowNavigate);

    setOpenProfileMenu(false);
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
          'overflow-overlay fixed left-[-100%] z-[9999] w-full bg-[#fff] pb-[30px] pt-[12px] [transition:0.3s] desktop:hidden ',
          {
            'left-[0]': isShowNavigate,
            'top-[55px]': isRouteSetting,
            'h-[calc(100vh-56px)]': isRouteSetting,
            'top-[115px]': !isRouteSetting,
            'h-[calc(100vh-115px)]': !isRouteSetting,
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
  const { t } = useTranslation('common');
  const refHeader: any = useRef(null);
  const [openProfileMenu] = useAtom(openProfileAtom);
  const [sidebarMobile] = useSidebarMobile();
  const { isRouteSetting } = useRouteSetting();
  const [isOpenSearch, setIsOpenSearch] = React.useState(false);
  const { isMobile } = useResponsive();
  const token = getAccessToken();
  const router = useRouter();
  const isRouteExplore = [ROUTE_PATH.EXPLORE, ROUTE_PATH.SEARCH].includes(router.pathname);

  useEffect(() => {
    let lastScrollTop = 0;

    const onScroll = () => {
      if (window?.innerWidth > 600) {
        return;
      }

      if (sidebarMobile || openProfileMenu) {
        return;
      }

      const st = window?.pageYOffset || document.documentElement.scrollTop;

      if (st > lastScrollTop) {
        refHeader.current?.classList.add('headerHide');
      } else if (st < lastScrollTop) {
        refHeader.current?.classList.remove('headerHide');
      }

      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or nega
    };

    document.addEventListener('scroll', onScroll);
    document.addEventListener('touchmove', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
      document.removeEventListener('touchmove', onScroll);
    };
  });
  useUpdateEffect(() => {
    router.reload();
  }, [token]);
  return (
    <>
      <div
        className=' sticky left-0 top-0 z-[999] border-b-[1px] border-solid border-[#EBEBEB] bg-white transition-all duration-[350ms] ease-in-out  desktop:h-[84px]'
        ref={refHeader}
      >
        {!isRouteSetting && (
          <div className='flex justify-between bg-[#EAF4FB] p-[10px] tablet:hidden'>
            <div className='flex flex-row'>
              <img
                loading='lazy'
                src='/static/icons/logo.svg'
                alt=''
                width='0'
                height='0'
                className='w-[35px]'
              />
              <div className='ml-[8px]'>
                <Text type={isMobile ? 'body-10-regular' : 'body-14-regular'} color='primary-5'>
                  {t('try_full_experience_on')}
                </Text>
                <CustomLink
                  href='https://onelink.to/cgarrk'
                  onClick={() => DownloadPineXApp('CTA in App', 'Header')}
                >
                  <Text type='body-14-medium' color='primary-5'>
                    {t('mobile_app')}
                  </Text>
                </CustomLink>
              </div>
            </div>
            <CustomLink
              href='https://onelink.to/cgarrk'
              onClick={() => DownloadPineXApp('CTA in App', 'Header')}
            >
              <div className='flex h-[38px] w-[101px] items-center justify-center rounded-[41px] bg-[linear-gradient(247.96deg,_#1D6CAB_14.41%,_#589DC0_85.59%)] [box-shadow:0px_4px_16px_rgba(88,_157,_192,_0.24)]'>
                <Text type='body-14-bold' color='neutral-9'>
                  {t('open_app')}
                </Text>
              </div>
            </CustomLink>
          </div>
        )}

        <div className='relative mx-auto flex h-[56px] max-w-[1355px] flex-row items-center justify-between gap-[24px] px-[10px] galaxy-max:gap-[12px] desktop:h-[84px] desktop:px-[0]'>
          {isOpenSearch ? (
            <div className='flex w-[100%] items-center gap-[16px]'>
              {isMobile && (
                <FormSearch
                  className='w-full'
                  isOpenSearch={isOpenSearch}
                  setIsOpenSearch={setIsOpenSearch}
                />
              )}
            </div>
          ) : (
            <>
              <div className='flex w-full max-w-[218px] items-center gap-[16px] '>
                <CustomLink href={ROUTE_PATH.HOME}>
                  <div className='flex items-center'>
                    <img
                      src='/static/icons/logo.svg'
                      alt=''
                      className='h-[40px] w-[40px] object-contain desktop:h-[52px] desktop:w-[52px]'
                    />

                    <img
                      src='/static/logo/logo-website-pinetree.svg'
                      alt='Logo pinetree'
                      className='ml-[12px] hidden h-[32px] desktop:block'
                    />
                  </div>
                </CustomLink>
                <Text className='hidden' element='h1'>
                  Cộng đồng đầu tư chứng khoán PineX
                </Text>
                <MenuMobile />
              </div>
              {!isMobile && !isRouteExplore && (
                <div className='hidden w-full flex-auto'>
                  <SearchInput isOpenSearch={isOpenSearch} setIsOpenSearch={setIsOpenSearch} />
                </div>
              )}
              <div className='flex w-full max-w-[350px] items-center justify-end gap-[12px] galaxy-max:gap-[2px]'>
                {/* {isMobile && !isRouteExplore && (
                  <SearchInput isOpenSearch={isOpenSearch} setIsOpenSearch={setIsOpenSearch} />
                )} */}
                {/* <Notifications /> */}
                <Profile />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MainHeader;
