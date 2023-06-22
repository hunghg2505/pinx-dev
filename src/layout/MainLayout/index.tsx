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
      <div className='flex justify-center mobile:container desktop:container'>
        <div className='sidebar mobile:hidden desktop:mr-[25px] desktop:block desktop:w-[218px]'>
          <SideBar />
        </div>
        <main className='desktop:w-[1124px]'>{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
