import dynamic from 'next/dynamic';

import { useResponsive } from '@hooks/useResponsive';

const LoginHeader = dynamic(() => import('../components/LoginHeader'));
const MainHeader = dynamic(() => import('../components/MainHeader'), {
  ssr: false,
});
const SideBar = dynamic(() => import('../MainLayout/SideBar'), {
  ssr: false,
});
const ContentRight = dynamic(() => import('@components/Home/ContentRight'), {
  ssr: false,
});

const SettingLayout = ({ children }: any) => {
  const { isMobile, isDesktop } = useResponsive();
  return (
    <>
      {isDesktop && <MainHeader />}
      <div className='min-h-[100vh] desktop:bg-[#F8FAFD] desktop:pt-[25px]'>
        <div className='xl:container relative flex justify-center mobile-max:mx-auto tablet:overflow-auto'>
          <div className='sidebar mobile:hidden desktop:mr-[25px] desktop:block desktop:w-[218px]'>
            <SideBar />
          </div>
          <main className='max-w-[750px] justify-center mobile:w-full mobile-max:w-full tablet:w-full tablet:px-[15px] desktop:w-[calc(100%_-_218px)] desktop:px-0 xdesktop:w-[1124px]'>
            {isMobile && <LoginHeader />}
            <div className='mobile:mt-20 laptop:mr-4 laptop:mt-0 laptop:rounded-lg laptop:bg-white laptop:p-7'>
              {children}
            </div>
          </main>
          <div className='mobile:hidden tablet:block tablet:w-[250px] tablet:pr-[2px] laptop:w-[350px]'>
            <ContentRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingLayout;
