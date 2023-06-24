/* eslint-disable indent */
import { useCallback, useState } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Form from 'rc-field-form';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'react-hot-toast';

import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import LabelInput from '@components/UI/LabelInput';
// import Text from '@components/UI/Text';
import Notification from '@components/UI/Notification';
import { useUserRegisterInfo } from '@hooks/useUserRegisterInfo';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';
import { ENV } from '@utils/env';
import { REG_EMAIL, REG_PASSWORD, REG_PHONE_NUMBER } from '@utils/reg';

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
          case 'OTP': {
            router.push(ROUTE_PATH.REGISTER_OTP_VERIFICATION);
            break;
          }
          case 'LOGIN_ID': {
            router.push(ROUTE_PATH.REGISTER_USER_NAME);
            break;
          }
        }
      }
    },
    onError(e) {
      toast(() => <Notification type='error' message={e.error} />);
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
              <FormItem
                name='phoneNumber'
                rules={[
                  {
                    required: true,
                    message: 'Please enter phone number',
                  },
                  {
                    pattern: REG_PHONE_NUMBER,
                    message: 'Please enter valid phone number',
                  },
                ]}
              >
                <LabelInput
                  type='tel'
                  placeholder='Phone number'
                  labelContent='Phone number'
                  name='phoneNumber'
                />
              </FormItem>
              <FormItem
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Please enter email',
                  },
                  {
                    pattern: REG_EMAIL,
                    message: 'Please enter valid email',
                  },
                ]}
              >
                <LabelInput placeholder='Email' labelContent='Email' name='email' />
              </FormItem>
              <FormItem
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please enter password',
                  },
                  {
                    pattern: REG_PASSWORD,
                    message: 'Password must be at least 8 characters including at least 1 letter, 1 number and 1 special character.'
                  },
                ]}
              >
                <LabelInput
                  placeholder='Password'
                  type='password'
                  labelContent='Password'
                  name='password'
                />
              </FormItem>
              <FormItem
                name='confirmPassword'
                rules={[
                  {
                    required: true,
                    message: 'Please retype password',
                  },
                  {
                    validator: () => {
                      if (form.getFieldValue('password') !== form.getFieldValue('confirmPassword')) {
                        form.setFields([{
                          name: 'confirmPassword',
                          errors: ['Confirm password is incorrect'],
                        }])
                      }
                    },
                  }
                ]}
              >
                <LabelInput
                  placeholder='Confirm password'
                  type='password'
                  labelContent='Confirm password'
                  name='confirmPassword'
                />
              </FormItem>
              <div className='--neutral-1 ml-3 text-[12px] font-[500]'>
                By signing up, I agree to the
                <span>
                  <NextLink href='#' className='!text-[--primary-2]'>
                    &nbsp;Terms & Conditions
                  </NextLink>
                </span>
              </div>
              <MainButton type='submit' className='!mt-10 w-full'>
                Continue
              </MainButton>
            </Form>
          </div>
        </div>
      </GoogleReCaptchaProvider>
    </>
  );
};

export default Register;
