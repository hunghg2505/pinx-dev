/* eslint-disable import/named */
import React from 'react';

import dayjs from 'dayjs';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Form from 'rc-field-form';
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

const ForgotPasswordStepOne = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const initialValues = {
    username: router.query.username,
    phoneNumber: router.query.phone_number
  }

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
        <Text type='body-28-bold'>Forgot password?</Text>
        <Text type='body-16-regular' color='neutral-4'>
          Please fill in your infomation below
        </Text>
      </div>

      <Form className='mt-10 space-y-6 laptop:w-full' form={form} onFinish={onSubmit} initialValues={initialValues}>
        <FormItem name='username' rules={[{ required: true, message: 'Please enter username' }]}>
          <LabelInput placeholder='Username' name='username' labelContent='Username' />
        </FormItem>
        <FormItem
          name='customerName'
          rules={[{ required: true, message: 'Please enter customer name' }]}
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
          normalize={(value: any, prevValue: any) => normalizeNumber(value, prevValue)}
          name='phoneNumber'
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
          name='birthday'
          rules={[
            {
              required: true,
              message: 'Please select a date of birth',
            },
          ]}
        >
          <LabelDatePicker
            onChange={onChangeDate}
            placeholder='Date of birth'
            labelContent='Date of birth'
            name='birthday'
            format='DD/MM/YYYY'
          />
        </FormItem>
        <MainButton type='submit' className='!mt-1 w-full'>
          Send request
        </MainButton>
      </Form>

      <div className='mt-9 flex flex-col items-center'>
        <Text type='body-14-regular'>Don’t want to log in yet?</Text>
        <NextLink href={ROUTE_PATH.HOME}>
          <Text type='body-14-medium' color='primary-1'>
            Skip and view as anonymous
          </Text>
        </NextLink>
      </div>
    </div>
  );
};

export default ForgotPasswordStepOne;
