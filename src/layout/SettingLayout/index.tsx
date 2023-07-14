import dynamic from 'next/dynamic';

const LoginHeader = dynamic(() => import('../components/LoginHeader'));

const SettingLayout = ({ children }: any) => {
  return (
    <>
      <LoginHeader />
      <main>
        <div className='md:h-screen lg:py-0 mx-auto flex flex-col items-center justify-center'>
          <div className='md:h-screen lg:py-0 mx-auto flex min-w-[100vw] flex-col items-center justify-center '>
            <div className='sm:max-w-md md:mt-0 xl:p-0 w-full rounded-lg bg-white'>
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SettingLayout;
