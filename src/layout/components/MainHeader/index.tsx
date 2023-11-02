import { useUpdateEffect } from 'ahooks';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';

import lazyLoadHydrate from '@components/LazyComp/LazyComp';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { useRouteSetting } from '@hooks/useRouteSetting';
import { getAccessToken } from '@store/auth';
import { useHeaderSearch, useOpenSearch } from '@store/headerSearch/headerSearch';
import { ROUTE_PATH } from '@utils/common';

const MenuMobile = lazyLoadHydrate(
  () => import('@layout/components/MainHeader/MenuMobile'),
  false,
  () => (
    <div className='flex w-[96vw] items-center justify-between px-[10px] tablet:hidden'>
      <div className='h-[32px] w-[32px] bg-[#589dc1]'></div>
      <div className='h-[40px] w-[90px] bg-[#B1D5F1]'></div>
    </div>
  ),
);
const SearchInput = lazyLoadHydrate(
  () => import('@layout/components/MainHeader/SearchInput'),
  false,
);
const Notifications = lazyLoadHydrate(
  () => import('@layout/components/MainHeader/Notifications'),
  false,
);
const Profile = lazyLoadHydrate(() => import('@layout/components/MainHeader/Profile'), false);
const ScrollWrap = dynamic(() => import('@layout/components/MainHeader/ScrollWrap'));
const DownloadApp = dynamic(() => import('@layout/components/MainHeader/DownloadApp'), {
  loading: () => <div className='h-[58px] bg-[#eaf4fb]'></div>,
});

const MainHeader = () => {
  const { isRouteSetting } = useRouteSetting();
  const { isMobile } = useResponsive();
  const token = getAccessToken();
  const router = useRouter();
  const [isShowSearch] = useHeaderSearch();
  const [isOpenSearch] = useOpenSearch();
  const isLogin = getAccessToken();

  useUpdateEffect(() => {
    router.reload();
  }, [token]);

  return (
    <ScrollWrap>
      {!isRouteSetting && <DownloadApp isMobile={isMobile} />}

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

              <Image
                width={85}
                height={32}
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
          {!isOpenSearch && isLogin && <Notifications />}
          {!isOpenSearch && <Profile />}
        </div>
      </div>
    </ScrollWrap>
  );
};

export default MainHeader;
