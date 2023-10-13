import { memo } from 'react';

import dynamic from 'next/dynamic';

import ContentRightFake from '@components/Home/ContentRight/ContentRightFake';
// import LoadCompVisible from '@components/LoadCompVisible/LoadCompVisible';
import MainHeaderFake from '@layout/components/MainHeader/MainHeaderFake';

// import DesktopSidebar from './DesktopSidebar';

const MainHeader = dynamic(() => import('../components/MainHeader'), {
  ssr: false,
  loading: () => <MainHeaderFake />,
});

const DesktopSidebar = dynamic(() => import('./DesktopSidebar'), { ssr: false });

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
      <div className=' desktop:bg-[#F8FAFD] desktop:pt-[25px]'>
        <div className='mx-auto flex w-full max-w-[1355px] justify-between gap-[24px] desktop:px-0'>
          <div className='max-w-[218px] flex-1 mobile:hidden desktop:block ' id='left'>
            <DesktopSidebar />
          </div>

          <div className='w-full flex-1 overflow-hidden p-[10px] tablet:p-0'>{children}</div>

          <div className='max-w-[350px] flex-1 mobile:hidden tablet:block' id='right'>
            <ContentRight />
          </div>
        </div>
      </div>

      <ModalPage />
    </>
  );
};

export default memo(MainLayout);
