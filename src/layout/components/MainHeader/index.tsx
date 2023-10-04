import React, { useEffect, useRef } from 'react';

import { useUpdateEffect } from 'ahooks';
import { useAtom } from 'jotai';
// import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import Fade from '@components/UI/Fade';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { useRouteSetting } from '@hooks/useRouteSetting';
import MenuMobile from '@layout/components/MainHeader/MenuMobile';
// import Notifications from '@layout/components/MainHeader/Notifications';
import Profile from '@layout/components/MainHeader/Profile';
import SearchInput from '@layout/components/MainHeader/SearchInput';
import { getAccessToken } from '@store/auth';
import { useHeaderSearch, useOpenSearch } from '@store/headerSearch/headerSearch';
import { openProfileAtom } from '@store/profile/profile';
import { useSidebarMobile } from '@store/sidebarMobile/sidebarMobile';
import { ROUTE_PATH } from '@utils/common';
import { DEEP_LINK } from 'src/constant';
import { downloadPineXAppTracking } from 'src/mixpanel/mixpanel';

// const SearchInput = dynamic(() => import('@layout/components/MainHeader/SearchInput'));
// const Notifications = dynamic(() => import('@layout/components/MainHeader/Notifications'), {
//   ssr: false,
// });
// const Profile = dynamic(() => import('@layout/components/MainHeader/Profile'), {
//   ssr: false,
// });

const MainHeader = () => {
  const { t } = useTranslation('common');
  const refHeader: any = useRef(null);
  const [openProfileMenu] = useAtom(openProfileAtom);
  const [sidebarMobile] = useSidebarMobile();
  const { isRouteSetting } = useRouteSetting();
  const { isMobile } = useResponsive();
  const token = getAccessToken();
  const router = useRouter();
  const [isShowSearch] = useHeaderSearch();
  const [isOpenSearch] = useOpenSearch();

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
        <Fade
          visible={!isRouteSetting}
          className='flex justify-between bg-[#EAF4FB] p-[10px] tablet:hidden'
        >
          <div className='flex flex-row'>
            <Image
              loading='lazy'
              src='/static/logo/logo.png'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='h-[35px] w-[35px]'
            />
            <div className='ml-[8px]'>
              <Text type={isMobile ? 'body-10-regular' : 'body-14-regular'} color='primary-5'>
                {t('try_full_experience_on')}
              </Text>
              <CustomLink
                href='https://onelink.to/cgarrk'
                onClick={() => downloadPineXAppTracking('CTA in App', 'Header')}
              >
                <Text type='body-14-medium' color='primary-5'>
                  {t('mobile_app')}
                </Text>
              </CustomLink>
            </div>
          </div>
          <CustomLink
            href={DEEP_LINK.OPEN_APP}
            target='_blank'
            onClick={() => downloadPineXAppTracking('CTA in App', 'Header')}
          >
            <div className='flex h-[38px] w-[101px] items-center justify-center rounded-[41px] bg-[linear-gradient(247.96deg,_#1D6CAB_14.41%,_#589DC0_85.59%)] [box-shadow:0px_4px_16px_rgba(88,_157,_192,_0.24)]'>
              <Text type='body-14-bold' color='neutral-9'>
                {t('open_app')}
              </Text>
            </div>
          </CustomLink>
        </Fade>

        <div className='relative mx-auto flex h-[56px] max-w-[1355px] flex-row items-center justify-between gap-[24px] px-[10px] galaxy-max:gap-[12px] desktop:h-[84px] desktop:px-[0]'>
          <div className='flex flex-none items-center desktop:w-[218px] desktop:gap-[16px]'>
            <CustomLink
              onClick={() => globalThis?.sessionStorage.removeItem('scrollPosition')}
              href={ROUTE_PATH.HOME}
            >
              <Text className='hidden' element='h1'>
                Cộng đồng đầu tư chứng khoán PineX
              </Text>
              <div className='flex items-center'>
                <Image
                  width='0'
                  height='0'
                  sizes='100vw'
                  src='/static/logo/logo.png'
                  alt='Cộng đồng đầu tư chứng khoán PineX'
                  className='hidden h-[40px] w-[40px] object-contain desktop:block desktop:h-[52px] desktop:w-[52px]'
                />

                <img
                  src='/static/logo/logo-website-pinetree.svg'
                  alt='Logo pinetree'
                  className='ml-[12px] hidden h-[32px] desktop:block'
                />
              </div>
            </CustomLink>
            <MenuMobile />
          </div>

          {isShowSearch && !isMobile && (
            <div className='ml-auto max-w-[740px] tablet-max:hidden laptop:ml-[initial] laptop:w-full'>
              <SearchInput />
            </div>
          )}

          <div className='z-10 flex  flex-none items-center justify-end gap-[12px] galaxy-max:gap-[2px] desktop:w-[350px]'>
            {isMobile && isShowSearch && <SearchInput />}
            {/* {!isOpenSearch && <Notifications />} */}
            {!isOpenSearch && <Profile />}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
