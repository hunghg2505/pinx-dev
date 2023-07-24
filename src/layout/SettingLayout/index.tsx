import dynamic from 'next/dynamic';

import { useResponsive } from '@hooks/useResponsive';
import SideBar from '@layout/MainLayout/SideBar';

const ContentRight = dynamic(() => import('@components/Home/ContentRight'), {
  ssr: false,
});
const ModalPage = dynamic(() => import('@components/ModalPage'), {
  ssr: false,
});

const MainHeader = dynamic(() => import('../components/MainHeader'), {
  ssr: false,
  loading: () => (
    <div className='border-b-[1px] border-solid border-[#EBEBEB] bg-white desktop:h-[84px]'></div>
  ),
});

const SettingLayout = ({ children }: any) => {
  const { isDesktop } = useResponsive();
  return (
    <>
      {isDesktop && <MainHeader />}
      <div className='desktop:bg-[#F8FAFD] desktop:pt-[25px]'>
        <div className='xl:container relative flex justify-center overflow-auto'>
          <div className='sidebar mobile:hidden desktop:mr-[25px] desktop:block desktop:w-[218px]'>
            <SideBar />
          </div>
          <div className='flex w-[1124px] items-start px-0 mobile-max:mx-auto mobile-max:w-[calc(100%_-_32px)] tablet-max:!px-[0px]  laptop-max:w-[calc(100%_-_32px)]'>
            <main className='mr-[24px] w-[749px] rounded-[8px] mobile-max:w-full tablet-max:mr-[0px]  tablet-max:!w-full laptop-max:w-[calc(100%_-_315px)] desktop:bg-[#FFF] desktop:[box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
              {children}
            </main>
            <div className='tablet-max:hidden laptop-max:w-[300px] desktop:w-[300px] xdesktop:w-[350px]'>
              <ContentRight />
            </div>
          </div>
        </div>
      </div>

      <ModalPage />
    </>
  );
};

export default SettingLayout;
