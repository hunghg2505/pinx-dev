// import { useTranslation } from 'next-i18next';
import { useState, useRef, useCallback, useEffect } from 'react';

import Image from 'next/image';
import Form from 'rc-field-form';
import { OtpInput } from 'reactjs-otp-input';

import FormItem from '@components/UI/FormItem';
import Text from '@components/UI/Text';

import styles from './index.module.scss';

interface Itime {
  m: string;
  s: string;
}

const secondsToTime = (secs: number) => {
  const divisor_for_minutes = secs % (60 * 60);
  const minutes = Math.floor(divisor_for_minutes / 60);
  const minutesText =
    minutes < 10
      ? '0' + Math.floor(divisor_for_minutes / 60).toString()
      : Math.floor(divisor_for_minutes / 60).toString();

  const divisor_for_seconds = divisor_for_minutes % 60;
  const seconds = Math.ceil(divisor_for_seconds);
  const secondsText =
    seconds < 10
      ? '0' + Math.ceil(divisor_for_seconds).toString()
      : Math.ceil(divisor_for_seconds).toString();

  const obj = {
    m: minutesText,
    s: secondsText,
  };
  return obj;
};

const RegisterVerification = () => {
  // const { t } = useTranslation('common');
  const [form] = Form.useForm();
  const refOtpInput: any = useRef();
  const [running, setRunning] = useState<boolean>(false);
  const [count, setCount] = useState<number>(120);
  const [time, setTime] = useState<Itime>();
  const [isOtpExpired, setIsOtpExpired] = useState<boolean>(false);

  const onChange = useCallback(
    (e: any) => {
      if (e.length === 6) {
        form.submit();
      }
    },
    [form],
  );

  const counter = useCallback(() => {
    if (running) {
      setCount((curState) => curState - 1);
    }
  }, [running]);

  const startTimer = () => {
    setRunning(true);
  };

  useEffect(() => {
    const counterInterval = setInterval(counter, 1000);

    return () => {
      clearInterval(counterInterval);
    };
  }, [counter]);

  useEffect(() => {
    setTime(secondsToTime(count));
    if (count === 0) {
      setRunning(false);
      setIsOtpExpired(true);
    }
  }, [count]);

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <>
      <div className='mx-auto flex flex-col  items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <div className='w-full rounded-lg bg-white dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
          <div className='flex w-full'>
            <Image
              src='/static/icons/back_icon.svg'
              alt=''
              width='0'
              height='0'
              className={'h-[20px] w-[20px]'}
            />
          </div>
          <div className='flex flex-col items-center max-sm:mt-6'>
            <Image
              src='/static/icons/pinex_logo.svg'
              alt=''
              width='0'
              height='0'
              className={'h-[77px] w-[77px]'}
            />
            <Text type='body-20-bold' className='mt-6'>
              Phone verification
            </Text>
            <div className='neutral-4 mt-6 flex flex-col items-center text-[body-12-medium]'>
              <Text>Enter the verification code we sent to</Text>
              <Text>your phone number xxxxxxx123</Text>
            </div>
            <Text
              type='body-14-bold'
              className='mt-5'
              color={isOtpExpired ? 'semantic-1' : undefined}
            >
              {isOtpExpired
                ? 'The OTP is expired'
                : `The OTP will be expired in ${time?.m}:${time?.s} min`}
            </Text>
          </div>
          <Form className='space-y-6' form={form} onFinish={() => console.log('xxx finish')}>
            <FormItem name='otp' className='items-center'>
              <OtpInput
                className={styles.otpInput}
                numInputs={6}
                shouldAutoFocus
                onChange={onChange}
                placeholder=' _____'
                ref={refOtpInput}
                isInputNum={true}
              />
            </FormItem>
            <button
              type='submit'
              className='!mt-10 w-full rounded-[10px] bg-[linear-gradient(238.35deg,_#1D6CAB_7.69%,_#589DC0_86.77%)] py-[14px] text-center text-[17px] font-[700] text-white'
            >
              Continue
            </button>
          </Form>

          <div className='mt-5 flex cursor-pointer items-center justify-center'>
            <Image
              src='/static/icons/resend.svg'
              alt=''
              width='0'
              height='0'
              className={'mr-2 h-[15px] w-[15px]'}
            />
            <Text type='body-14-bold' color='primary-2'>
              Resend code
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterVerification;
