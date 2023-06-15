// import { useTranslation } from 'next-i18next';
import Base64 from 'crypto-js/enc-base64';
import sha256 from 'crypto-js/sha256';
import Image from 'next/image'
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Form from 'rc-field-form';
import ReCAPTCHA from 'react-google-recaptcha';

import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Text from '@components/UI/Text';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';

import { useLogin } from './service';

const encryptPassword = (value: string) => {
  const hash = sha256(value)
  const pass = Base64.stringify(hash)
  return pass
}

const Login = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { onLogin } = useAuth();

  const onSubmit = (values: any) => {
    requestLogin.run({
      email: values?.email,
      password: encryptPassword(values?.password),
    });
    // router.push(ROUTE_PATH.UserList);
  };

  const requestLogin = useLogin({
    onSuccess: (res: any) => {
      if (res?.token) {
        onLogin({
          token: res?.token,
          refreshToken: res?.refresh_token,
          expiredTime: res?.expired_time || 0,
        });
        router.push(ROUTE_PATH.Home);
      }
    },
    onError(e) {
      console.log(e?.errors?.[0] || e?.message, 'error');
    },
  });

  return (
    <>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <Form
            className='space-y-6 md:space-y-8'
            form={form}
            onFinish={onSubmit}
          >
            <div className='flex justify-center max-sm:mt-6'>
              <Image src='/static/icons/pinex_logo.svg' alt='' width='0' height='0' className={'w-[77px] h-[77px] mb-6'} />
            </div>
            <div>
              <label htmlFor='userName'>
                <Text type='body-12-bold' color='primary-5' className='mb-2'>
                  User ID
                </Text>
              </label>
              <FormItem name='userName'>
                <Input
                  placeholder='Username/ Account'
                  className='w-full font-[500] text-[14px] p-4 border rounded-xl border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 !bg-[--primary-3] primary-1 placeholder:text-[--primary-1]'
                />
              </FormItem>
            </div>
            <div>
              <label htmlFor='password'>
                <Text type='body-12-bold' color='primary-5' className='mb-2'>
                  Password
                </Text>
              </label>
              <FormItem name='password'>
                <Input
                  placeholder='Password'
                  type='password'
                  className='w-full font-[500] text-[14px] p-4 border rounded-xl border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 !bg-[--primary-3] primary-1 placeholder:text-[--primary-1]'
                />
              </FormItem>
            </div>
            <div className='!mt-3 flex flex-row-reverse'>
              <NextLink href={ROUTE_PATH.FORGOT_PASSWORD}>
                <Text type='body-14-regular' color='primary-2'>
                  Forgot password?
                </Text>
              </NextLink>
            </div>

            <div className='flex justify-center !mt-8'>
              <ReCAPTCHA
                sitekey="Your client site key"
                // onChange={onChange}
                size='normal'
              />
            </div>


            <button type='submit' className='w-full text-white font-[700] text-[17px] bg-[linear-gradient(238.35deg,_#1D6CAB_7.69%,_#589DC0_86.77%)] rounded-[10px] py-[14px] text-center !mt-10'>Sign in</button>
            {/* <div className='text-center !mt-8'>
                <Text type='body-14-regular'>
                  Don’t have an account ?
                </Text>
                <NextLink href={ROUTE_PATH.REGISTER}>
                  <Text type='body-14-bold' color='primary-2'>
                    Sign up
                  </Text>
                </NextLink>
              </div> */}
          </Form>
        </div >
      </div >
    </>
  );
}

export default Login;
