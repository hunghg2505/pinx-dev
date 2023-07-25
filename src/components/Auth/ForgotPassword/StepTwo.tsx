/* eslint-disable import/named */
import React from 'react';

import dayjs, { Dayjs } from 'dayjs';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';
import { PickerProps } from 'rc-picker';
import { toast } from 'react-hot-toast';

import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import LabelDatePicker from '@components/UI/LabelDatePicker';
import LabelInput from '@components/UI/LabelInput';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';
import { normalizeNumber } from '@utils/normalize';
import { REG_EMAIL, REG_PHONE_NUMBER } from '@utils/reg';

import { useForgotPassword } from './service';

const disabledDate: PickerProps<Dayjs>['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current > dayjs().endOf('day');
};

const ForgotPasswordStepOne = () => {
  const { t } = useTranslation('common');
  const [form] = Form.useForm();
  const router = useRouter();
  const initialValues = {
    username: router.query.username,
    phoneNumber: router.query.phone_number,
  };

  const requestForgotPassword = useForgotPassword({
    onSuccess: () => {
      router.push(ROUTE_PATH.LOGIN);
      toast(() => <Notification type='success' message='Password request is successful' />);
    },
    onError(e: any) {
      toast(() => <Notification type='error' message={e?.error} />);
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
    <div className='mobile:mt-20 laptop:m-0 laptop:min-w-[450px]'>
      <div className='mt-[36px]'>
        <Text type='body-28-bold'>{t('forgot_password')}</Text>
        <Text type='body-16-regular' color='neutral-4'>
          {t('update_user_profile_note')}
        </Text>
      </div>

      <Form
        className='mt-10 space-y-6 laptop:w-full'
        form={form}
        onFinish={onSubmit}
        initialValues={initialValues}
      >
        <FormItem name='username' rules={[{ required: true, message: t('please_enter_username') }]}>
          <LabelInput placeholder={t('username')} labelContent={t('username')} name='username' />
        </FormItem>
        <FormItem
          name='customerName'
          rules={[{ required: true, message: t('lease_enter_customer_name') }]}
        >
          <LabelInput
            placeholder={t('customer_name')}
            labelContent={t('customer_name')}
            name='customerName'
          />
        </FormItem>
        <FormItem
          name='email'
          rules={[
            {
              required: true,
              message: t('please_enter_email'),
            },
            {
              pattern: REG_EMAIL,
              message: t('please_enter_valid_email'),
            },
          ]}
        >
          <LabelInput placeholder={t('email')} labelContent={t('email')} name='email' />
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
        <FormItem
          name='birthday'
          rules={[
            {
              required: true,
              message: t('please_select_a_date_of_birth'),
            },
          ]}
        >
          <LabelDatePicker
            onChange={onChangeDate}
            placeholder={t('date_of_birth')}
            labelContent={t('date_of_birth')}
            name='birthday'
            format='DD/MM/YYYY'
            disabledDate={disabledDate}
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
  );
};

export default ForgotPasswordStepOne;
