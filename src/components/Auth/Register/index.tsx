// import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import NextLink from 'next/link';
import Form from 'rc-field-form';
import ReCAPTCHA from 'react-google-recaptcha';

// import Checkbox from 'rc-checkbox';
// import CustomCheckbox from '@components/UI/Checkbox';
import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
import Text from '@components/UI/Text';
// import styles from './index.module.scss';

const Register = () => {
  // const { t } = useTranslation('common');

  return (
    <>
      <div className='mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <div className='w-full rounded-lg bg-white dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
          <Form
            className='space-y-6'
            action='#'
            onFinish={(values) => {
              console.log('Finish:', values);
            }}
          >
            <div className='flex justify-center max-sm:mt-6'>
              <Image
                src='/static/icons/pinex_logo.svg'
                alt=''
                width='0'
                height='0'
                className={'mb-6 h-[77px] w-[77px]'}
              />
            </div>
            <div className='!mb-6 flex items-center'>
              <Image
                src='/static/icons/regis_guide.svg'
                alt=''
                width='0'
                height='0'
                className={'mr-2 h-[38px] w-[38px]'}
              />
              <Text type='body-12-medium'>
                Don’t know how to set up your account? Read our
                <span>
                  <NextLink href='#' className='!text-[--primary-2]'>
                    &nbsp;Sign-up guidance
                  </NextLink>
                </span>
              </Text>
            </div>
            <div>
              <label htmlFor='fullName'>
                <Text type='body-12-bold' color='primary-5' className='mb-2'>
                  Full name
                </Text>
              </label>
              <FormItem name='fullName'>
                <Input
                  placeholder='Enter your full name'
                  className='focus:ring-primary-600 focus:border-primary-600 w-full rounded-xl border border-gray-300 !bg-[--primary-3] p-4 text-[14px] font-[500] text-gray-900 placeholder:text-[--primary-1]'
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
                <Input
                  placeholder='Enter phone number'
                  className='focus:ring-primary-600 focus:border-primary-600 w-full rounded-xl border border-gray-300 !bg-[--primary-3] p-4 text-[14px] font-[500] text-gray-900 placeholder:text-[--primary-1]'
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
                <Input
                  placeholder='Enter email'
                  className='focus:ring-primary-600 focus:border-primary-600 w-full rounded-xl border border-gray-300 !bg-[--primary-3] p-4 text-[14px] font-[500] text-gray-900 placeholder:text-[--primary-1]'
                />
              </FormItem>
            </div>
            <div>
              <label htmlFor='password'>
                <Text type='body-12-bold' color='primary-5' className='mb-2'>
                  Password
                </Text>
              </label>
              <FormItem name='password'>
                <Input
                  placeholder='Enter password'
                  type='password'
                  className='focus:ring-primary-600 focus:border-primary-600 w-full rounded-xl border border-gray-300 !bg-[--primary-3] p-4 text-[14px] font-[500] text-gray-900 placeholder:text-[--primary-1]'
                />
              </FormItem>
            </div>

            <div>
              <label htmlFor='confirmPassword'>
                <Text type='body-12-bold' color='primary-5' className='mb-2'>
                  Confirm password
                </Text>
              </label>
              <FormItem name='confirmPassword'>
                <Input
                  placeholder='Enter password'
                  type='password'
                  className='focus:ring-primary-600 focus:border-primary-600 w-full rounded-xl border border-gray-300 !bg-[--primary-3] p-4 text-[14px] font-[500] text-gray-900 placeholder:text-[--primary-1]'
                />
              </FormItem>
            </div>

            <div className='!mt-8 flex justify-center'>
              <ReCAPTCHA
                sitekey='Your client site key'
                // onChange={onChange}
                size='normal'
              />
            </div>

            <button
              type='submit'
              className='!mt-10 w-full rounded-[10px] bg-[linear-gradient(238.35deg,_#1D6CAB_7.69%,_#589DC0_86.77%)] py-[14px] text-center text-[17px] font-[700] text-white'
            >
              Continue
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
