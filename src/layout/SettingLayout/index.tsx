import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useResponsive } from '@hooks/useResponsive';

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
  const { isDesktop } = useResponsive();
  const router = useRouter();
  return (
    <>
      {isDesktop && <MainHeader />}
      <div className='desktop:bg-[#F8FAFD] desktop:pt-[25px]'>
        <div className='xl:container relative flex justify-center mobile-max:mx-auto tablet:overflow-auto'>
          <div className='sidebar mobile:hidden desktop:mr-[25px] desktop:block desktop:w-[218px]'>
            <SideBar />
          </div>
          <main className='max-w-[750px] justify-center mobile:w-full mobile-max:w-full tablet:w-full tablet:px-[15px] desktop:w-[calc(100%_-_218px)] desktop:px-0 xdesktop:w-[1124px]'>
            <img
              src='/static/icons/icon_back_header.svg'
              alt=''
              width='0'
              height='0'
              className='mt-8 ml-4 left-[10px] top-[23px] h-[16px] w-[10px] laptop:hidden cursor-pointer'
              onClick={() => router.back()}
            />
            <div className='mobile:mt-6 laptop:mr-4 laptop:mt-0 laptop:rounded-lg laptop:bg-white laptop:p-7'>
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
