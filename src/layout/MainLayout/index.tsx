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
      {/* <div className='fixed left-0 top-0 z-10 w-full bg-[#ffffff]'> */}
      <MainHeader />
      {/* </div> */}
      <div className='relative flex justify-center overflow-auto mobile:container desktop:container'>
        <div className='sidebar mobile:hidden desktop:mr-[25px] desktop:block desktop:w-[218px]'>
          <SideBar />
        </div>
        <main className='tablet:w-full tablet:px-[15px] desktop:w-[1124px] desktop:px-0'>
          {children}
        </main>
        <div id='md-popup-container'></div>
      </div>
    </>
  );
};

export default MainLayout;
