import dynamic from 'next/dynamic';

import ContentRight from '@components/Home/ContentRight';

const MainHeader = dynamic(() => import('../components/MainHeader'), {
  ssr: false,
});
const SideBar = dynamic(() => import('@layout/MainLayout/SideBar'), {
  ssr: false,
});
const ExploreLayout = ({ children }: any) => {
  return (
    <>
      <MainHeader />
      <div className='desktop:bg-[#F8FAFD] desktop:pt-[25px]'>
        <div className='xl:container relative flex justify-center overflow-auto mobile:container laptop:container'>
          <div className='sidebar mobile:hidden desktop:mr-[25px] desktop:block desktop:w-[218px]'>
            <SideBar />
          </div>
          <div className='tablet:w-full tablet:px-[15px] desktop:w-[calc(100%_-_218px)] desktop:px-0 xdesktop:w-[1124px]'>
            <main className='rounded-[8px] tablet:mr-[15px] tablet:w-[calc(100%_-_265px)] desktop:mr-[24px] desktop:w-[749px] desktop:bg-[#FFF] desktop:[box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
              {children}
            </main>
            <ContentRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExploreLayout;
