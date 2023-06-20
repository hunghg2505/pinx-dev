// import { useTranslation } from 'next-i18next';
import Base64 from 'crypto-js/enc-base64';
import sha256 from 'crypto-js/sha256';
import Image from 'next/image';
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
  const hash = sha256(value);
  const pass = Base64.stringify(hash);
  return pass;
};

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
      <div className='mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <div className='w-full rounded-lg bg-white dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
          <Form className='space-y-6 md:space-y-8' form={form} onFinish={onSubmit}>
            <div className='flex justify-center max-sm:mt-6'>
              <Image
                src='/static/icons/pinex_logo.svg'
                alt=''
                width='0'
                height='0'
                className={'mb-6 h-[77px] w-[77px]'}
              />
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
                  className='focus:ring-primary-600 focus:border-primary-600 primary-1 w-full rounded-xl border border-gray-300 !bg-[--primary-3] p-4 text-[14px] font-[500] text-gray-900 placeholder:text-[--primary-1]'
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
                  className='focus:ring-primary-600 focus:border-primary-600 primary-1 w-full rounded-xl border border-gray-300 !bg-[--primary-3] p-4 text-[14px] font-[500] text-gray-900 placeholder:text-[--primary-1]'
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

            <div className='!mt-8 flex justify-center'>
              <ReCAPTCHA
                sitekey='Your client site key'
                // onChange={onChange}
                size='normal'
              />
            </div>

            <button
              type='submit'
              className='!mt-10 w-full rounded-[10px] bg-[linear-gradient(238.35deg,_#1D6CAB_7.69%,_#589DC0_86.77%)] py-[14px] text-center text-[17px] font-[700] text-white'
            >
              Sign in
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
