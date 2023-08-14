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
import { ROUTE_PATH, checkUserType } from '@utils/common';
// import { PINETREE_LINK } from '@utils/constant';

import { useLogin } from './service';

interface Iprops {
  isModal?: boolean;
}

const Login = (props: Iprops) => {
  const { t } = useTranslation('common');
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { isModal } = props;
  const router = useRouter();
  const [form] = Form.useForm();
  const { onLogin } = useAuth();
  const { setUserLoginInfo, setIsReadTerms, setUserType, setForceAllowTerm } = useUserLoginInfo();

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
        setForceAllowTerm(res?.data.forceAllow);
        setUserType(checkUserType(res?.data?.custStat, res?.data?.acntStat));
        if (res?.data.isReadTerms === 'true') {
          setIsReadTerms(true);
        }
        if (isModal) {
          setPopupStatus({
            ...popupStatus,
            popupAuth: false,
          });
          router.reload();
        } else {
          router.push(ROUTE_PATH.HOME);
        }
      }
    },
    onError(e) {
      toast(() => <Notification type='error' message={e?.error} />);
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

        <MainButton type='submit' className='!mt-2 w-full'>
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

        {/* {!isModal && (
          <a
            href={PINETREE_LINK}
            target='_blank'
            rel='noreferrer'
            className='!mt-[24px] flex items-center justify-center laptop:!mt-[48px]'
          >
            <Text type='body-16-regular' className='mr-[8px] text-[#808A9D]'>
              {t('a_product_of')}
            </Text>
            <img
              src='/static/images/pinetree_logo.png'
              alt=''
              sizes='100vw'
              className='h-[40px] w-[105px] laptop:h-[55px] laptop:w-[140px]'
            />
          </a>
        )} */}
      </Form>
    </>
  );
};

export default Login;
