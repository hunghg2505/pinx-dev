// import { useTranslation } from 'next-i18next';
import Image from 'next/image'
// import NextLink from 'next/link';
import Form from 'rc-field-form';

import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Text from '@components/UI/Text';
// import { ROUTE_PATH } from '@utils/common';

const StyledInput = ({ ...props }) => <Input {...props} className='w-full font-[500] text-[14px] p-4 border rounded-xl border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 !bg-[--primary-3] primary-1 placeholder:text-[--primary-1]' />;

const ForgotPasswordStepTwo = () => {
  const [form] = Form.useForm();

  return (
    <>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0'>
          <Form
            className='space-y-6 md:space-y-8'
            form={form}
            onFinish={() => console.log('')}
          >
            <div className='flex flex-col items-center max-sm:mt-6'>
              <Image src='/static/icons/pinex_logo.svg' alt='' width='0' height='0' className={'w-[77px] h-[77px]'} />
              <Text type='body-20-bold' className='mt-6'>Forgot password?</Text>
              <div className='flex flex-col items-center mt-6 text-[body-12-medium] neutral-4'>
                <Text>We will send a new password to your</Text>
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
              <label htmlFor='customerName'>
                <Text type='body-12-bold' color='primary-5' className='mb-2'>
                  Customer’s name
                </Text>
              </label>
              <FormItem name='customerName'>
                <StyledInput
                  placeholder='Enter customer name'
                />
              </FormItem>
            </div>
            <div>
              <label htmlFor='email'>
                <Text type='body-12-bold' color='primary-5' className='mb-2'>
                  Email
                </Text>
              </label>
              <FormItem name='email'>
                <StyledInput
                  placeholder='Enter email'
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
            <div>
              <label htmlFor='dateOfBirth'>
                <Text type='body-12-bold' color='primary-5' className='mb-2'>
                  Date of Birth
                </Text>
              </label>
              <FormItem name='dateOfBirth'>
                <div className="relative max-w-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"></path></svg>
                  </div>
                  <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                </div>
                {/* <StyledInput
                  placeholder='Pick date'
                /> */}
              </FormItem>
            </div>
            <button type='submit' className='w-full text-white font-[700] text-[17px] bg-[linear-gradient(238.35deg,_#1D6CAB_7.69%,_#589DC0_86.77%)] rounded-[10px] py-[14px] text-center !mt-10'>Send requset</button>
          </Form>
        </div >
      </div >
    </>
  );
}

export default ForgotPasswordStepTwo;
