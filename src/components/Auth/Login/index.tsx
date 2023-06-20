// import { useTranslation } from 'next-i18next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Form from 'rc-field-form';

import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import { StyledInput } from '@components/UI/Input';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';

import ModalLoginTerm from './ModalLoginTerm';
import { useLogin } from './service';



const Login = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { onLogin } = useAuth();
  const { setUserLoginInfo } = useUserLoginInfo();

  const onSubmit = (values: any) => {
    requestLogin.run({
      userName: values?.userName,
      password: values?.password,
    });
  };

  const requestLogin = useLogin({
    onSuccess: (res: any) => {
      if (res?.data.token) {
        onLogin({
          token: res?.data.token,
          refreshToken: res?.refresh_token,
          expiredTime: res?.expired_time || 0,
        });
        setUserLoginInfo(res?.data);
        // if (res?.data.isReadTerms) {
        //   router.push(ROUTE_PATH.Home);
        // }
        router.push(ROUTE_PATH.Home);
      }
    },
    onError(e) {
      console.log(e?.errors?.[0] || e?.message, 'error');
    },
  });

  return (
    <>
      <div className='min-w-[98vw] mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <div className='w-full rounded-lg bg-white sm:max-w-md md:mt-0 xl:p-0'>
          <Form
            className='space-y-6'
            form={form}
            onFinish={onSubmit}
          >
            <div>
              {/* <label htmlFor='userName'>
                <Text type='body-12-bold' color='primary-5' className='mb-2'>
                  User ID
                </Text>
              </label> */}
              <FormItem name='userName' rules={[{ required: true, message: 'Please enter username!' }]}>
                <StyledInput placeholder='Username/ Account' />
              </FormItem>
            </div>
            <div>
              {/* <label htmlFor='password'>
                <Text type='body-12-bold' color='primary-5' className='mb-2'>
                  Password
                </Text>
              </label> */}
              <FormItem name='password' rules={[{ required: true, message: 'Please enter password!' }]}>
                <StyledInput placeholder='Password' type='password' />
              </FormItem>
            </div>
            <div className='!mt-3 flex flex-row-reverse'>
              <NextLink href={ROUTE_PATH.FORGOT_PASSWORD}>
                <Text type='body-14-medium' color='primary-2'>
                  Forgot password?
                </Text>
              </NextLink>
            </div>

            <ModalLoginTerm>
              <MainButton type='submit' className='w-full !mt-10'>Sign in</MainButton>
            </ModalLoginTerm>
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
