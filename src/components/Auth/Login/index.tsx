/* eslint-disable indent */
// import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import Image from 'next/image';
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

import ModalLoginTerms from './ModelLoginTerms';
import { useLogin } from './service';

const checkUserType = (custStat: string, acntStat: string) => {
  if (custStat === 'NEW') {
    return 'NEW';
  }
  if (
    (custStat === 'PRO' && acntStat === 'VSD_PENDING') ||
    (custStat === 'PRO' && acntStat === 'VSD_REJECTED ')
  ) {
    return 'EKYC';
  }
  return 'VSD';
};

const Login = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { onLogin } = useAuth();
  const { setUserLoginInfo } = useUserLoginInfo();
  const [showModalLoginTerms, setShowModalLoginTerms] = useState<boolean>(false);
  const [userType, setUserType] = useState<string>('');

  const onSubmit = (values: any) => {
    requestLogin.run({
      username: values?.username,
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

        if (res?.data.isReadTerms === 'true') {
          router.push(ROUTE_PATH.HOME);
        } else {
          switch (checkUserType(res?.data?.custStat, res?.data?.acntStat)) {
            case 'NEW':
              setUserType('NEW');
              break;
            case 'EKYC':
              setUserType('EKYC');
              break;
            case 'VSD':
              setUserType('VSD');
              break;
          }
          setShowModalLoginTerms(true);
        }
      }
    },
    onError(e) {
      console.log(e?.errors?.[0] || e?.message, 'error');
    },
  });

  const onToggleModalLoginTerms = () => {
    setShowModalLoginTerms(!showModalLoginTerms);
  };

  return (
    <>
      <div className='mx-auto flex min-w-[98vw] flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <div className='w-full rounded-lg bg-white sm:max-w-md md:mt-0 xl:p-0'>
          <Form className='space-y-6' form={form} onFinish={onSubmit}>
            <div>
              <FormItem
                name='username'
                rules={[{ required: true, message: 'Please enter username!' }]}
              >
                <StyledInput placeholder='Username/ Account' />
              </FormItem>
            </div>
            <div>
              <FormItem
                name='password'
                rules={[{ required: true, message: 'Please enter password!' }]}
              >
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

            <ModalLoginTerms
              visible={showModalLoginTerms}
              onToggle={onToggleModalLoginTerms}
              userType={userType}
              closeIcon={
                <Image
                  src='/static/icons/close_modal_icon.svg'
                  alt=''
                  width='0'
                  height='0'
                  className='h-[24px] w-[24px]'
                />
              }
            />
            <MainButton type='submit' className='!mt-10 w-full'>
              Sign in
            </MainButton>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
