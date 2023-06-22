/* eslint-disable indent */
import { useCallback, useState } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Form from 'rc-field-form';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';

import FormItem from '@components/UI/FormItem';
import { StyledInput } from '@components/UI/Input';
// import Text from '@components/UI/Text';
import { useUserRegisterInfo } from '@hooks/useUserRegisterInfo';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';
import { ENV } from '@utils/env';
import { REG_EMAIL, REG_PHONE_NUMBER } from '@utils/reg';

import { useRegister } from './service';

const Register = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const { onLogin } = useAuth();
  const { setUserRegisterInfo } = useUserRegisterInfo();

  const onSubmit = (values: any) => {
    const registerParams = {
      phoneNumber: values?.phoneNumber,
      password: values?.password,
      email: values?.email,
      recaptcha: recaptchaToken,
    };
    requestRegister.run(registerParams);
    setUserRegisterInfo(registerParams);
    onRefreshReCaptcha();
  };

  const requestRegister = useRegister({
    onSuccess: (res: any) => {
      if (res?.data) {
        onLogin({
          token: res?.data.token,
          refreshToken: res?.refresh_token,
          expiredTime: res?.expired_time || 0,
        });
        switch (res?.data.nextStep) {
          case 'OTP':
            router.push(ROUTE_PATH.REGISTER_OTP_VERIFICATION);
            break;
          case 'LOGIN_ID':
            router.push(ROUTE_PATH.REGISTER_USER_NAME);
            break;
        }
      }
    },
    onError(e) {
      console.log(e?.errors?.[0] || e?.message, 'error');
    },
  });

  const onVerify = useCallback((token: any) => {
    setRecaptchaToken(token);
  }, []);

  const onRefreshReCaptcha = () => {
    /* do something like submit a form and then refresh recaptcha */
    setRefreshReCaptcha((r) => !r);
  };

  return (
    <>
      <GoogleReCaptchaProvider reCaptchaKey={ENV.RECAPTHCHA_SITE_KEY}>
        <GoogleReCaptcha onVerify={onVerify} refreshReCaptcha={refreshReCaptcha} />
        <div className='mx-auto flex min-w-[98vw] flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
          <div className='w-full rounded-lg bg-white sm:max-w-md md:mt-0 xl:p-0'>
            <Form className='space-y-6' form={form} onFinish={onSubmit}>
              <div>
                <FormItem
                  name='phoneNumber'
                  rules={[
                    {
                      pattern: REG_PHONE_NUMBER,
                      required: true,
                      message: 'Please enter valid phone number!',
                    },
                  ]}
                >
                  <StyledInput type='number' placeholder='Phone number' />
                </FormItem>
              </div>
              <div>
                <FormItem
                  name='email'
                  rules={[
                    {
                      pattern: REG_EMAIL,
                      required: true,
                      message: 'Please enter valid email!',
                    },
                  ]}
                >
                  <StyledInput placeholder='Email' />
                </FormItem>
              </div>
              <div>
                <FormItem
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter password!',
                    },
                  ]}
                >
                  <StyledInput placeholder='Password' type='password' />
                </FormItem>
              </div>

              <div>
                <FormItem
                  name='confirmPassword'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter password!',
                    },
                  ]}
                >
                  <StyledInput placeholder='Confirm password' type='password' />
                </FormItem>
              </div>

              <div className='--neutral-1 ml-3 text-[12px] font-[500]'>
                By signing up, I agree to the
                <span>
                  <NextLink href='#' className='!text-[--primary-2]'>
                    &nbsp;Terms & Conditions
                  </NextLink>
                </span>
              </div>

              <button
                type='submit'
                className='!mt-10 w-full rounded-[10px] bg-[linear-gradient(238.35deg,_#1D6CAB_7.69%,_#589DC0_86.77%)] py-[14px] text-center text-[17px] font-[700] text-white'
              >
                Continue
              </button>
            </Form>
          </div>
        </div>
      </GoogleReCaptchaProvider>
    </>
  );
};

export default Register;
