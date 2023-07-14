import dynamic from 'next/dynamic';

const MainHeader = dynamic(() => import('../components/MainHeader'), {
  ssr: false,
});
const SideBar = dynamic(() => import('./SideBar'), {
  ssr: false,
});
const MainLayout = ({ children }: any) => {
  return (
    <>
      <MainHeader />
      <div className='desktop:bg-[#F8FAFD] desktop:pt-[25px]'>
        <div className='xl:container relative flex justify-center mobile:container laptop:container mobile-max:mx-auto tablet:overflow-auto'>
          <div className='sidebar mobile:hidden desktop:mr-[25px] desktop:block desktop:w-[218px]'>
            <SideBar />
          </div>
          <main className='mobile:w-full mobile-max:w-full tablet:w-full tablet:px-[15px] desktop:w-[calc(100%_-_218px)] desktop:px-0 xdesktop:w-[1124px]'>
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
