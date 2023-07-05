/* eslint-disable indent */
import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Form from 'rc-field-form';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'react-hot-toast';

import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import LabelInput from '@components/UI/LabelInput';
// import Text from '@components/UI/Text';
import Notification from '@components/UI/Notification';
import { useUserRegisterInfo } from '@hooks/useUserRegisterInfo';
import { deleteRegisterCookies } from '@store/auth';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';
import { TERM_AND_CONDITION_LINK } from '@utils/constant';
import { normalizeNumber } from '@utils/normalize';
import { REG_EMAIL, REG_PASSWORD, REG_PHONE_NUMBER } from '@utils/reg';

import { useRegister } from './service';

const Register = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const { onRegister } = useAuth();
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
        onRegister({
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
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  const onVerify = useCallback((token: any) => {
    setRecaptchaToken(token);
  }, []);

  const onRefreshReCaptcha = () => {
    /* do something like submit a form and then refresh recaptcha */
    setRefreshReCaptcha((r) => !r);
  };

  useEffect(() => {
    deleteRegisterCookies();
  }, []);

  return (
    <>
      <GoogleReCaptcha onVerify={onVerify} refreshReCaptcha={refreshReCaptcha} />
      <Form className='mt-10 max-w-[479px] space-y-6 laptop:w-full' form={form} onFinish={onSubmit}>
        <FormItem
          name='phoneNumber'
          normalize={(value: any, prevValue: any) => normalizeNumber(value, prevValue)}
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
            maxLength={10}
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
              message:
                'Password must be at least 8 characters including at least 1 letter, 1 number and 1 special character.',
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
            ({ getFieldValue }: { getFieldValue: any }) => ({
              validator(_: any, value: any) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Password does not match'));
              },
            }),
          ]}
        >
          <LabelInput
            placeholder='Confirm password'
            type='password'
            labelContent='Confirm password'
            name='confirmPassword'
          />
        </FormItem>
        <div className='--neutral-1 text-[12px] font-[500] tablet:text-center'>
          By signing up, I agree to the
          <span>
            <a
              href={TERM_AND_CONDITION_LINK}
              target='_blank'
              rel='noreferrer'
              className='!text-[--primary-2]'
            >
              &nbsp;Terms & Conditions
            </a>
          </span>
        </div>
        <MainButton type='submit' className='w-full'>
          Continue
        </MainButton>
      </Form>
    </>
  );
};

export default Register;
