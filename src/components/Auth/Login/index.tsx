import { useState } from 'react';

import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Form from 'rc-field-form';
import { toast } from 'react-hot-toast';

import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import LabelInput from '@components/UI/LabelInput';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';

import ModalLoginTerms from './ModalLoginTerms';
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
            case 'NEW': {
              setUserType('NEW');
              break;
            }
            case 'EKYC': {
              setUserType('EKYC');
              break;
            }
            case 'VSD': {
              setUserType('VSD');
              break;
            }
          }
          setShowModalLoginTerms(true);
        }
      }
    },
    onError(e) {
      toast(() => <Notification type='error' message={e.error} />);
    },
  });

  const onToggleModalLoginTerms = () => {
    setShowModalLoginTerms(!showModalLoginTerms);
  };

  return (
    <>
      <Form className='mt-10 space-y-6' form={form} onFinish={onSubmit}>
        <FormItem name='username' rules={[{ required: true, message: 'Please enter username!' }]}>
          <LabelInput placeholder='Username' name='username' labelContent='Username' />
        </FormItem>
        <FormItem
          name='password'
          rules={[
            {
              required: true,
              message: 'Please enter password!',
            },
          ]}
        >
          <LabelInput
            placeholder='Password'
            type='password'
            name='password'
            labelContent='Password'
          />
        </FormItem>

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
        />
        <MainButton type='submit' className='!mt-10 w-full'>
          Sign in
        </MainButton>
      </Form>
    </>
  );
};

export default Login;
