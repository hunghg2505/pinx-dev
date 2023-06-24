import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';

import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import LabelInput from '@components/UI/LabelInput';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';
import { REG_PHONE_NUMBER } from '@utils/reg';

import { useForgotPassword } from './service';


const ERROR_CODE = new Set(['10009', '10011', '10148', '10149', '10020']);

const ForgotPasswordStepOne = () => {
  const { t } = useTranslation('auth');
  const [form] = Form.useForm();
  const router = useRouter();

  const requestForgotPassword = useForgotPassword({
    onSuccess: () => {
      router.push(ROUTE_PATH.LOGIN);
    },
    onError(e: any) {
      if (ERROR_CODE.has(e.errorWTSCode)) {
        router.push(ROUTE_PATH.UPDATE_USSR_PROFILE);
      }
    },
  });

  const onSubmit = (values: any) => {
    const payload = {
      username: values.username,
      phoneNumber: values.phoneNumber,
    };
    requestForgotPassword.run(payload);
  };

  return (
    <>
      <div className='mx-auto flex flex-col  items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <div className='w-full rounded-lg bg-white sm:max-w-md md:mt-0 xl:p-0'>
          <div className='mt-[46px]'>
            <Text type='body-28-bold'>{t('forgot_password')}</Text>
            <Text type='body-16-regular' color='neutral-4'>
              {t('forgot_password_note')}
            </Text>
          </div>

          <Form className='mt-10 space-y-6' form={form} onFinish={onSubmit}>
            <FormItem
              name='username'
              rules={[{ required: true, message: 'Please enter username' }]}
            >
              <LabelInput placeholder='Username' name='username' labelContent='Username' />
            </FormItem>
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
                }
              ]}
            >
              <LabelInput
                type='tel'
                placeholder='Phone number'
                labelContent='Phone number'
                name='phoneNumber'
              />
            </FormItem>
            <MainButton type='submit' className='!mt-1 w-full'>
              {t('send_request')}
            </MainButton>
          </Form>

          <div className='mt-9 flex flex-col items-center'>
            <Text type='body-14-regular'>{t('do_not_want_log_in')}</Text>
            <NextLink href={ROUTE_PATH.HOME}>
              <Text type='body-14-medium' color='primary-1'>
                {t('skip_forgot_password')}
              </Text>
            </NextLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordStepOne;
