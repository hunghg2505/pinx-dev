import dynamic from 'next/dynamic';

import ContentRightFake from '@components/Home/ContentRight/ContentRightFake';
import SideBar from '@layout/MainLayout/SideBar';

const MainHeader = dynamic(() => import('../components/MainHeader'), {
  ssr: false,
  loading: () => (
    <div className='border-b-[1px] border-solid border-[#EBEBEB] bg-white desktop:h-[84px]'></div>
  ),
});

const ModalPage = dynamic(() => import('@components/ModalPage'), {
  ssr: false,
});

const ContentRight = dynamic(() => import('@components/Home/ContentRight'), {
  ssr: false,
  loading: () => <ContentRightFake />,
});

const MainLayout = ({ children }: any) => {
  return (
    <>
      <MainHeader />

      <div className='desktop:bg-[#F8FAFD] desktop:pt-[25px]'>
        <div className=' mx-auto flex w-[100%] max-w-[1355px] justify-between gap-[24px] px-[10px] desktop:px-0'>
          <div className='flex-[218px_0_0]  mobile:hidden desktop:block'>
            <SideBar />
          </div>

          <div className='w-[100%] flex-1'>{children}</div>

          <div className='flex-[350px_0_0] mobile:hidden tablet:block '>
            <ContentRight />
          </div>
        </div>
      </div>

      <ModalPage />
    </>
  );
};

export default MainLayout;
