import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import NextLink from 'next/link';
import Form from 'rc-field-form';
import toast from 'react-hot-toast';

import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';
import LabelInput from '@components/UI/LabelInput';
import { useRouter } from 'next/router';
import { MainButton } from '@components/UI/Button';
import { REG_PHONE_NUMBER } from '@utils/reg';

const StyledInput = ({ ...props }) => (
  <Input
    {...props}
    className='focus:ring-primary-600 focus:border-primary-600 primary-1 w-full rounded-xl border border-gray-300 !bg-[--primary-3] p-4 text-[14px] font-[500] text-gray-900 placeholder:text-[--primary-1]'
  />
);

const notifySuccess = () =>
  toast(() => <Notification type='success' message='Password request is successful' />);

const ForgotPasswordStepOne = () => {
  const { t } = useTranslation('auth');
  const [form] = Form.useForm();
  const router = useRouter();

  // const requestCreateUsername = useCreateUsername({
  //   onSuccess: (res: any) => {
  //     router.push(ROUTE_PATH.LOGIN);
  //   },
  //   onError(e: any) {
  //     console.log(e?.errors?.[0] || e?.message, 'error');
  //   },
  // });

  const onSubmit = (value: any) => {
    // requestCreateUsername.run({ username: value.username });
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
              rules={[{ required: true, message: 'Please enter username!' }]}
            >
              <LabelInput placeholder='Username' name='username' labelContent='Username' />
            </FormItem>
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
              <LabelInput
                type='number'
                placeholder='Phone number'
                labelContent='Phone number'
                name='phoneNumber'
              />
            </FormItem>
            <MainButton type='submit' className='!mt-1 w-full'>
              {t('send_request')}
            </MainButton>
          </Form>

          <div className='mt-9 text-center'>
            <Text type='body-14-regular'>{t('do_not_want_log_in')}</Text>
            <NextLink href={ROUTE_PATH.Home}>
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
