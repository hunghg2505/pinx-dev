// import { useTranslation } from 'next-i18next';
import { useState, useRef, useCallback, useEffect } from 'react';

import Image from 'next/image'
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
  const minutesText = minutes < 10 ? '0' + Math.floor(divisor_for_minutes / 60).toString() : Math.floor(divisor_for_minutes / 60).toString();

  const divisor_for_seconds = divisor_for_minutes % 60;
  const seconds = Math.ceil(divisor_for_seconds);
  const secondsText = seconds < 10 ? '0' + Math.ceil(divisor_for_seconds).toString() : Math.ceil(divisor_for_seconds).toString();

  const obj = {
    m: minutesText,
    s: secondsText
  };
  return obj;
}

const ForgotPasswordStepThree = () => {
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
  }

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
      <div className='flex flex-col items-center  justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0'>
          <div className='w-full flex'>
            <Image src='/static/icons/back_icon.svg' alt='' width='0' height='0' className={'w-[20px] h-[20px]'} />
          </div>
          <div className='flex flex-col items-center max-sm:mt-6'>
            <Image src='/static/icons/pinex_logo.svg' alt='' width='0' height='0' className={'w-[77px] h-[77px]'} />
            <Text type='body-20-bold' className='mt-6'>Forgot password?</Text>
            <div className='flex flex-col items-center mt-6 text-[body-12-medium] neutral-4'>
              <Text>Please enter the 6-digits OTP we sent</Text>
              <Text>to your phone number</Text>
            </div>
            <Text type='body-14-bold' className='mt-5' color={isOtpExpired ? 'semantic-1' : undefined}>
              {isOtpExpired ? 'The OTP is expired' : `The OTP will be expired in ${time?.m}:${time?.s} min`}
            </Text>
          </div>
          <Form
            className='space-y-6'
            form={form}
            onFinish={() => console.log('xxx finish')}
          >
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
            <button type='submit' className='w-full text-white font-[700] text-[17px] bg-[linear-gradient(238.35deg,_#1D6CAB_7.69%,_#589DC0_86.77%)] rounded-[10px] py-[14px] text-center !mt-10'>Continue</button>
          </Form>

          <div className='flex items-center justify-center mt-5 cursor-pointer'>
            <Image src='/static/icons/resend.svg' alt='' width='0' height='0' className={'w-[15px] h-[15px] mr-2'} />
            <Text type='body-14-bold' color='primary-2'>Resend code</Text>
          </div>
        </div >
      </div >
    </>
  );
}

export default ForgotPasswordStepThree;
