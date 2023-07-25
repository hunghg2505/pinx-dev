import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';
import { toast } from 'react-hot-toast';

import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import LabelInput from '@components/UI/LabelInput';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';
import { normalizeNumber } from '@utils/normalize';
import { REG_PHONE_NUMBER } from '@utils/reg';

import { useForgotPassword } from './service';

const ERROR_CODE = new Set(['10009', '10011', '10148', '10149', '10020']);

const ForgotPasswordStepOne = () => {
  const { t } = useTranslation('common');
  const [form] = Form.useForm();
  const router = useRouter();

  const requestForgotPassword = useForgotPassword({
    onSuccess: () => {
      router.push(ROUTE_PATH.LOGIN);
      toast(() => <Notification type='success' message='Password request is successful' />);
    },
    onError(e: any) {
      if (ERROR_CODE.has(e?.errorWTSCode)) {
        router.push({
          pathname: ROUTE_PATH.UPDATE_USER_PROFILE,
          query: {
            username: form.getFieldValue('username'),
            phone_number: form.getFieldValue('phoneNumber'),
          },
        });
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
    <div className='mobile:mt-20 laptop:m-0 laptop:min-w-[450px]'>
      <div>
        <Text type='body-28-bold'>{t('forgot_password')}</Text>
        <Text type='body-16-regular' color='neutral-4'>
          {t('forgot_password_note')}
        </Text>
      </div>

      <Form className='mt-10 space-y-6 laptop:w-full' form={form} onFinish={onSubmit}>
        <FormItem name='username'>
          <LabelInput placeholder={t('username')} labelContent={t('username')} name='username' />
        </FormItem>
        <FormItem
          normalize={(value: any, prevValue: any) => normalizeNumber(value, prevValue)}
          name='phoneNumber'
          rules={[
            {
              required: true,
              message: t('please_enter_phone_number'),
            },
            {
              pattern: REG_PHONE_NUMBER,
              message: t('please_enter_valid_phone_number'),
            },
          ]}
        >
          <LabelInput
            type='tel'
            placeholder={t('phone_number')}
            labelContent={t('phone_number')}
            name='phoneNumber'
            maxLength={10}
          />
        </FormItem>
        <MainButton type='submit' className='!mt-1 w-full'>
          {t('send_request')}
        </MainButton>
      </Form>

      <div className='mt-9 flex flex-col items-center'>
        <Text type='body-14-regular' color='neutral-4'>
          {t('do_not_want_log_in')}
        </Text>
        <NextLink href={ROUTE_PATH.HOME}>
          <Text type='body-14-medium' color='primary-1'>
            {t('skip_forgot_password')}
          </Text>
        </NextLink>
      </div>
    </div>
  );
};

export default ForgotPasswordStepOne;
