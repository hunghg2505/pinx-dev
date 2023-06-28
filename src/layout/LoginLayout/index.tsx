import dynamic from 'next/dynamic';
import Image from 'next/image';

const LoginHeader = dynamic(() => import('../components/LoginHeader'));

const LoginLayout = ({ children }: any) => {
  return (
    <>
      <LoginHeader />
      <div className='flex w-full justify-center laptop:min-h-[98vh]'>
        <div className='h-auto mobile:hidden laptop:block laptop:w-[40%]'>
          <Image
            src='/static/images/left_login_container.png'
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='min-h-[700px] h-[100vh] w-full'
          />
        </div>
        <main className='laptop:w-[60%]'>
          <div className='md:h-screen lg:py-0 mx-auto flex flex-col items-center justify-center'>
            <Image
              src='/static/images/pinex_logo.png'
              alt=''
              width='0'
              height='0'
              sizes='50vw'
              className='!mt-[18vh] mb-12 h-[72px] w-[72px] mobile:hidden laptop:block'
            />
            <div className='md:h-screen lg:py-0 mx-auto flex min-w-[98vw] flex-col items-center justify-center px-6 laptop:min-w-min laptop:px-0'>
              <div className='sm:max-w-md md:mt-0 xl:p-0 w-full rounded-lg bg-white'>
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LoginLayout;
