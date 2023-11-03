/* eslint-disable @typescript-eslint/no-unused-vars */
import dynamic from 'next/dynamic';

import lazyLoadHydrate from '@components/LazyComp/LazyComp';
import FakeLogo from '@layout/components/MainHeader/Comp/FakeLogo';
import ButtonSearch from '@layout/components/MainHeader/FormSearch/ButtonSearch';
import { getAccessToken } from '@store/auth';
import { useHeaderSearch, useOpenSearch } from '@store/headerSearch/headerSearch';

const Logo = dynamic(() => import('@layout/components/MainHeader/Logo'), {
  ssr: false,
  loading: () => <FakeLogo />,
});
const SearchInput = lazyLoadHydrate(
  () => import('@layout/components/MainHeader/FormSearch/SearchInput'),
  false,
);
const Notifications = lazyLoadHydrate(
  () => import('@layout/components/MainHeader/Notifications'),
  false,
);
const Profile = lazyLoadHydrate(() => import('@layout/components/MainHeader/Profile'), true);
const ScrollWrap = dynamic(() => import('@layout/components/MainHeader/ScrollWrap'));
const DownloadApp = dynamic(() => import('@layout/components/MainHeader/DownloadApp'), {
  loading: () => <div className='h-[58px] bg-[#eaf4fb]'></div>,
});

const MainHeader = () => {
  // const token = getAccessToken();
  // const router = useRouter();
  const [isShowSearch] = useHeaderSearch();
  const [isOpenSearch] = useOpenSearch();
  const isLogin = getAccessToken();

  // useUpdateEffect(() => {
  //   if (token) {
  //     router.reload();
  //   }
  // }, [token]);

  return (
    <ScrollWrap>
      <DownloadApp />

      <div className='relative mx-auto flex h-[56px] max-w-[1355px] flex-row items-center justify-between gap-[24px] px-[10px] galaxy-max:gap-[12px] desktop:h-[84px] desktop:px-[0]'>
        <div className='flex flex-none items-center desktop:w-[218px] desktop:gap-[16px]'>
          <Logo />
        </div>

        {isShowSearch && (
          <div className='ml-auto w-full max-w-[740px] '>
            <SearchInput />
          </div>
        )}

        <div className='z-10 flex  flex-none items-center justify-end gap-[12px] galaxy-max:gap-[2px] desktop:w-[350px]'>
          {isShowSearch && <ButtonSearch />}

          {!isOpenSearch && isLogin && <Notifications />}

          {!isOpenSearch && <Profile />}
        </div>
      </div>
    </ScrollWrap>
  );
};

export default MainHeader;
