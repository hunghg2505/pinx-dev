import dynamic from 'next/dynamic';
import Image from 'next/image';

const LoginHeader = dynamic(() => import('../components/LoginHeader'));

const LoginLayout = ({ children }: any) => {
  return (
    <>
      <LoginHeader />
      <div className='flex justify-center laptop:min-h-[98vh] w-full'>
        <div className='h-auto mobile:hidden laptop:w-2/5 laptop:block'>
          <Image
            src='/static/images/left_login_container.png'
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='w-full h-[100vh]'
          />

        </div>
        <main className='laptop:w-3/5'>
          {children}
        </main>
      </div>

    </>
  );
};

export default LoginLayout;
