// import { useTranslation } from 'next-i18next';
import Text from '@components/UI/Text';

const Login = () => {
  return (
    <>
      <div className='mx-auto flex min-w-[98vw] flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <div className='w-full rounded-lg bg-white sm:max-w-md md:mt-0 xl:p-0'>
          <div className='mb-11 text-center'>
            <Text type='body-20-bold'>Điều khoản sử dụng</Text>
          </div>
          <div className='max-[600px]:w-[calc(100%+42px)] max-[600px]:ml-[-21px] border-b-[1px] border-solid border-[--neutral-5]' />
        </div>
      </div>
    </>
  );
};

export default Login;
