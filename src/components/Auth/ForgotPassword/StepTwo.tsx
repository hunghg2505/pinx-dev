/* eslint-disable import/named */
import React from 'react';

import dayjs from 'dayjs'
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';
import { toast } from 'react-hot-toast';

import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import LabelDatePicker from '@components/UI/LabelDatePicker';
import LabelInput from '@components/UI/LabelInput';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';
import { REG_EMAIL, REG_PHONE_NUMBER } from '@utils/reg';

import { useForgotPassword } from './service';

const ForgotPasswordStepOne = () => {
  const { t } = useTranslation('auth');
  const [form] = Form.useForm();
  const router = useRouter();

  const requestForgotPassword = useForgotPassword({
    onSuccess: () => {
      router.push(ROUTE_PATH.LOGIN);
    },
    onError(e: any) {
      toast(() => <Notification type='error' message={e.error} />);
    },
  });

  const onSubmit = (values: any) => {
    const payload = {
      username: values.username,
      phoneNumber: values.phoneNumber,
      customerName: values.customerName,
      email: values.email,
      birthday: dayjs(values.birthday).format('YYYYMMDD'),

    };
    requestForgotPassword.run(payload);
  };

  const onChangeDate = (value: any) => {
    form.setFieldValue('birthday', value);
  };

  return (
    <>
      <div className='mx-auto flex flex-col  items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <div className='w-full rounded-lg bg-white sm:max-w-md md:mt-0 xl:p-0'>
          <div className='mt-[46px]'>
            <Text type='body-28-bold'>{t('forgot_password')}</Text>
            <Text type='body-16-regular' color='neutral-4'>
              {t('update_user_profile_note')}
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
              name='customerName'
              rules={[{ required: true, message: 'Please enter customer name!' }]}
            >
              <LabelInput
                placeholder='Customer name'
                name='customerName'
                labelContent='Customer name'
              />
            </FormItem>
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
              <LabelInput placeholder='Email' labelContent='Email' name='email' />
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
            <FormItem
              name='birthday'
              rules={[
                {
                  required: true,
                  message: 'Please enter birthday!',
                },
              ]}
            >
              <LabelDatePicker
                onChange={onChangeDate}
                placeholder='Birthday'
                labelContent='Birthday'
                name='birthday'
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
