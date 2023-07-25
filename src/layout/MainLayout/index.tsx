import dynamic from 'next/dynamic';
import Sticky from 'reactjs-s4y';

import ContentRightFake from '@components/Home/ContentRight/ContentRightFake';
import MainHeaderFake from '@layout/components/MainHeader/MainHeaderFake';
import SideBar from '@layout/MainLayout/SideBar';

const MainHeader = dynamic(() => import('../components/MainHeader'), {
  ssr: false,
  loading: () => <MainHeaderFake />,
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

      <div className='desktop:bg-[#F8FAFD] desktop:pt-[25px] '>
        <div className=' MainLayout mx-auto flex w-[100%] max-w-[1355px] justify-between gap-[24px] desktop:px-0'>
          <div className='max-w-[218px] flex-1 mobile:hidden desktop:block'>
            <Sticky
              containerSelectorFocus='.MainLayout'
              stickyEnableRange={[768, Number.POSITIVE_INFINITY]}
              offsetTop={110}
            >
              <SideBar />
            </Sticky>
          </div>

          <div className='w-[100%] flex-1 overflow-hidden'>{children}</div>

          <div className='max-w-[350px] flex-1 mobile:hidden tablet:block '>
            <Sticky
              containerSelectorFocus='.MainLayout'
              stickyEnableRange={[768, Number.POSITIVE_INFINITY]}
              offsetTop={110}
            >
              <ContentRight />
            </Sticky>
          </div>
        </div>
      </div>

      <ModalPage />
    </>
  );
};

export default MainLayout;
