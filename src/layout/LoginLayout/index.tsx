import dynamic from 'next/dynamic';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

const LoginHeader = dynamic(() => import('../components/LoginHeader'));

const LoginLayout = ({ children }: any) => {
  return (
    <>
      <LoginHeader />

      <div className='flex w-full justify-center laptop:min-h-screen'>
        <div className='w-[40%] flex-col items-center bg-[#6DB6E1] mobile:hidden laptop:flex laptop:min-h-[750px]'>
          <img
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
            <CustomLink href={ROUTE_PATH.HOME}>
              <div className='!mb-14 !mt-[15vh] flex items-center'>
                <img
                  src='/static/images/pinex_logo.png'
                  alt=''
                  width='0'
                  height='0'
                  sizes='50vw'
                  className='h-[72px] w-[72px] mobile:hidden laptop:block'
                />

                <img
                  src='/static/logo/logo-website-pinetree.svg'
                  alt='Logo pinetree'
                  className='ml-[16px] hidden h-[44px] laptop:block'
                />
              </div>
            </CustomLink>

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
