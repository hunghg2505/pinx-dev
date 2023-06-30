import NextLink from 'next/link';
import { useRouter } from 'next/router';
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
  const [form] = Form.useForm();
  const router = useRouter();

  const requestForgotPassword = useForgotPassword({
    onSuccess: () => {
      router.push(ROUTE_PATH.LOGIN);
      toast(() => <Notification type='success' message='Password request is successful' />);
    },
    onError(e: any) {
      if (ERROR_CODE.has(e.errorWTSCode)) {
        router.push({
          pathname: ROUTE_PATH.UPDATE_USSR_PROFILE,
          query: {
            username: form.getFieldValue('username'),
            phone_number: form.getFieldValue('phoneNumber')
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
      <div className='mt-[36px]'>
        <Text type='body-28-bold'>Forgot password?</Text>
        <Text type='body-16-regular' color='neutral-4'>
          We will send a new password to your phone number
        </Text>
      </div>

      <Form className='mt-10 space-y-6 laptop:w-full' form={form} onFinish={onSubmit}>
        <FormItem name='username'>
          <LabelInput placeholder='Username' name='username' labelContent='Username' />
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
