// import { useTranslation } from 'next-i18next';
import Image from 'next/image'
import NextLink from 'next/link';
import Form from 'rc-field-form';
import toast, { Toaster } from 'react-hot-toast';

import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

const StyledInput = ({ ...props }) => <Input {...props} className='w-full font-[500] text-[14px] p-4 border rounded-xl border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 !bg-[--primary-3] primary-1 placeholder:text-[--primary-1]' />;

const notifySuccess = () => toast(() => (
  <Notification type='success' message='Password request is successful' />
));

const ForgotPasswordStepOne = () => {
  const [form] = Form.useForm();

  return (
    <>
      <Toaster />
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0'>
          <Form
            className='space-y-6 md:space-y-8'
            form={form}
            onFinish={notifySuccess}
          >
            <div className='flex flex-col items-center max-sm:mt-6'>
              <Image src='/static/icons/pinex_logo.svg' alt='' width='0' height='0' className={'w-[77px] h-[77px]'} />
              <Text type='body-20-bold' className='mt-6'>Forgot password?</Text>
              <div className='flex flex-col items-center mt-6 text-[body-12-medium] neutral-4'>
                <Text>We will send a new password to your</Text>
                <Text>phone number</Text>
              </div>
            </div>
            <div>
              <label htmlFor='userName'>
                <Text type='body-12-bold' color='primary-5' className='mb-2'>
                  Username
                </Text>
              </label>
              <FormItem name='userName'>
                <StyledInput
                  placeholder='Enter username'
                />
              </FormItem>
            </div>
            <div>
              <label htmlFor='phoneNumber'>
                <Text type='body-12-bold' color='primary-5' className='mb-2'>
                  Phone number
                </Text>
              </label>
              <FormItem name='phoneNumber'>
                <StyledInput
                  placeholder='Enter phone number'
                />
              </FormItem>
            </div>
            <button type='submit' className='w-full text-white font-[700] text-[17px] bg-[linear-gradient(238.35deg,_#1D6CAB_7.69%,_#589DC0_86.77%)] rounded-[10px] py-[14px] text-center !mt-10'>Send requset</button>
            <div className='text-center !mt-8'>
              <Text type='body-14-regular'>
                Already have an account?
                <span>
                  <NextLink href={ROUTE_PATH.LOGIN} className='text-[14px] font-[700] text-[--primary-2]'>
                    &nbsp;Log in
                  </NextLink>
                </span>
              </Text>

            </div>
          </Form>
        </div >
      </div >
    </>
  );
}

export default ForgotPasswordStepOne;
