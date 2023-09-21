import { useAtom } from 'jotai';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';
import toast from 'react-hot-toast';

import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import LabelInput from '@components/UI/LabelInput';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useAuth } from '@store/auth/useAuth';
import { popupStatusAtom } from '@store/popup/popup';
import { useProfileSettingInitial } from '@store/profileSetting/useGetProfileSetting';
import { ROUTE_PATH, checkUserType } from '@utils/common';
import { LoginTracking } from '@utils/dataLayer';

import { useLogin } from './service';

interface Iprops {
  isModal?: boolean;
}

const Login = (props: Iprops) => {
  const { t } = useTranslation('common');
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { requestProfleSetting } = useProfileSettingInitial();
  const { isModal } = props;
  const router = useRouter();
  const [form] = Form.useForm();
  const { onLogin } = useAuth();
  const { setUserLoginInfo, setIsReadTerms, setUserType, setForceAllowTerm } = useUserLoginInfo();
  const date = new Date();

  const onSubmit = (values: any) => {
    requestLogin.run({
      username: values?.username,
      password: values?.password,
    });
  };

  const requestLogin = useLogin({
    onSuccess: (res: any) => {
      if (res?.data.token) {
        const loginData = res?.data;
        onLogin({
          token: loginData.token,
          refreshToken: res?.refresh_token,
          expiredTime: res?.expired_time || 0,
        });
        LoginTracking(
          'Login',
          loginData.cif,
          loginData.acntStat === 'ACTIVE' ? 'Complete VSD Account' : ' Not Verified',
          loginData.username,
          date,
          '',
        );
        requestProfleSetting();
        setUserLoginInfo(loginData);
        setForceAllowTerm(loginData.forceAllow);
        if (loginData.isReadTerms === 'true') {
          setIsReadTerms(true);
        }
        setUserType(checkUserType(loginData?.custStat, loginData?.acntStat));
        if (isModal) {
          setPopupStatus({
            ...popupStatus,
            popupAuth: false,
          });
          router.reload();
        } else {
          // router.push(ROUTE_PATH.HOME);
          window.location.href = ROUTE_PATH.HOME;
        }
      }
    },
    onError(e) {
      toast(() => <Notification type='error' message={e?.error} />);
      LoginTracking('Failed', '', '', '', date, '');
    },
  });

  return (
    <>
      <Form className='mt-10 space-y-6 laptop:w-full' form={form} onFinish={onSubmit}>
        <FormItem name='username' rules={[{ required: true, message: t('please_enter_username') }]}>
          <LabelInput placeholder={t('username')} labelContent={t('username')} name='username' />
        </FormItem>
        <FormItem
          name='password'
          rules={[
            {
              required: true,
              message: t('please_enter_password'),
            },
          ]}
        >
          <LabelInput
            placeholder={t('password')}
            labelContent={t('password')}
            type='password'
            name='password'
          />
        </FormItem>

        <div className='!mt-3 flex flex-row-reverse'>
          <NextLink href={ROUTE_PATH.FORGOT_PASSWORD}>
            <Text type='body-14-medium' color='primary-2'>
              {t('forgot_password')}
            </Text>
          </NextLink>
        </div>

        <MainButton
          type='submit'
          className='!mt-2 w-full'
          disabled={requestLogin.loading}
          loading={requestLogin.loading}
        >
          {t('login')}
        </MainButton>

        {!isModal && (
          <div className='mt-9 flex flex-col items-center'>
            <NextLink href={ROUTE_PATH.HOME}>
              <Text type='body-14-medium' color='primary-1'>
                {t('skip_forgot_password')}
              </Text>
            </NextLink>
          </div>
        )}
      </Form>
    </>
  );
};

export default Login;
