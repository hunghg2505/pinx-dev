/* eslint-disable indent */
import { useCallback, useState } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Form from 'rc-field-form';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';

import Checkbox from '@components/UI/Checkbox';
import FormItem from '@components/UI/FormItem';
import { StyledInput } from '@components/UI/Input';
// import Text from '@components/UI/Text';
import { useUserRegisterInfo } from '@hooks/useUserRegisterInfo';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';
import { ENV } from '@utils/env';
import { REG_EMAIL, REG_PHONE_NUMBER } from '@utils/reg';

import styles from './index.module.scss';
import { useRegister } from './service';

const Register = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
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
  };

  const requestRegister = useRegister({
    onSuccess: (res: any) => {
      if (res?.data.token) {
        onLogin({
          token: res?.data.token,
          refreshToken: res?.refresh_token,
          expiredTime: res?.expired_time || 0,
        });
        switch (res?.data.nextStep) {
          case 'OTP': {
            router.push(ROUTE_PATH.REGISTER_OTP_VERIFICATION);
          }
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

  return (
    <GoogleReCaptchaProvider reCaptchaKey={ENV.RECAPTHCHA_SITE_KEY}>
      <GoogleReCaptcha onVerify={onVerify} />
      <div className='mx-auto flex min-w-[98vw] flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <div className='w-full rounded-lg bg-white sm:max-w-md md:mt-0 xl:p-0'>
          <Form className='space-y-6' form={form} onFinish={onSubmit}>
            {/* <div className='!mb-6 flex items-center'>
              <Image
                src='/static/icons/regis_guide.svg'
                alt=''
                width='0'
                height='0'
                className={'mr-2 h-[38px] w-[38px]'}
              />
              <Text type='body-12-medium'>
                Don’t know how to set up your account? Read our
                <span>
                  <NextLink href='#' className='!text-[--primary-2]'>
                    &nbsp;Sign-up guidance
                  </NextLink>
                </span>
              </Text>
            </div> */}
            <div>
              {/* <label htmlFor='phoneNumber'>
                <Text type='body-12-bold' color='primary-5' className='mb-2'>
                  Phone number
                </Text>
              </label> */}
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
              {/* <label htmlFor='email'>
                <Text type='body-12-bold' color='primary-5' className='mb-2'>
                  Email
                </Text>
              </label> */}
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
              {/* <label htmlFor='password'>
                <Text type='body-12-bold' color='primary-5' className='mb-2'>
                  Password
                </Text>
              </label> */}
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
              {/* <label htmlFor='confirmPassword'>
                <Text type='body-12-bold' color='primary-5' className='mb-2'>
                  Confirm password
                </Text>
              </label> */}
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

            <div>
              <FormItem name='acceptSignUpTerm'>
                {({ value, onChange }: { value: boolean; onChange: any }) => {
                  return (
                    <Checkbox
                      onChange={() => onChange(!value)}
                      checked={!!value}
                      className={styles.checkbox}
                    >
                      <span className='--neutral-1 ml-3 text-[12px] font-[500]'>
                        By signing up, I agree to the
                        <span>
                          <NextLink href='#' className='!text-[--primary-2]'>
                            &nbsp;Terms & Conditions
                          </NextLink>
                        </span>
                      </span>
                    </Checkbox>
                  );
                }}
              </FormItem>
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
  );
};

export default Register;
