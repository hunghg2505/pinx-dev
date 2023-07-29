/* eslint-disable unicorn/consistent-function-scoping */
import { useRef } from 'react';

import { useUpdateEffect } from 'ahooks';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
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
  const refLeft: any = useRef(null);
  const refRight: any = useRef(null);
  const router = useRouter();

  useUpdateEffect(() => {
    const init = async () => {
      try {
        if (refLeft.current?.resetState) {
          await refLeft.current.resetState();
        }
        if (refRight.current?.resetState) {
          await refRight.current.resetState();
        }
        const t = setTimeout(async () => {
          window.scrollTo(0, window.scrollY + 5);
          clearTimeout(t);
        }, 600);
      } catch {}
    };
    init();
  }, [router.pathname]);

  return (
    <>
      <MainHeader />

      <div className=' desktop:bg-[#F8FAFD] desktop:pt-[25px]'>
        <div className='  mx-auto flex w-[100%] max-w-[1355px] justify-between gap-[24px] desktop:px-0'>
          <div className='max-w-[218px] flex-1 mobile:hidden desktop:block '>
            <Sticky offsetTop={110} ref={refLeft} key={router.pathname}>
              <SideBar />
            </Sticky>
          </div>

          <div className='w-[100%] flex-1 overflow-hidden'>{children}</div>

          <div className=' max-w-[350px] flex-1 mobile:hidden tablet:block'>
            <Sticky offsetTop={110} ref={refRight} key={router.pathname}>
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
