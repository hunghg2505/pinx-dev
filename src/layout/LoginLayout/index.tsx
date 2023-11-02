import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { HOME, LOGIN } from 'src/constant/route';

const LoginHeader = dynamic(() => import('../components/LoginHeader'));

const LoginLayout = ({ children }: any) => {
  const router = useRouter();

  const isRouteLogin = [LOGIN].includes(router?.pathname);

  return (
    <>
      <LoginHeader />

      <div className='flex w-full justify-center laptop:min-h-screen'>
        <div className='w-[40%] flex-col items-center bg-[#6DB6E1] mobile:hidden laptop:flex laptop:min-h-[750px]'>
          <Image
            src='/static/images/pinex_logo.png'
            alt=''
            width='0'
            height='0'
            sizes='50vw'
            className='!mt-[18vh] mb-24 h-[200px] w-[200px] text-center mobile:hidden laptop:block'
          />
          <Text className='text-[64px] font-[600] text-white'>Grow</Text>
          <Text className='text-[64px] font-[600] text-white'>Steadily</Text>
          <Text className='text-[64px] font-[600] text-white'>Together.</Text>
        </div>
        <main className='flex flex-col laptop:w-[60%]'>
          <div className='md:h-screen lg:py-0 mx-auto flex flex-col items-center justify-center'>
            {isRouteLogin ? (
              <CustomLink href={HOME}>
                <div className='flex items-center mobile:!mb-8 mobile:!mt-[10vh] laptop:!mb-14 laptop:!mt-[15vh]'>
                  <Image
                    src='/static/images/pinex_logo.png'
                    alt=''
                    width='0'
                    height='0'
                    sizes='50vw'
                    className='mobile:h-[50px] mobile:w-[50px] laptop:h-[72px] laptop:w-[72px]'
                  />

                  <img
                    src='/static/logo/logo-website-pinetree.svg'
                    alt='Logo pinetree'
                    className='ml-[16px] mobile:h-[30px] laptop:h-[44px]'
                  />
                </div>
              </CustomLink>
            ) : (
              <div className='mobile:!mt-0 laptop:!mt-[30vh]' />
            )}

            <div className='md:h-screen lg:py-0 mx-auto flex min-w-[98vw] flex-col items-center justify-center px-6 laptop:min-w-min laptop:px-0'>
              <div className='sm:max-w-md md:mt-0 xl:p-0 w-full rounded-lg'>{children}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LoginLayout;
