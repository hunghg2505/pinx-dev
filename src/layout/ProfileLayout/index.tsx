import dynamic from 'next/dynamic';

const MainHeader = dynamic(() => import('../components/MainHeader'), {
  ssr: false,
});
const SideBar = dynamic(() => import('@layout/MainLayout/SideBar'), {
  ssr: false,
});
const ContentRight = dynamic(() => import('@components/Home/ContentRight'), {
  ssr: false,
});
const ModalPage = dynamic(() => import('@components/ModalPage'), {
  ssr: false,
});
const ProfileLayout = ({ children }: any) => {
  return (
    <>
      <ModalPage />
      <MainHeader />
      <div className=' mt-[-68px] tablet:mt-0 tablet:pt-[25px] desktop:mx-0 desktop:bg-[#F8FAFD]'>
        <div className='xl:container table:container relative  flex justify-center overflow-auto '>
          <div className='sidebar mobile:hidden desktop:mr-[25px] desktop:block desktop:w-[218px]'>
            <SideBar />
          </div>
          <div className='tablet::w-[calc(100%_-_32px)] flex w-[1124px] items-start  px-0  pb-[20px] tablet-max:!px-[0px]'>
            <main className='mr-[24px] w-full max-w-[749px] rounded-[8px] mobile-max:w-full tablet-max:mr-[0px] tablet-max:!w-full  laptop-max:w-[calc(100%_-_315px)] desktop:bg-[#FFF] desktop:[box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)] '>
              {children}
            </main>
            <div className='w-[350px] tablet-max:hidden laptop-max:w-[300px]'>
              <ContentRight />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
